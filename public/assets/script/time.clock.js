(function (win, doc, time) {

    //http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    (function () {
        var lastTime = 0,
            vendors = ['ms', 'moz', 'webkit', 'o'],
            x;

        for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelRequestAnimationFrame = window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                    id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);

                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }());

    var DEVICE_PIXEL_RATIO = 1,
        CLOCK_CANVAS_ID = 'clock',
        STATIC_CLOCK_BACKGROUND_IMG = 'assets/img/static_clock.png',
        STATIC_CLOCK_BACKGROUND_IMG_PNG8 = 'assets/img/static_clock_8bit.png',
        CLOCK_BACK_DETAIL_COLOUR = '#0076a5',
        CLOCK_HAND_COLOUR = '#242323',
        CLOCK_ROLE_ATTRIBUTE = 'complementary',
        CLOCK_CLASS_NAME = 'static-clock-wrapper center-positioned',
        CLOCK_MAX_SIZE = 420,
        CLOCK_MIN_SIZE = 230,
        CLOCK_RESIZE_BUFFER = 20,
        backwardThreeSecondStore,
        backwardFiveMinuteStore,
        ctx,
        now,
        canvasPlaceholder,
        canvas,
        clockDetail,
        canvasDetail,
        timeDetail = {
            seconds: 0,
            minutes: 0,
            hours: 0
        },
        config = time.config,
        utils = {
            negateNumber: function (number) {
                return (Math.abs(parseInt(number, 10)) * -1);
            },
            hideAddressBar: function () {
                win.scrollTo(0, 1);
            },
            isIE6: function () {
                return (/msie\s6/.test(win.navigator.userAgent.toLowerCase()));
            }
        },
        logoImage = doc.createElement('img');
        //TODO change this back to create a new image object once chrome has fixed their issue

    logoImage.src = config.app.clock.timeTitleImage;

    function init() {

        canvasPlaceholder = doc.getElementById(CLOCK_CANVAS_ID);
        canvas = doc.createElement('canvas');
        canvas.role = CLOCK_ROLE_ATTRIBUTE;
        canvas.className = CLOCK_CLASS_NAME;

        canvasPlaceholder.parentNode.replaceChild(canvas, canvasPlaceholder);

        try {
            ctx =  canvas.getContext('2d');
        } catch (e) {}

        if (!!ctx) {
            buildClock();
        } else {
            //drop in an image for non html5 capable browsers
            var image = doc.createElement('img');
            image.src = utils.isIE6() ? STATIC_CLOCK_BACKGROUND_IMG_PNG8 : STATIC_CLOCK_BACKGROUND_IMG;
            image.className = CLOCK_CLASS_NAME;

            image.onload = function () {
                canvas.parentNode.replaceChild(image, canvas);
            };
        }

        utils.hideAddressBar();
    }

    function buildClock() {

        setUpClock();
        drawTimeLogo();
        drawClock();
        calcTime();
        drawSecondHand();
        drawBackwardThreeSecondHand();
        drawMinuteHand();
        drawBackwardFiveMinuteHand();
        drawHourHand();

        win.requestAnimationFrame(buildClock);
    }

    function calcClockDimensions() {

        var innerWidth = win.innerWidth - CLOCK_RESIZE_BUFFER,
            diameter = innerWidth > CLOCK_MAX_SIZE ? CLOCK_MAX_SIZE : ((innerWidth < CLOCK_MIN_SIZE) ? CLOCK_MIN_SIZE : innerWidth);

        canvasDetail = {
            width: diameter,
            height: diameter,
            radius: (diameter / 2),
            devicePixelRatio: {
                width: (diameter * DEVICE_PIXEL_RATIO),
                height: (diameter * DEVICE_PIXEL_RATIO)
            }
        };

        clockDetail = {
            devicePixelRatio: {
                center: -(canvasDetail.devicePixelRatio.width / 13.5454545),
                radius: (diameter * DEVICE_PIXEL_RATIO) / 2.37037037
            }
        };

    }

    function setUpClock() {

        calcClockDimensions();

        var positionXAndY = (canvasDetail.devicePixelRatio.height / 2);

        now = new Date();
        canvas.width = canvasDetail.devicePixelRatio.width;
        canvas.height = canvasDetail.devicePixelRatio.height;

        canvas.style.width = canvasDetail.width + 'px';
        canvas.style.height = canvasDetail.height + 'px';

        ctx.clearRect(0, 0, canvasDetail.devicePixelRatio.width, canvasDetail.devicePixelRatio.height);
        ctx.translate(positionXAndY, positionXAndY);
        ctx.rotate(-Math.PI / 2);
    }

    function drawClock() {

        ctx.save();
        ctx.translate(clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center);
        ctx.fillStyle = CLOCK_BACK_DETAIL_COLOUR;
        ctx.beginPath();
        ctx.arc(0, 0, clockDetail.devicePixelRatio.radius, 0, Math.PI * 2, true);
        ctx.closePath();

        ctx.fill();

        ctx.restore();
    }

    function drawTimeLogo() {
        var imageScaledHeight = (canvasDetail.devicePixelRatio.width / 1.36752137),
            imageScaledWidth = imageScaledHeight * 0.8525641,
            devicePixelRatioWidthDivideByTwo = (canvasDetail.devicePixelRatio.width / 2);

            ctx.save();
            ctx.rotate(Math.PI / 2);
            ctx.translate((devicePixelRatioWidthDivideByTwo - imageScaledWidth), -devicePixelRatioWidthDivideByTwo);
            ctx.drawImage(logoImage, 0, 0, imageScaledWidth, imageScaledHeight);
            ctx.restore();
    }

    function calcTime() {

        var hours = now.getHours();

        timeDetail.seconds = now.getSeconds();
        timeDetail.minutes = now.getMinutes();
        timeDetail.hours = hours >= 12 ? hours - 12 : hours;
    }

    function drawSecondHand() {
        ctx.save();

        //set to center of clock
        ctx.translate(clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center);
        ctx.translate(0, clockDetail.devicePixelRatio.radius / 1.77631579); //(0, 152) in full size mode

        ctx.rotate(timeDetail.seconds * Math.PI / 30);
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 6, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, 11, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.lineTo(clockDetail.devicePixelRatio.radius / 2.2, 0);
        ctx.stroke();

        ctx.restore();
    }

    function drawBackwardThreeSecondHand() {

        if ('undefined' === typeof backwardThreeSecondStore) {
            backwardThreeSecondStore = timeDetail.seconds;
        }

        if (0 === (timeDetail.seconds % 3)) {
            backwardThreeSecondStore = timeDetail.seconds;
        }

        ctx.save();

        //set to center of clock
        ctx.translate(clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center);
        ctx.translate(clockDetail.devicePixelRatio.radius / 5.29411765, clockDetail.devicePixelRatio.radius / 3.25301205); //(51, 83) in full size mode

        ctx.rotate(backwardThreeSecondStore * Math.PI / -30);
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(0, 0);

        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.lineTo(clockDetail.devicePixelRatio.radius / 2, 0);
        ctx.stroke();
        ctx.beginPath();

        ctx.restore();
    }

    function drawMinuteHand() {
        ctx.save();

        //set to center of clock
        ctx.translate(clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center);
        ctx.translate(-(clockDetail.devicePixelRatio.radius / 19.2857143), -(clockDetail.devicePixelRatio.radius / 12.8571429)); //(-14, -21) in full size mode

        ctx.rotate((Math.PI / 30) * timeDetail.minutes + (Math.PI / 1800) * timeDetail.seconds);
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(0, 0);

        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.lineTo(clockDetail.devicePixelRatio.radius * 1.1, 0);
        ctx.stroke();
        ctx.beginPath();

        ctx.restore();
    }

    function drawBackwardFiveMinuteHand() {

        if ('undefined' === typeof backwardFiveMinuteStore) {
            backwardFiveMinuteStore = timeDetail.minutes;
        }

        if (0 === (timeDetail.minutes % 5)) {
            backwardFiveMinuteStore = timeDetail.minutes;
        }

        ctx.save();

        //set to center of clock
        ctx.translate(clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center);
        ctx.translate(-(clockDetail.devicePixelRatio.radius / 3.69863014), clockDetail.devicePixelRatio.radius / 1.28571429); //(73, 210) in full size mode

        ctx.rotate((Math.PI / -30) * backwardFiveMinuteStore + (Math.PI / 1800) * timeDetail.seconds);
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(0, 0);

        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.lineTo((clockDetail.devicePixelRatio.radius / 4), 0);
        ctx.stroke();
        ctx.beginPath();

        ctx.restore();
    }

    function drawHourHand() {
        ctx.save();

        //set to center of clock
        ctx.translate(clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center);
        ctx.translate(-(clockDetail.devicePixelRatio.radius / 4.65517241), 0); //(-58, 0) in full size mode

        ctx.rotate(timeDetail.hours * (Math.PI / 6) + (Math.PI / 360) * timeDetail.minutes + (Math.PI / 21600) * timeDetail.seconds);
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, 0);

        ctx.lineTo(clockDetail.devicePixelRatio.radius * 1.2, 0);
        ctx.stroke();
        ctx.beginPath();

        ctx.fill();

        ctx.restore();
    }

    time.clock = {
        init: init
    };

}(window, document, time));

//TODO if the clock isnt on screen stop rendering it!