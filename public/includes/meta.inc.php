<?php
require_once( $_SERVER['DOCUMENT_ROOT'] . '/lazy/FacebookOpenGraphMetaTags.php' );

$fbOpenGraph = new Lazy_FacebookOpenGraphMetaTags(
    array(
        'title'     => 'Time - A Lazy Gramophone Press collaborative project',
        'url'       => 'http://time.lazygramophone.com',
        'site_name' => 'Lazy Gramophone',
        'app_id'    => 138329379582178,
        'type'      => 'book',
        'image'     => 'http://time.lazygramophone.com/assets/img/time_social.png',
        'admins'    => 642075139)
);
?>
<meta charset="utf-8">
<meta name="viewport"                   content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="HandheldFriendly"           content="true"/>
<meta name="apple-touch-fullscreen"     content="yes" />
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
<meta name="twitter:description" content="A countdown to the latest collaborative project from the Arts Collective & Independent Publisher Lazy Gramophone. &#34;It is through Time that we pay testament to the power of collaboration.&#34;">
<meta name="twitter:image" content="http://time.lazygramophone.com/assets/img/time_social.png">
<?php
if ($fbOpenGraph) {
    echo $fbOpenGraph->renderOpenGraphTags();
}
?>