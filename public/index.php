<!DOCTYPE html>
<!--
  __                  _                   ___  _              _
 / _|  ___   ___   __| |  /\/\   _   _   / _ \(_)__  __  ___ | |
| |_  / _ \ / _ \ / _` | /    \ | | | | / /_)/| |\ \/ / / _ \| |
|  _||  __/|  __/| (_| |/ /\/\ \| |_| |/ ___/ | | >  < |  __/| |
|_|   \___| \___| \__,_|\/    \/ \__, |\/     |_|/_/\_\ \___||_| 2013
                                 |___/

Currently beta, mail bugs(at)feedmypixel(dot)com

Good in latest Chrome, firefox, safari, Opera, IE 10, 9, Android 2.3 - 4.1, OSX 4, 5, 6
Works in IE 8 but needs presentation work,
Need to do work on IE 7 & 6

!-->
<!-- //TODO adjust relevant styles here -->
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

<head>
    <script>
        (function (win, doc) {

            doc.documentElement.removeAttribute('class');
            
            var pixelRatio = 'undefined' !== typeof win.devicePixelRatio ? win.devicePixelRatio : '1',
                actualScreenWidth = parseInt(Math.max(doc.documentElement.clientWidth, doc.documentElement.clientHeight) * pixelRatio, 10),
                viewportSize,
                expiresTime = new Date;

            expiresTime.setDate(expiresTime.getDate() + 1000);

            switch (true) {
                case actualScreenWidth <= 800:
                    viewportSize = 'small';
                    break;
                case actualScreenWidth > 800 && actualScreenWidth <= 1200:
                    viewportSize = 'medium';
                    break;
                case actualScreenWidth > 1200:
                    viewportSize = 'large';
                    break;
                default:
                    viewportSize = 'small';
                    break;
            }

            doc.cookie = 'viewportsize=' + viewportSize + '; screenwidth=' + actualScreenWidth + '; expires=' + expiresTime.toUTCString() + '; path=/';
        }(window, document));
    </script>
<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/meta.inc.php' );
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/headerIcons.inc.php' );

    $environment = getenv('APPLICATION_ENVIRONMENT');

    if ('development' === $environment) {
?>
        <!-- dev non concatenated styles -->
        <link href="assets/style/reset.css" rel="stylesheet"/>
        <link href="assets/style/master.css" rel="stylesheet"/>
        <link href="assets/style/mediaQuery.css" rel="stylesheet"/>
<?php
    } else { ?>
        <link href="assets/style/time.min.css" rel="stylesheet"/>
<?php
    }
?>

<!--[if lte IE 6]>
    <link href="assets/style/ie6.css" rel="stylesheet"/>
<![endif]-->

<title>Time. - A collaborative project from Lazy Gramophone | Arts Collective & Independent Publisher</title>
</head>
<body>
    <div id="wrap">
<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/googleAnalytics.php' );
?>
<!--[if lte IE 6]>
<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/ie6warning.inc.php' );
?>
<![endif]-->
        <div class="center-positioned limited-width header" role="banner">
            <h1 class="time-logo">Time.</h1>
            <div class="static-clock-wrapper center-positioned" id="clock">
                <img alt="Time." src="assets/img/static_clock.png" />
            </div>
            <a href="http://www.lazygramophone.com/shop/time" class="buy-book center-aligned center-positioned" target="_blank"><h2>Buy Time.</h2></a>
        </div>

        <div class="center-positioned full-width" role="main">
            <div class="center-positioned main-information limited-width group">
                <h2 class="large-text quote full-width center-aligned">&#34;It is through Time that we pay testament to the power of collaboration.&#34;</h2>
                <div class="separator"></div>
                <div class="third-width">
                    <p class="gutter-right medium-text light-text">&quot;Time is a treasure box brimming with creativity and fresh talent.&quot; <a class="source highlight" href="http://www.roomsmagazine.com/index.php/2013/05/lazy-gramophone-launches-new-book/" target="_blank"><h2>Rooms Magazine</h2></a></p>
                </div>
                <div class="separator"></div>
                <div class="third-width">
                    <p class="gutter-right medium-text light-text">&quot;&#133;we'll bet you've never seen time as it's portrayed in this stunning new publication.&quot; <a class="source highlight" href="http://theforwardgroup.ceros.com/fabricmagazine/may2013/page/39" target="_blank"><h2>Fabric Magazine</h2></a></p>
                </div>
                <div class="separator"></div>
            </div>
        </div>

        <div class="section-separator"></div>

        <div class="center-positioned full-width">
            <div id="carousel">
                <noscript>
                    <?php
                        /* display list of images and text when JS is off */
                        require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/carouselNoScript.inc.php' );
                    ?>
                </noscript>
            </div>
        </div>

        <div class="section-separator"></div>

<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/artists.inc.php' );
?>

        <div class="footer full-width group" role="contentinfo">
            <div class="inner-footer limited-width center-positioned">
                <h2><a href="http://www.lazygramophone.com" class="lazygramophone" target="_blank" title="Lazy Gramophone | Arts Collective & Independent Publisher" role="link">Lazygramophone</a></h2>
                <ul class="group social-links">
                    <li>
                        <a href="https://www.facebook.com/pages/Lazy-Gramophone-Artists-Press/183721095020338" title="Lazy gramophone on facebook" target="_blank" role="link">
                            <h4 class="facebook massive-text"><em>facebook</em></h4>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/lazygramophone" title="Lazy gramophone on Twitter" target="_blank" role="link">
                            <h4 class="twitter massive-text"><em>Twitter</em></h4>
                        </a>
                    </li>
                    <li class="last">
                        <a href="http://www.youtube.com/lazygramophone?hl=en-GB&amp;gl=GB" title="Time on YouTube" target="_blank" role="link">
                            <h4 class="youtube massive-text"><em>YouTube</em></h4>
                        </a>
                    </li>
                </ul>
                <div class="mini-text copyright" role="contentinfo">
                    <p>&#169; All content copyright <a href="http://www.lazygramophone.com" target="_blank" title="Lazy Gramophone | Arts Collective & Independent Publisher" role="link">www.lazygramophone.com</a> &amp; respective artists
<?php

ini_set('date.timezone', 'Europe/London');
$startYear = 2003;
$thisYear = date('Y');
$yearDisplay = ($startYear == $thisYear) ? $startYear : "{$startYear}-{$thisYear}";

echo $yearDisplay; ?>&#46; Do not copy or link any content without permission&#46;</p>
                </div>
            </div>
        </div>

<?php
    if ('development' === $environment) {
?>
        <!-- dev non concatenated scripts -->
        <script type="text/javascript" src="assets/script/jessie.js"></script>
        <script type="text/javascript" src="assets/script/time.js"></script>
        <script type="text/javascript" src="assets/script/time.config.js"></script>
        <script type="text/javascript" src="assets/script/time.utils.js"></script>
        <script type="text/javascript" src="assets/script/time.clock.js"></script>
        <script type="text/javascript" src="assets/script/time.carousel.js"></script>
<?php
    } else {
?>
        <script type="text/javascript" src="assets/script/time.min.js"></script>
<?php
    }
?>

        <script type="text/javascript">
            time.utils.initApp();
        </script>
    </div>
</body>
</html>