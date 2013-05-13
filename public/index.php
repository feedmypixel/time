<?php
require_once( $_SERVER['DOCUMENT_ROOT'] . '/lazy/GooglePlusOne.php' );
require_once( $_SERVER['DOCUMENT_ROOT'] . '/lazy/TwitterButton.php' );
require_once( $_SERVER['DOCUMENT_ROOT'] . '/lazy/FacebookLikeButton.php' );

$googlePlusOne = new Lazy_GooglePlusOne(
    array(
        'size' => 'medium'
    )
);

$twitterButton = new Lazy_TwitterButton(
    array(
        'data-count' => 'horizontal'
    )
);

$facebookLike = new Lazy_FacebookLikeButton(
    array(
        'send'       => 'false',
        'width'      => 70,
        'show_faces' => 'false',
        'font'       => 'arial',
        'layout'     => 'button_count'
    ));
?>
<!DOCTYPE html>
<html prefix="og: http://opengraphprotocol.org/schema/ fb: http://www.facebook.com/2008/fbml">
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
<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/googleAnalytics.php' );
?>
<!--[if lte IE 6]>
<?php
    require_once( $_SERVER['DOCUMENT_ROOT'] . '/includes/ie6warning.inc.php' );
?>
<![endif]-->
    <div class="centered-positioned limited-width header" role="banner">
        <h1 class="time-logo">Time.</h1>
        <canvas id="clock" role="complementary">
            <noscript>
                <img src="assets/img/static_clock.png" alt="Time."/>
            </noscript>
            <p>Either you have turned JavaScript off or your browser doesn't support html5 elements!</p>
        </canvas>
        <a href="http://www.lazygramophone.com/shop/time" class="buy-book" target="_blank">Buy Book</a>
    </div>

    <div class="centered-positioned full-width" role="main">
        <div class="centered-positioned main-information limited-width group">
            <p class="quote large-text full-width center-aligned">&#34;It is through Time that we pay testament to the power of collaboration.&#34;</p>
            <div class="third-width">
                <p class="gutter-right medium-text light-text">&quot;The Lazy Gramophone group as a collective have demonstrated a remarkable and inspiring ethos throughout and their willingness to provide a means of expression is second to none.&quot; <em class="source highlight">Amelias Magazine</em></p>
            </div>
            <div class="third-width">
                <p class="gutter-right medium-text light-text">&quot;&#133;we'll bet you've never seen time as it's portrayed in this stunning new publication.&quot; <em class="source highlight">Fabric Magazine.</em></p>
            </div>
            <div class="third-width">
                <p class="gutter-right medium-text light-text">&quot;In a time when publishers are taking fewer and fewer risks on unknown writers, Lazy Gramophone are to be applauded for giving their collective a chance to shine.&quot; <em class="source highlight">Litro Magazine</em></p>
            </div>
        </div>
    </div>

    <div id="carousel">
        <img alt="Time Cover" src="assets/img/carousel/small/timeCover.jpg" />
    </div>

    <div class="inner-footer full-width center-aligned" role="contentinfo">
        <ul class="group social-links">
            <li>
                <?php echo $facebookLike->render(); ?>
            </li>
            <li>
                <?php echo $twitterButton->render(); ?>
            </li>
            <li class="gpo">
                <?php echo $googlePlusOne->render(); ?>
            </li>
            <li class="last">
                <a href="http://www.youtube.com/lazygramophone?hl=en-GB&amp;gl=GB" title="Time on YouTube" target="_blank" role="link">
                    <h2 id="you-tube">Time on YouTube</h2>
                </a>
            </li>
        </ul>
        <a href="http://www.lazygramophone.com" class="medium-text footer-link" target="_blank" title="Lazy Gramophone | Arts Collective & Independent Publisher" role="link">www.lazygramophone.com</a>
        <div class="mini-text copyright" role="contentinfo">
            <p>&#169; All content copyright <a href="http://www.lazygramophone.com" title="Lazy Gramophone | Arts Collective & Independent Publisher" role="link">www.lazygramophone.com</a> &amp; respective artists
                <?php
                ini_set('date.timezone', 'Europe/London');
                $startYear = 2003;
                $thisYear = date('Y');
                echo $startYear = ($startYear == $thisYear) ? $startYear : "{$startYear}-{$thisYear}";
                ?>&#46;
                Do not copy or link any content without permission&#46;</p>
            <a href="http://www.feedmypixel.com" id="fmp" target="_blank" title="Made by feedMyPixel" role="link">feedMyPixel</a>
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

<!-- google +1 -->
<script type="text/javascript" src="https://apis.google.com/js/plusone.js">
    {lang: 'en-GB'}
</script>

<!-- tweet button -->
<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>

<!-- fb like-->
<div id="fb-root"></div>
<script type="text/javascript">

    window.fbAsyncInit = function() {
        FB.init({
            appId      : 138329379582178,
            channelUrl : '<?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/channel/' ?>',
            status     : true,
            cookie     : true,
            xfbml      : true
        });
    };

    (function(d, debug){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
        ref.parentNode.insertBefore(js, ref);
    }(document, /*debug*/ false));

</script>
</body>
</html>