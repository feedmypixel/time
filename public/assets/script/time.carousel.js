(function (win, doc, j, time) {

    var DIRECTION_FORWARD = 'forward',
        DIRECTION_BACKWARD = 'backward',
        LOADING_ERROR = time.config.app.carousel.loadingError,
        CLASS_HIDDEN = 'hidden',
        CLASS_ERROR = 'error',
        CLASS_LOADING = 'loading',
        ACTIVE_PICTURE = 'active',
        BY_TEXT = 'by',
        LOADING_IMG = 'assets/img/loader.gif',
        carousel,
        utils = time.utils,
        isTouchAvailable = utils.isTouchAvailable();

    function Carousel(container, pictureDetail) {

        if (!container) { return; }

        carousel = this;

        this.container = container;
        this.pictureDetail = pictureDetail;
        this.currentPictureIndex = 0;
        this.offset = 0;
        this.loadedImages = [];
        this.htmlTemplates = {
            pictureMarkup: function (detail, itr) {

                var pictureTitle = detail.title ? [
                        '<h2 class="img-title">', detail.title, '</h2>'
                    ].join('') : '',

                    pictureIllustrator = detail.illustrator ? [
                        '<h3 class="img-illustrator"><em> ', BY_TEXT, ' ', detail.illustrator, '</em></h3>'
                    ].join('') : '',

                    extractTitle = detail.extract.title ? [
                        '<h2>', detail.extract.title, '</h2>'
                    ].join('') : '',

                    extractWriter = detail.extract.writer ? [
                        '<h3 class="highlight mini-text">',  BY_TEXT, ' ', detail.extract.writer, '</h3>'
                    ].join('') : '',

                    extractBlurb = detail.extract.blurb ? [
                        '<div class="extract-blurb medium-text">', detail.extract.blurb, '</div>'
                    ].join('') : '',

                    html = [
                        '<li class="', CLASS_LOADING, ' ', CLASS_HIDDEN, ' ', detail.klassName, ' picture-', itr, '">',
                            '<div class="img-wrapper group">',
                                pictureTitle,
                                carousel.generateLoadingSpinner(),
                                pictureIllustrator,
                            '</div>',
                            '<div class="extract group">',
                            '<div class="extract-title big-text">', extractTitle, extractWriter, '</div>',
                                extractBlurb,
                            '</div>',
                        '</li>'
                    ].join('');

                return html;
            }
        };

        this.buildCarousel();
        this.addResizeHandler();
    }

    Carousel.prototype = {

        buildCarousel: function () {
            this.createCarouselHtml();
            this.setUpCarouselProperties();
            this.calculatePriorityImages();
            this.addEvents();
        },

        addResizeHandler: function () {
            var carousel = this;

            j.attachWindowListener('resize',
                utils.debounce(function () {
                    carousel.buildCarousel();
                    carousel.loadImageQueue();
                }, 10, false));
        },

        setUpCarouselProperties: function () {

            this.pictureElems = [];
            this.pictureContainer = j.getDescendantsByClassName(this.container, 'carousel-detail')[0];
            this.pictureIndicator = j.getDescendantsByClassName(this.container, 'picture-indicator')[0];
            this.carouselWrapper = j.getDescendantsByClassName(this.container, 'carousel-wrap')[0];

            var pictureElements = j.toArray(this.pictureContainer.childNodes);

           // preserve the index of the pictures
            for (var i =0; i < pictureElements.length; i++) {

                this.pictureElems.push({
                    index: i,
                    elem: pictureElements[i]
                });
            }

            this.pictureItemCount = this.pictureElems.length;
            this.lastPictureItem = this.pictureItemCount - 1;
        },

        generateLoadingSpinner: function () {
            return [
                '<div class="throbber">',
                    '<img class="loading-spinner center-positioned" src="' + LOADING_IMG + '" width="40px" height="40px"/>',
                '</div>'
            ].join('');
        },

        setupCarouselImages: function (detail, i) {

            //TODO change this back to create a new image object once chrome has fixed their issue
            var image = doc.createElement('img'),
                imgSource;

            image.onload = function () {

                this.alt = detail.title;

                var listElem = j.getDescendantsByClassName(carousel.pictureContainer, 'picture-' + i)[0],
                    imgWrap = j.getDescendantsByClassName(listElem, 'img-wrapper')[0],
                    throbber = j.getDescendantsByClassName(imgWrap, 'throbber')[0];

                if (throbber) {
                    imgWrap.replaceChild(this, throbber);
                    j.removeClass(listElem, CLASS_LOADING);
                }

                carousel.manageLoadedImages(i);
            };

            image.onerror = function () {

                var listElem = j.getDescendantsByClassName(carousel.pictureContainer, 'picture-' + i)[0],
                    errorElem = doc.createElement('div'),
                    errorTextElem = doc.createTextNode(LOADING_ERROR);

                errorElem.className = CLASS_ERROR;
                errorElem.appendChild(errorTextElem);

                j.toggleClass(listElem, CLASS_HIDDEN);
                listElem.replaceChild(errorElem, listElem.firstChild);
                j.removeClass(listElem, CLASS_LOADING);
            };

            imgSource = 'assets/img/responsiveImages/' + detail.src + '.jpg';

            this.imageQueue.push({
                imgObj: image,
                imgSrc: imgSource,
                imgIndex: i,
                loaded: false
            });
        },


        /**
         * Starting with the middle image walk forward and backwards along the carousel images going outwards
         * toward the edges of the page getting a pair of image widths each time.
         * @param imageIndex
         * @returns {number}
         */
        getPeripheralImageWidths: function (imageIndex) {

            var totalWidths = 0,
                imageWalk = {
                    forward: function (itr) {
                        var index = this.middleImage + itr;
                        this.priorityImages.push(index);

                        return index;
                    },
                    backward: function (itr) {
                        var index = this.middleImage - itr;
                        this.priorityImages.push(index);

                        return index;
                    }
                };

            //walk forwards
            totalWidths += j.getOuterSize(this.pictureElems[imageWalk.forward.call(this, imageIndex)].elem)[1];
            //walk backwards
            totalWidths += j.getOuterSize(this.pictureElems[imageWalk.backward.call(this, imageIndex)].elem)[1];

            return totalWidths;
        },

        calculatePriorityImages: function () {

            this.priorityImages = [];

            this.middleImage = Math.round(this.pictureItemCount / 2) - 1;
            this.screenWidth = parseInt(utils.getCookie('screenwidth'), 10);
            this.viewportSize = utils.getCookie('viewportsize');

            /** small viewport only load carousel images on window load event**/
            if (this.screenWidth && this.viewportSize && 'small' !==  this.viewportSize) {

                //add middle image
                this.priorityImages.push(this.middleImage);

                //middle image
                var totalImageWidth = j.getOuterSize(this.pictureElems[this.middleImage].elem)[1];

                for (var i = 1; totalImageWidth < this.screenWidth; i++) {

                    totalImageWidth += this.getPeripheralImageWidths(i);
                }

                this.loadPriorityImages();
            }
        },


        loadPriorityImages: function () {

            var imageIndex,
                i = 0,
                imgDetail;

            while ((imageIndex = this.priorityImages[i++])) {
                imgDetail = this.imageQueue[imageIndex];
                this.applyImageSrcValue(imgDetail);
            }
        },


        loadImageQueue: function () {

            var image,
                i = 0;

            while ((image = this.imageQueue[i++])) {
                if (!image.loaded) {
                    this.applyImageSrcValue(image);
                }
            }
        },

        applyImageSrcValue: function (imgDetail) {
            imgDetail.imgObj.src = imgDetail.imgSrc;
            imgDetail.loaded = true;
        },

        manageLoadedImages: function (itr) {

            this.loadedImages.push(itr);

            // only load when all priority images have loaded or when all images have loaded
            if (this.loadedImages.length === this.priorityImages.length || this.loadedImages.length === this.pictureItemCount) {
                this.centerCarousel();

                //reset loadedImages array when all images have loaded
                if (this.loadedImages.length === this.pictureItemCount) {
                    this.loadedImages = [];
                } else if (this.loadedImages.length === this.priorityImages.length) {
                    if (!utils.hasUserScrolled()) {
                        utils.hideAddressBar();
                    }
                }
            }
        },

        centerCarousel: function () {
            this.moveToPicture(this.middleImage);
            this.setPictureOffset();
            this.setPictureIndicator();
            this.positionCarouselButtons();
        },

        createCarouselHtml: function () {

            this.imageQueue = [];

            var html = '';

            html += [
                '<div class="carousel-outer-wrap centered-positioned">',
                '<div class="carousel-wrap">',
                    '<a class="carousel-left carousel-button" href="#"></a>',
                    '<ol class="carousel-detail">'
            ].join('');

            j.forEach(this.pictureDetail, function (pictureDetail, i) {
                html += carousel.htmlTemplates.pictureMarkup(pictureDetail, i);

                carousel.setupCarouselImages(pictureDetail, i);
            });

            html += [
                    '</ol>',
                    '<a class="carousel-right carousel-button" href="#"></a>',
                '</div>'
            ].join('');

            if (this.pictureDetail.length > 1) {
                html += this.createImagePositionIndicator();
            }

            html += '</div>';

            j.setHtml(this.container, html);
        },

        createImagePositionIndicator: function () {
            var html = '<ol class="picture-indicator center-aligned">';

            j.forEach(this.pictureDetail, function (picture, i) {
                html += '<li class="picture picture-' + i + (0 === i ? ' active' : '') + '"></li>';
            });

            html += '</ol>';

            return html;
        },

        addEvents: function () {

            var pictureIndicator = j.getDescendantsByClassName(this.container, 'picture-indicator')[0];
            this.carouselButtons = j.getDescendantsByClassName(this.container, 'carousel-button');

            j.forEach(this.carouselButtons, function (button) {
                j.attachListener(button, 'click', function (e) {
                    carousel.handleButtonClick(e, button);
                });
            });

            j.delegateTagNameListener(pictureIndicator, 'click', 'li', function (e) {
                carousel.handlePictureIndicatorClick(e, this);
            });

            if (isTouchAvailable) {
                j.attachListener(this.pictureContainer, 'touchstart', this.handleTouchStart);
                j.attachListener(this.pictureContainer, 'touchmove', this.handleTouchMove);
                j.attachListener(this.pictureContainer, 'touchend', this.handleTouchEnd);
            } else {
                j.attachListener(this.pictureContainer, 'mousedown', function (e) {
                    j.cancelDefault(e);
                    carousel.handleTouchStart(e);
                });

                j.attachListener(this.pictureContainer, 'mousemove', function (e) {
                    j.cancelDefault(e);
                    carousel.handleTouchMove(e);
                });

                j.attachListener(this.pictureContainer, 'mouseup', function (e) {
                    j.cancelDefault(e);
                    carousel.handleTouchEnd(e);
                });
            }

            j.attachWindowListener('load', function () {
                carousel.loadImageQueue();
            });
        },

        handleTouchStart: function (e) {

            this.isActive = true;

            var touchDetail = e.touches && e.touches.length ? e.touches[0] : e;
            this.event = e;
            this.startXpos = touchDetail.pageX;
            this.startYpos = touchDetail.pageY;
        },

        handleTouchMove: function (e) {

            if (!this.isActive) {
                return;
            }

            var touchDetail = e.touches && e.touches.length ? e.touches[0] : e,
                deltaX = this.startXpos - touchDetail.pageX,
                deltaY = this.startYpos - touchDetail.pageY;

            //stop the screen from scrolling up/down if they have only moved up/down by a certain amount
            if (Math.abs(deltaX) > 15 || Math.abs(deltaY) < 5) {
                e.preventDefault();
            }
        },

        handleTouchEnd: function (e) {

            if (!this.isActive) {
                return;
            }

            this.isActive = false;

            var touchDetail = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e,
                deltaX = this.startXpos - touchDetail.pageX,
                deltaY = this.startYpos - touchDetail.pageY,
                isLeft = deltaX > 0;

            //only change the picture if they have moved more in the x plane
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                carousel[isLeft ? 'next' : 'previous']();
            }
        },

        handleButtonClick: function (e, button) {
            j.cancelDefault(e);

            var direction = j.hasClass(button, 'carousel-right') ? 'next' : 'previous';

            carousel[direction]();
        },

        handlePictureIndicatorClick: function (e, listElem) {
            j.cancelDefault(e);

            var pattern = /\spicture-(\d+)/,
                matches = pattern.exec(listElem.className),
                pictureIndexToMoveTo = parseInt(matches && (matches.length && matches[1]), 10);

            if (!isNaN(pictureIndexToMoveTo)) {
                this.moveToPicture(pictureIndexToMoveTo);
                this.setPictureIndicator();
            }

            this.setPictureOffset();
        },

        moveToPicture: function (pictureIndex) {

            /* picture you wish to move to is the same as the current one, when resizing the browser due to image
            dimension changes we need to force a recalculation of distance to travel */
            if (pictureIndex === this.currentPictureIndex) {
                this.currentPictureIndex = 0;
                this.offset = 0;
            }

            var pictureIndexArray = [this.currentPictureIndex, pictureIndex].sort(function (a, b) {
                    return a - b;
                }),
                direction = this.currentPictureIndex > pictureIndex ? DIRECTION_BACKWARD : DIRECTION_FORWARD,
                picturesToTravelAcross = this.pictureElems.slice(this.pictureElems[pictureIndexArray[0]].index, this.pictureElems[pictureIndexArray[1]].index),
                i = 0,
                picture;

            if (DIRECTION_BACKWARD === direction) {
                picturesToTravelAcross.reverse();
            }

            while ((picture = picturesToTravelAcross[i++])) {
                this.updateCurrentPictureIndex(direction);
                this.calcPictureOffset(direction, picture.index);
                this.hidePreviouslyFocusedList(direction);
            }
        },

        hasExceededCarouselBounds: function (direction) {

            var enforceBounds = {
                forward: function () {
                    if (this.currentPictureIndex === this.lastPictureItem) {
                        return true;
                    }
                },
                backward: function () {
                    if (this.currentPictureIndex === 0) {
                        return true;
                    }
                }
            };

            return enforceBounds[direction].call(this);
        },

        next: function (e) {

            if (!this.hasExceededCarouselBounds(DIRECTION_FORWARD)) {
                this.calcPictureOffset(DIRECTION_FORWARD);
                this.updateCurrentPictureIndex(DIRECTION_FORWARD);
                this.setPictureOffset();
                this.hidePreviouslyFocusedList(DIRECTION_FORWARD);
                this.setPictureIndicator();
            }
        },

        previous: function (e) {

            if (!this.hasExceededCarouselBounds(DIRECTION_BACKWARD)) {
                this.calcPictureOffset(DIRECTION_BACKWARD);
                this.updateCurrentPictureIndex(DIRECTION_BACKWARD);
                this.setPictureOffset();
                this.hidePreviouslyFocusedList(DIRECTION_BACKWARD);
                this.setPictureIndicator();
            }
        },

        updateCurrentPictureIndex: function (direction) {

            var updateCurrentPictureIndex = {
                forward: function () {
                    ++this.currentPictureIndex;
                },
                backward: function () {
                    --this.currentPictureIndex;
                }
            };

            updateCurrentPictureIndex[direction].call(this);
        },

        setPictureIndicator: function () {

            var previouslyFocused = j.getDescendantsByClassName(this.pictureIndicator, ACTIVE_PICTURE)[0],
                focused = j.getDescendantsByClassName(this.pictureIndicator, 'picture-' + this.currentPictureIndex)[0];

            j.removeClass(previouslyFocused, ACTIVE_PICTURE);
            j.addClass(focused, ACTIVE_PICTURE);
        },

        calcPictureOffset: function (direction, pictureIndex) {

            pictureIndex = pictureIndex || this.currentPictureIndex;

            var calculateOffset = {
                    forward: function () {
                        return this.offset -= j.getOuterSize(this.pictureElems[pictureIndex].elem)[1];
                    },
                    backward: function () {
                        var pictureElemIndex = pictureIndex !== 0 ? pictureIndex - 1 : pictureIndex;

                        return this.offset += j.getOuterSize(this.pictureElems[pictureElemIndex].elem)[1];
                    }
                };

            calculateOffset[direction].call(this);
        },

        hidePreviouslyFocusedList: function (direction) {

            var locatePreviouslyFocused = {
                    forward: function () {
                        return this.pictureElems[this.currentPictureIndex - 1].elem;
                    },
                    backward: function () {
                        return this.pictureElems[this.currentPictureIndex + 1].elem;
                    }
                },
                elem = locatePreviouslyFocused[direction].call(this);

            if (!j.hasClass(elem, CLASS_HIDDEN)) {
                j.toggleClass(elem, CLASS_HIDDEN);
            }
        },

        centerImageInViewPort: function () {

            this.carouselViewPortWidth = j.getOuterSize(this.carouselWrapper)[1];
            this.currentPictureWidth = j.getOuterSize(this.pictureElems[this.currentPictureIndex].elem)[1];

            return (this.carouselViewPortWidth - this.currentPictureWidth) / 2;
        },

        setPictureOffset: function () {
            var pixelsToCenterImage = this.centerImageInViewPort(),
                pictureElem = this.pictureElems[this.currentPictureIndex].elem;

            this.pictureContainer.style.left = this.offset + pixelsToCenterImage + 'px';

            if (j.hasClass(pictureElem, CLASS_HIDDEN)) {
                j.toggleClass(this.pictureElems[this.currentPictureIndex].elem, CLASS_HIDDEN);
            }
        },

        positionCarouselButtons: function () {
            var carouselButtonOffset = ((this.carouselViewPortWidth / 2) - (this.currentPictureWidth / 2));

            this.carouselButtons[0].style.left = carouselButtonOffset + 'px';
            this.carouselButtons[1].style.right = carouselButtonOffset + 'px';
        }
    };

    time.Carousel = Carousel;

}(window, document, jessie, time));