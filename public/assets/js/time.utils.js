time.utils = (function( win, doc, j, time ){

    var userHasScrolled = false;

    function buildCarousel(){
        var bookPreviewElem = doc.getElementById( 'book-preview' );

        new time.Carousel( bookPreviewElem );
    }

    function buildClock(){
        time.clock.init();
    }

    function isTouchAvailable(){
        return 'undefined' !== typeof win.ontouchstart;
    }

    function initWhenReady(){
        if( doc.addEventListener ){
            return doc.addEventListener( 'DOMContentLoaded', initApplication(), false );
        } else if( win.attachEvent ){
            return win.attachEvent( 'onload', initApplication );
        }
    }

    function initApplication(){
        buildClock();
        buildCarousel();
        addEvents();
    }

    function addEvents(){
        var htmlElem = doc.getElementsByTagName( 'html' )[0];

        j.attachListener( htmlElem, 'touchmove', function(){
            userHasScrolled = true;
        } );
    }

    // Cookie functions from http://www.quirksmode.org/js/cookies.html
    function getCookie( name ){
        var nameEQ = name + "=", ca = doc.cookie.split( ';' ), c;

        for( var i = 0; i < ca.length; i++ ){
            c = ca[i];
            while( c.charAt( 0 ) === ' ' ){
                c = c.substring( 1, c.length );
            }
            if( c.indexOf( nameEQ ) === 0 ){
                return c.substring( nameEQ.length, c.length );
            }
        }
        return null;
    }

    /**
     * Debounce functionality to send one signal from an event that is firing multiple times.
     * http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
     * @param func
     * @param threshold
     * @param execAsap
     * @return {Function}
     */
    function debounce( func, threshold, execAsap ){
        var timeout;

        return function debounced(){
            var obj = this, args = arguments;

            function delayed(){
                if( !execAsap ){
                    func.apply( obj, args );
                }
                timeout = null;
            }

            if( timeout ){
                clearTimeout( timeout );
            } else if( execAsap ){
                func.apply( obj, args );
            }

            timeout = setTimeout( delayed, threshold || 100 );
        };
    }

    function hideAddressBar(){
        setTimeout( function(){
            win.scrollTo( 0, 1 );
        }, 1000 );
    }

    function hasUserScrolled(){
        return userHasScrolled;
    }

    return {
        initApp: initWhenReady,
        isTouchAvailable: isTouchAvailable,
        getCookie: getCookie,
        debounce: debounce,
        hideAddressBar: hideAddressBar,
        hasUserScrolled: hasUserScrolled
    };

}( window, document, jessie, time ));