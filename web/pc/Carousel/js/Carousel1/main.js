require(['jquery', 'Carousel1/Carousel'], function () {
    $('#crs').flexslider({
        animation: "slide",
        animationLoop: true,
        itemWidth: 210,
        itemMargin: 5,
        pausePlay: false,
        start: function(slider){
            $('body').removeClass('loading');
        }
    });
})