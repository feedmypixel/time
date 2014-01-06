(function( win, doc, j, time ){
    'use strict';

    var START_PICTURE_INDEX = 0;
    var DIRECTION_FORWARD = 'forward';
    var DIRECTION_BACKWARD = 'backward';
    var CLASS_HIDDEN = 'hidden';
    var ACTIVE_PICTURE = 'active';
    var carouselClass;
    var utils = time.utils; 
    var isTouchAvailable = utils.isTouchAvailable();


    function Carousel( container ){

        carouselClass = this;

        this.container = container;
        this.currentPictureIndex = 0;
        this.offset = 0;
        this.pictureElems = [];

        this.buildCarousel();
        this.addResizeHandler();
    }

    Carousel.prototype = {

        buildCarousel: function(){

            this.setupCarousel();
            this.centerCarousel();
            this.addEvents();
        },

        setupCarousel: function(){

            var carouselListElem = this.container.getElementsByTagName( 'ul' )[0];
            var carouselContainer = doc.createElement( 'div' );
            var carouselButtonLeft = doc.createElement( 'a' );
            var carouselButtonRight = carouselButtonLeft.cloneNode( true );
            var pictureIndicator = doc.createElement( 'ul' );
            var pictureIndicatorLi = doc.createElement( 'li' );
            var pictureElems;
            var active;


            //create carousel structure
            carouselListElem.className = 'carousel';
            carouselContainer.className = 'carousel-container';

            carouselButtonLeft.className = 'carousel-button carousel-button-left';
            carouselButtonRight.className = 'carousel-button carousel-button-right';

            carouselButtonLeft.href = '#';
            carouselButtonRight.href = '#';

            carouselContainer.appendChild( carouselButtonLeft );
            carouselContainer.appendChild( carouselListElem );
            carouselContainer.appendChild( carouselButtonRight );


            this.container.appendChild( carouselContainer );

            // add picture indicator element
            pictureElems = j.toArray( carouselListElem.childNodes );

           // preserve the index of the pictures
            for ( var i = 0; i < pictureElems.length; i++ ) {

                this.pictureElems.push({
                    index: i,
                    elem: pictureElems[ i ]
                });
            }

            pictureIndicator.className = 'picture-indicator';

            j.forEach( this.pictureElems, function( picture, i ) {

                active = 0 === i ? ' active' : '';
                pictureIndicatorLi.className = 'picture picture-' + i + active;

                pictureIndicator.appendChild( pictureIndicatorLi.cloneNode( true ) );
            });

            this.container.appendChild( pictureIndicator );


            //add carousel class helper properties
            this.carouselElem = carouselListElem;
            this.carouselContainer = carouselContainer;
            this.pictureIndicator = pictureIndicator;
            this.carouselButtons = [ carouselButtonLeft, carouselButtonRight ];

            this.pictureItemCount = this.pictureElems.length;
            this.lastPictureItem = this.pictureItemCount - 1;
        },

        addResizeHandler: function(){

            j.attachWindowListener( 'resize', utils.debounce( j.bind( function(){
                console.log( 'fired' );

                this.centerCarousel();

            }, this ), 10, false ) );
        },

        centerCarousel: function(){

            this.moveToPicture( START_PICTURE_INDEX );
            this.setPictureOffset();
            this.setPictureIndicator();
            this.positionCarouselButtons();
        },

        addEvents: function(){

            j.delegateBoundClassNameListener( this.carouselContainer, 'click', 'carousel-button', j.bind( function( e, buttonElem ){

                this.handleDirectionalButtonClick( e, buttonElem );
            }, this ) );

            j.delegateTagNameListener( this.pictureIndicator, 'click', 'li', j.bind( function( e, listElem ){

                this.handlePictureIndicatorClick( e, listElem );
            }, this ) );

            if( isTouchAvailable ){

                j.attachListener( this.carouselContainer, 'touchstart', this.handleTouchStart );
                j.attachListener( this.carouselContainer, 'touchmove', this.handleTouchMove );
                j.attachListener( this.carouselContainer, 'touchend', this.handleTouchEnd );

            } else {

                j.attachListener( this.carouselContainer, 'mousedown', j.bind( function( e ){

                    j.cancelDefault( e );
                    this.handleTouchStart( e );

                }, this ) );

                j.attachListener( this.carouselContainer, 'mousemove', j.bind( function( e ){

                    j.cancelDefault( e );
                    this.handleTouchMove( e );

                }, this ) );

                j.attachListener( this.carouselContainer, 'mouseup', j.bind( function( e ){

                    j.cancelDefault( e );
                    this.handleTouchEnd( e );

                }, this ) );
            }
        },

        handleDirectionalButtonClick: function( e, button ){

            j.cancelDefault( e );

            var direction = j.hasClass( button, 'carousel-button-right' ) ? 'next' : 'previous';

            this[ direction ]();
        },

        handlePictureIndicatorClick: function( e, listElem ){

            j.cancelDefault( e );

            var pattern = /\spicture-(\d+)/;
            var matches = pattern.exec( listElem.className );
            var pictureIndexToMoveTo = parseInt( matches && ( matches.length && matches[1] ), 10 );

            if( !isNaN( pictureIndexToMoveTo ) ){

                this.moveToPicture( pictureIndexToMoveTo );
                this.setPictureIndicator();
            }

            this.setPictureOffset();
        },

        handleTouchStart: function( e ){

            this.isActive = true;

            var touchDetail = e.touches && e.touches.length ? e.touches[0] : e;
            this.event = e;
            this.startXpos = touchDetail.pageX;
            this.startYpos = touchDetail.pageY;
        },

        handleTouchMove: function( e ){

            if( !this.isActive ){
                return;
            }

            var touchDetail = e.touches && e.touches.length ? e.touches[0] : e, deltaX = this.startXpos - touchDetail.pageX, deltaY = this.startYpos - touchDetail.pageY;

            //stop the screen from scrolling up/down if they have only moved up/down by a certain amount
            if( Math.abs( deltaX ) > 15 || Math.abs( deltaY ) < 5 ){
                e.preventDefault();
            }
        },

        handleTouchEnd: function( e ){

            if( !this.isActive ){
                return;
            }

            this.isActive = false;

            var touchDetail = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e, deltaX = this.startXpos - touchDetail.pageX, deltaY = this.startYpos - touchDetail.pageY, isLeft = deltaX > 0;

            //only change the picture if they have moved more in the x plane
            if( Math.abs( deltaX ) > Math.abs( deltaY ) ){

                carouselClass[ isLeft ? 'next' : 'previous' ]();
            }
        },

        moveToPicture: function( pictureIndex ){

            /* picture you wish to move to is the same as the current one, when resizing the browser due to image
             dimension changes we need to force a recalculation of distance to travel */
            if( pictureIndex === this.currentPictureIndex ){
                this.currentPictureIndex = 0;
                this.offset = 0;
            }

            var pictureIndexArray = [ this.currentPictureIndex, pictureIndex ].sort( function( a, b ){
                    return a - b;
                } );
            var direction = this.currentPictureIndex > pictureIndex ? DIRECTION_BACKWARD : DIRECTION_FORWARD;
            var picturesToTravelAcross = this.pictureElems.slice( this.pictureElems[ pictureIndexArray[ 0 ] ].index, this.pictureElems[ pictureIndexArray[ 1 ] ].index );
            var i = 0;
            var picture;

            if( DIRECTION_BACKWARD === direction ){
                picturesToTravelAcross.reverse();
            }

            while( ( picture = picturesToTravelAcross[ i++ ] ) ){

                this.updateCurrentPictureIndex( direction );
                this.calcPictureOffset( direction, picture.index );
                //this.hidePreviouslyFocusedList( direction );
            }
        },

        hasExceededCarouselBounds: function( direction ){

            var enforceBounds = {

                forward: function(){

                    if( this.currentPictureIndex === this.lastPictureItem ){

                        return true;
                    }
                },

                backward: function(){

                    if( this.currentPictureIndex === 0 ){

                        return true;
                    }
                }
            };

            return enforceBounds[ direction ].call( this );
        },

        next: function( e ){

            if( !this.hasExceededCarouselBounds( DIRECTION_FORWARD ) ){

                this.calcPictureOffset( DIRECTION_FORWARD );
                this.updateCurrentPictureIndex( DIRECTION_FORWARD );
                //this.hidePreviouslyFocusedList( DIRECTION_FORWARD );
                this.setPictureOffset();
                this.setPictureIndicator();
            }
        },

        previous: function( e ){

            if( !this.hasExceededCarouselBounds( DIRECTION_BACKWARD ) ){

                this.calcPictureOffset( DIRECTION_BACKWARD );
                this.updateCurrentPictureIndex( DIRECTION_BACKWARD );
                //this.hidePreviouslyFocusedList( DIRECTION_BACKWARD );
                this.setPictureOffset();
                this.setPictureIndicator();
            }
        },

        updateCurrentPictureIndex: function( direction ){

            var updateCurrentPictureIndex = {

                forward: function(){

                    ++this.currentPictureIndex;
                },

                backward: function(){

                    --this.currentPictureIndex;
                }
            };

            updateCurrentPictureIndex[direction].call( this );
        },

        setPictureIndicator: function(){

            var previouslyFocused = j.getDescendantsByClassName( this.pictureIndicator, ACTIVE_PICTURE )[0];
            var focused = j.getDescendantsByClassName( this.pictureIndicator, 'picture-' + this.currentPictureIndex )[0];

            j.removeClass( previouslyFocused, ACTIVE_PICTURE );
            j.addClass( focused, ACTIVE_PICTURE );
        },

        calcPictureOffset: function( direction, pictureIndex ){

            pictureIndex = pictureIndex || this.currentPictureIndex;

            var calculateOffset = {

                forward: function(){

                    return this.offset -= j.getOuterSize( this.pictureElems[ pictureIndex ].elem )[ 1 ];
                },

                backward: function(){

                    var pictureElemIndex = pictureIndex !== 0 ? pictureIndex - 1 : pictureIndex;

                    return this.offset += j.getOuterSize( this.pictureElems[ pictureElemIndex ].elem )[ 1 ];
                }
            };

            calculateOffset[ direction ].call( this );
        },

/*        hidePreviouslyFocusedList: function( direction ){

            var locatePreviouslyFocused = {
                    forward: function(){
                        return this.pictureElems[this.currentPictureIndex - 1].elem;
                    },
                    backward: function(){
                        return this.pictureElems[this.currentPictureIndex + 1].elem;
                    }
                }, elem = locatePreviouslyFocused[direction].call( this );

            if( !j.hasClass( elem, CLASS_HIDDEN ) ){
                j.toggleClass( elem, CLASS_HIDDEN );
            }
        },*/

        centerImageInViewPort: function(){

            this.carouselViewPortWidth = j.getOuterSize( this.carouselContainer )[1];
            this.currentPictureWidth = j.getOuterSize( this.pictureElems[ this.currentPictureIndex ].elem )[1];

            return ( this.carouselViewPortWidth - this.currentPictureWidth ) / 2;
        },

        setPictureOffset: function(){

            var pixelsToCenterImage = this.centerImageInViewPort();
            var pictureElem = this.pictureElems[ this.currentPictureIndex ].elem;

            this.carouselElem.style.left = this.offset + pixelsToCenterImage + 'px';

            if( j.hasClass( pictureElem, CLASS_HIDDEN ) ){

                j.toggleClass( this.pictureElems[ this.currentPictureIndex ].elem, CLASS_HIDDEN );
            }
        },

        positionCarouselButtons: function(){

            var carouselButtonOffset = ( (this.carouselViewPortWidth / 2 ) - ( this.currentPictureWidth / 2 ) );

            this.carouselButtons[ 0 ].style.left = carouselButtonOffset + 'px';
            this.carouselButtons[ 1 ].style.right = carouselButtonOffset + 'px';
        }
    };

    time.Carousel = Carousel;

}( window, document, jessie, time ));