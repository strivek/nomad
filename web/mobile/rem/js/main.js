/*
require(['zepto'], function () {
//   $('html').css('fontSize','1rem');

    var oHtml=$('html');
    var phptoWid='';
    var currentRem='';
    function setPx(){
        phptoWid=oHtml.width();
        currentRem=phptoWid/320*20+'px';
        oHtml.css('fontSize',currentRem);
    }
    setPx();


    $(window).on('resize orientationchange').resize(function(){
        setPx();
    });
//    alert(currentRem);
});*/
$(function(){
    var oHtml=$('html');
    var phptoWid='';
    var currentRem='';
    function setPx(){
        phptoWid=oHtml.width();
        currentRem=phptoWid/320*20+'px';
        oHtml.css('fontSize',currentRem);
    }
    setPx();


    $(window).on('resize orientationchange').resize(function(){
        setPx();
    });
});
