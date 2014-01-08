(function( win, doc, time ){
    'use strict';

    //http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    (function(){
        var lastTime = 0, vendors =
                [
                    'ms',
                    'moz',
                    'webkit',
                    'o'
                ], x;

        for( x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ){
            window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
            window.cancelRequestAnimationFrame = window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
        }

        if( !window.requestAnimationFrame ){
            window.requestAnimationFrame = function( callback ){
                var currTime = new Date().getTime();
                var timeToCall = Math.max( 0, 16 - (currTime - lastTime) );
                var id = window.setTimeout( function(){
                        callback( currTime + timeToCall );
                    }, timeToCall );

                lastTime = currTime + timeToCall;

                return id;
            };
        }

        if( !window.cancelAnimationFrame ){
            window.cancelAnimationFrame = function( id ){
                clearTimeout( id );
            };
        }
    }());

    var DEVICE_PIXEL_RATIO = 1; 
    var CLOCK_CANVAS_ID = 'clock';
    var CLOCK_BACK_DETAIL_COLOUR = '#0076a5';
    var CLOCK_HAND_COLOUR = '#191715';
    var CLOCK_MAX_SIZE = 1000;
    var CLOCK_MIN_SIZE = 315; 
    var CLOCK_RESIZE_BUFFER = 20; 
    var backwardThreeSecondStore; 
    var backwardFiveMinuteStore; 
    var ctx; 
    var now; 
    var clockContainer;
    var canvas; 
    var clockDetail; 
    var canvasDetail; 
    var timeDetail = {
         seconds: 0,
         minutes: 0,
         hours: 0
    };
    var utils = time.utils;
    var logoImage = new Image();

    function init(){

        var staticClock;

        logoImage.src = 'assets/img/time_title.svg';

        clockContainer = doc.getElementById( CLOCK_CANVAS_ID );
        canvas = doc.createElement( 'canvas' );
        staticClock = utils.getFirstElemChild( clockContainer );

        clockContainer.replaceChild( canvas, staticClock );

        try {

            ctx = canvas.getContext( '2d' );

        } catch( e ){}

        if( ctx ){

            buildClock();
        }

        //utils.hideAddressBar();
    }

    function buildClock(){

        setUpClock();
        drawClock();
        calcTime();
        drawSecondHand();
        drawBackwardThreeSecondHand();
        drawMinuteHand();
        drawBackwardFiveMinuteHand();
        drawHourHand();
        drawTimeLogo();

        win.requestAnimationFrame( buildClock );
    }

    function calcClockDimensions(){

        var innerWidth = win.innerWidth - CLOCK_RESIZE_BUFFER;
        var diameter = innerWidth > CLOCK_MAX_SIZE ? CLOCK_MAX_SIZE : ( ( innerWidth < CLOCK_MIN_SIZE ) ? CLOCK_MIN_SIZE : innerWidth );

        canvasDetail = {
            width: diameter,
            height: diameter,
            radius: ( diameter / 2 ),
            devicePixelRatio: {
                width: ( diameter * DEVICE_PIXEL_RATIO ),
                height: ( diameter * DEVICE_PIXEL_RATIO )
            }
        };

        clockDetail = {
            devicePixelRatio: {
                center: -( canvasDetail.devicePixelRatio.width / 14.5454545 ),
                radius: ( diameter * DEVICE_PIXEL_RATIO ) / 2.67037037
            }
        };
    }

    function setUpClock(){

        calcClockDimensions();

        var positionXAndY = ( canvasDetail.devicePixelRatio.height / 2 );

        now = new Date();
        canvas.width = canvasDetail.devicePixelRatio.width;
        canvas.height = canvasDetail.devicePixelRatio.height;

        canvas.style.width = canvasDetail.width + 'px';
        canvas.style.height = canvasDetail.height + 'px';

        ctx.clearRect( 0, 0, canvasDetail.devicePixelRatio.width, canvasDetail.devicePixelRatio.height );
        ctx.translate( positionXAndY, positionXAndY );
        ctx.rotate( -Math.PI / 2 );
    }

    function drawClock(){

        ctx.save();
        ctx.translate( clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center );
        ctx.fillStyle = CLOCK_BACK_DETAIL_COLOUR;
        ctx.beginPath();
        ctx.arc( 0, 0, clockDetail.devicePixelRatio.radius, 0, Math.PI * 2, true );
        ctx.closePath();

        ctx.fill();

        ctx.restore();
    }

    function drawTimeLogo(){

        var imageScaledHeight = ( canvasDetail.devicePixelRatio.width / 1.3 );
        var imageScaledWidth = imageScaledHeight * 0.77182404; //aspect ratio of svg dimensions
        var devicePixelRatioWidthDivideByTwo = ( canvasDetail.devicePixelRatio.width / 2 );
        var buffer = imageScaledWidth / 16;

        ctx.save();
        ctx.rotate( Math.PI / 2 );
        ctx.translate( ( devicePixelRatioWidthDivideByTwo - imageScaledWidth - buffer ), -devicePixelRatioWidthDivideByTwo + buffer );
        ctx.drawImage( logoImage, 0, 0, imageScaledWidth, imageScaledHeight );
        ctx.restore();
    }

    function calcTime(){

        var hours = now.getHours();

        timeDetail.seconds = now.getSeconds();
        timeDetail.minutes = now.getMinutes();
        timeDetail.hours = hours >= 12 ? hours - 12 : hours;
    }

    function drawSecondHand(){
        ctx.save();

        //set to center of clock
        ctx.translate( clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center );
        ctx.translate( 0, clockDetail.devicePixelRatio.radius / 1.77631579 ); //(0, 152) in full size mode

        ctx.rotate( timeDetail.seconds * Math.PI / 30 );
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo( 0, 0 );
        ctx.arc( 0, 0, 6, 0, Math.PI * 2, true );
        ctx.fill();

        ctx.beginPath();
        ctx.arc( 0, 0, 11, 0, Math.PI * 2, true );
        ctx.stroke();

        ctx.lineTo( canvasDetail.devicePixelRatio.width, 0 );
        ctx.stroke();

        ctx.restore();
    }

    function drawBackwardThreeSecondHand(){

        if( 'undefined' === typeof backwardThreeSecondStore ){
            backwardThreeSecondStore = timeDetail.seconds;
        }

        if( 0 === (timeDetail.seconds % 3) ){
            backwardThreeSecondStore = timeDetail.seconds;
        }

        ctx.save();

        //set to center of clock
        ctx.translate( clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center );
        ctx.translate( clockDetail.devicePixelRatio.radius / 5.29411765, clockDetail.devicePixelRatio.radius / 3.25301205 ); //(51, 83) in full size mode

        ctx.rotate( backwardThreeSecondStore * Math.PI / -30 );
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo( 0, 0 );

        ctx.beginPath();
        ctx.arc( 0, 0, 5, 0, Math.PI * 2, true );
        ctx.fill();

        ctx.lineTo( clockDetail.devicePixelRatio.radius / 2, 0 );
        ctx.stroke();
        ctx.beginPath();

        ctx.restore();
    }

    function drawMinuteHand(){
        ctx.save();

        //set to center of clock
        ctx.translate( clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center );
        ctx.translate( -(clockDetail.devicePixelRatio.radius / 19.2857143), -(clockDetail.devicePixelRatio.radius / 12.8571429) ); //(-14, -21) in full size mode

        ctx.rotate( ( Math.PI / 30 ) * timeDetail.minutes + ( Math.PI / 1800 ) * timeDetail.seconds );
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo( 0, 0 );

        ctx.beginPath();
        ctx.arc( 0, 0, 6, 0, Math.PI * 2, true );
        ctx.stroke();

        ctx.lineTo( clockDetail.devicePixelRatio.radius * 1.1, 0 );
        ctx.stroke();
        ctx.beginPath();

        ctx.restore();
    }

    function drawBackwardFiveMinuteHand(){

        if( 'undefined' === typeof backwardFiveMinuteStore ){
            backwardFiveMinuteStore = timeDetail.minutes;
        }

        if( 0 === (timeDetail.minutes % 5) ){
            backwardFiveMinuteStore = timeDetail.minutes;
        }

        ctx.save();

        //set to center of clock
        ctx.translate( clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center );
        ctx.translate( -( clockDetail.devicePixelRatio.radius / 3.69863014 ), clockDetail.devicePixelRatio.radius / 1.28571429 ); //(73, 210) in full size mode

        ctx.rotate( ( Math.PI / -30 ) * backwardFiveMinuteStore + ( Math.PI / 1800 ) * timeDetail.seconds );
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo( 0, 0 );

        ctx.beginPath();
        ctx.arc( 0, 0, 8, 0, Math.PI * 2, true );
        ctx.fill();

        ctx.lineTo( (clockDetail.devicePixelRatio.radius / 4), 0 );
        ctx.stroke();
        ctx.beginPath();

        ctx.restore();
    }

    function drawHourHand(){
        ctx.save();

        //set to center of clock
        ctx.translate( clockDetail.devicePixelRatio.center, clockDetail.devicePixelRatio.center );
        ctx.translate( -(clockDetail.devicePixelRatio.radius / 4.65517241), 0 ); //(-58, 0) in full size mode

        ctx.rotate( timeDetail.hours * ( Math.PI / 6 ) + (Math.PI / 360) * timeDetail.minutes + ( Math.PI / 21600 ) * timeDetail.seconds );
        ctx.strokeStyle = CLOCK_HAND_COLOUR;
        ctx.fillStyle = CLOCK_HAND_COLOUR;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.arc( 0, 0, 9, 0, Math.PI * 2, true );
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo( 0, 0 );

        ctx.lineTo( clockDetail.devicePixelRatio.radius * 1.2, 0 );
        ctx.stroke();
        ctx.beginPath();

        ctx.fill();

        ctx.restore();
    }

    time.clock = {
        init: init
    };

}( window, document, time ));