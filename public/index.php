<!DOCTYPE html>
<html>
<head>
    <script>
        (function (win, doc) {
            //set image size to be used
            //TODO potentially leave this so its always set
            //if (doc.cookie.indexOf('imagesize') === -1) {

                var pixelRatio = 'undefined' !== typeof win.devicePixelRatio ? win.devicePixelRatio : '1',
                    actualScreenWidth = Math.max(screen.width, screen.height) * pixelRatio,
                    imageSize,
                    expiresTime = new Date;

                expiresTime.setDate(expiresTime.getDate() + 1000);

                switch (true) {
                    case actualScreenWidth <= 800:
                        imageSize = 'small';
                        break;
                    case actualScreenWidth > 800 && actualScreenWidth <= 1200:
                        imageSize = 'medium';
                        break;
                    case actualScreenWidth > 1200:
                        imageSize = 'large';
                        break;
                    default:
                        imageSize = 'small';
                        break;
                }

                doc.cookie='imagesize=' + imageSize + '; expires=' + expiresTime.toUTCString() + '; path=/';
           // }

        }(window, document));
    </script>
<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/meta.inc.php' );
?>

<link href="assets/style/reset.css" rel="stylesheet"/>
<link href="assets/style/master.css" rel="stylesheet"/>
<link href="assets/style/mediaQuery.css" rel="stylesheet"/>

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
            <canvas id="clock" role="complementary">
                <noscript>
                    <img src="assets/img/static_clock.png" alt="Time."/>
                </noscript>
                <p>Either you have turned JavaScript off or your browser doesn't support html5 elements!</p>
            </canvas>
            <a href="http://www.lazygramophone.com/shop/time" class="buy-book center-aligned center-positioned" target="_blank"><h2>Buy Time.<h2></h2></a>
        </div>

        <div class="center-positioned full-width" role="main">
            <div class="center-positioned main-information limited-width group">
                <h2 class="large-text quote full-width center-aligned">&#34;It is through Time that we pay testament to the power of collaboration.&#34;</h2>
                <div class="separator"></div>
                <div class="third-width">
                    <p class="gutter-right medium-text light-text">&quot;Time is a treasure box brimming with creativity and fresh talent.&quot; <a class="source highlight" href="http://www.roomsmagazine.com/index.php/2013/05/lazy-gramophone-launches-new-book/" target="_blank"><h3>Rooms Magazine</h3></a></p>
                </div>
                <div class="separator"></div>
                <div class="third-width">
                    <p class="gutter-right medium-text light-text">&quot;&#133;we'll bet you've never seen time as it's portrayed in this stunning new publication.&quot; <a class="source highlight" href="http://theforwardgroup.ceros.com/fabricmagazine/may2013/page/39" target="_blank"><h3>Fabric Magazine</h3></a></p>
                </div>
                <div class="separator"></div>
                <div class="third-width">
                    <p class="gutter-right medium-text light-text">&quot;In a time when publishers are taking fewer and fewer risks on unknown writers, Lazy Gramophone are to be applauded for giving their collective a chance to shine.&quot; <a class="source highlight" href="http://theforwardgroup.ceros.com/fabricmagazine/may2013/page/39" target="_blank"><h3>Litro Magazine</h3></a></p>
                </div>
                <div class="separator"></div>
            </div>
        </div>

        <div class="section-separator"></div>

        <div class="center-positioned full-width">
            <div id="carousel">
                <img alt="Time Cover" src="assets/img/responsiveImages/small/timeCover.jpg" />
            </div>
        </div>

        <div class="section-separator"></div>

<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/artists.inc.php' );
?>

        <div class="footer full-width group" role="contentinfo">
            <div class="inner-footer limited-width center-positioned">
                <a href="http://www.lazygramophone.com" class="lazygramophone" target="_blank" title="Lazy Gramophone | Arts Collective & Independent Publisher" role="link">Lazygramophone</a>
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
                    <p>&#169; All content copyright <a href="http://www.lazygramophone.com" title="Lazy Gramophone | Arts Collective & Independent Publisher" role="link">www.lazygramophone.com</a> &amp; respective artists
<?php

ini_set('date.timezone', 'Europe/London');
$startYear = 2003;
$thisYear = date('Y');
$yearDisplay = ($startYear == $thisYear) ? $startYear : "{$startYear}-{$thisYear}";

echo $yearDisplay; ?>&#46; Do not copy or link any content without permission&#46;</p>
                </div>
            </div>
        </div>

        <!--TODO look into this some more is it really working well? -->
        <div id="preload-images">
            <img src="assets/img/time_title.png" width="1" height="1" alt="" />
        </div>

        <script type="text/javascript" src="assets/script/jessie.js"></script>
        <script type="text/javascript" src="assets/script/time.js"></script>
        <script type="text/javascript" src="assets/script/time.config.js"></script>
        <script type="text/javascript" src="assets/script/time.utils.js"></script>
        <script type="text/javascript" src="assets/script/time.clock.js"></script>
        <script type="text/javascript" src="assets/script/time.carousel.js"></script>
        <script type="text/javascript">
            time.utils.initApp();
        </script>
    </div>
</body>
</html>