require.config({
    baseUrl: "js",
    packages: ['Carousel','Carousel1','Carousel2'],
    paths: {
        jquery: "lib/jquery.1.11.0.min"
    }
});
require(['Carousel']);//大图带有小图标一起轮播 Max-Min_crs.html
require(['Carousel1']);//图片列表轮播 List_crs.html
require(['Carousel2']);//简单图片轮播 basic_crs.html