require(['jquery', 'Carousel1/Carousel'], function () {
    $('#crs').flexslider({
        animation: "slide",
        animationLoop: true,
        itemWidth: 200,
        itemMargin: 0,
        pausePlay: false,
        start: function(slider){
            $('body').removeClass('loading');
        }
    });
})