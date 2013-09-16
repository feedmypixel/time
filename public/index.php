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

<!--[if IE 8]>     <html class="ie ie-8"> <![endif]-->
<!--[if IE 9]>     <html class="ie ie-9"> <![endif]-->
<!--[if gt IE 9]>  <html> <![endif]-->
<!--[if !IE]><!--> <html> <!--<![endif]-->
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
<meta charset="utf-8">
<meta name="viewport"                   content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="HandheldFriendly"           content="true"/>
<meta name="apple-touch-fullscreen"     content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="author"                     content="feedMyPixel&#46;com"/>
<meta name="description"                content="Time - A Lazy Gramophone Press collaborative project"/>
<meta name="keywords"                   content="Time, lazy gramophone, LazyGramophone"/>
<meta name="copyright"                  content="LazyGramophone&copy;"/>
<meta name="rating"                     content="general"/>
<meta http-equiv="imagetoolbar"         content="no"/>
<meta name="Rating"                     content="general"/>
<meta name="Distribution"               content="Global"/>
<meta http-equiv="content-script-type"  content="text/javascript"/>

<!-- twitter card -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@lazygramophone">
<meta name="twitter:creator" content="@lazygramophone">
<meta name="twitter:url" content="http://time.lazygramophone.com">
<meta name="twitter:title" content="Time - A Lazy Gramophone Press collaborative project">
<meta name="twitter:description" content="&#34;It is through Time that we pay testament to the power of collaboration.&#34;
The stories in this book have been structured around a Central Story. The Central Story is biographical in that it follows the course of a character’s life through childhood to adolescence–adulthood and then on into old age.
Initially inspired by a discussion on gamebooks, this project has taken over three years to grow into what you are now holding in your hands. The importance of collaboration has always been central to Lazy Gramophone Press’s ethos, especially the pairing of words and images. This project therefore, is our chance to bring everyone together under one cover, all focused upon the same theme in order to produce a unique portrait of time.">
<meta name="twitter:image" content="http://time.lazygramophone.com/assets/img/time_social.png">

<link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57-precomposed.png">
<link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<?php

    $environment = getenv('APPLICATION_ENVIRONMENT');

    if ('development' === $environment) {
?>
        <!-- dev non concatenated styles -->
        <link href="assets/style/reset.css" rel="stylesheet"/>
        <link href="assets/style/master.css" rel="stylesheet"/>
        <link href="assets/style/mediaQuery.css" rel="stylesheet"/>
<?php
    } else { ?>
        <!-- build:css assets/style/time.min.css -->
        <link href="assets/style/time.min.css" rel="stylesheet"/>
        <!-- endbuild -->
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
            <h1 class="time-logo">Lazy Gramophone - Time.</h1>
            <div class="static-clock-wrapper center-positioned" id="clock">
                <img alt="Time." src="assets/img/static_clock.png" />
            </div>
        </div>

        <div class="center-positioned full-width" role="main">
            <div class="center-positioned main-information limited-width group">
                <h2 class="large-text quote full-width center-aligned">&#34;It is through Time that we pay testament to the power of collaboration.&#34;</h2>
                <div class="separator"></div>
                <div class="third-width feedback">
                    <p class="gutter-right medium-text light-text">&quot;Time is a treasure box brimming with creativity and fresh talent.&quot; <a class="source highlight" href="http://www.roomsmagazine.com/index.php/2013/05/lazy-gramophone-launches-new-book/" target="_blank"><h2>Rooms Magazine</h2></a></p>
                </div>
                <div class="separator"></div>
                <div class="third-width feedback">
                    <p class="gutter-right medium-text light-text">&quot;An intriguing book project from one of the most innovative groups of creative people in the city.&quot; <a class="source highlight" href="http://www.huffingtonpost.co.uk/musa-okwonga/the-time-project-by-lazy-gramophone-interview_b_3529191.html" target="_blank"><h2>Huffington Post</h2></a></p>
                </div>
                <div class="separator"></div>
                <div class="third-width feedback">
                    <p class="gutter-right medium-text light-text">&quot;&#133;we'll bet you've never seen time as it's portrayed in this stunning new publication.&quot; <a class="source highlight" href="http://theforwardgroup.ceros.com/fabricmagazine/may2013/page/39" target="_blank"><h2>Fabric Magazine</h2></a></p>
                </div>
            </div>
            <div class="center-positioned main-information limited-width group">
                <div class="separator"></div>
                <div class="third-width feedback">
                    <p class="gutter-right medium-text light-text">&quot;Lazy Gramophone’s anthology, Time, lives up to the high bar it sets for itself.&quot; <a class="source highlight" href="http://annexemagazine.com/review-time-edited-by-sam-rawlings/" target="_blank"><h2>Annexe Magazine</h2></a></p>
                </div>
                <div class="separator"></div>
                <div class="third-width feedback">
                    <p class="gutter-right medium-text light-text">&quot;Time is a bold multimedia enigma, unafraid to take risks, and almost always compelling.&quot; <a class="source highlight" href="http://www.litro.co.uk/2013/08/book-review-time-an-anthology-by-lazy-gramophone-ed-sam-rawlings/" target="_blank"><h2>Litro</h2></a></p>
                </div>
                <div class="separator"></div>
                <div class="third-width feedback">
                    <p class="gutter-right medium-text light-text">&quot;Time is a fascinating collection littered with not only wonderful literature but also fabulous illustrations that ultimately make it a credit to any book-lover's shelves.&quot; <a class="source highlight" href="http://sabotagereviews.com/2013/08/04/time-ed-sam-rawlings/" target="_blank"><h2>Sabotage</h2></a></p>
                </div>
            </div>
            <a href="http://www.lazygramophone.com/shop/time" class="large-big-text buy-book center-aligned center-positioned" target="_blank"><h2>Buy Time.</h2></a>
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
        <!-- build:js assets/script/time.min.js -->
        <script type="text/javascript" src="assets/script/time.min.js"></script>
        <!-- endbuild -->
<?php
    }
?>

        <script type="text/javascript">
            time.utils.initApp();
        </script>
    </div>
</body>
</html>