require(['jquery','ajax/ajaxLoadMore'], function ($) {

    /*$.ajaxLoadMore({
        url:'json/data.json',
        container: $(".j-data"),
        btn: $(".j-load")
    });

    $.ajaxLoadMore({
        url:'json/data1.json',
        container: $(".j-data1"),
        btn: $(".j-load1")
    });*/

    $('.j-load').alm({
        url:'json/data.json',
        container: $('.j-data')
    });

    $('.j-load1').alm({
        url:'json/data1.json',
        container: $('.j-data1'),
        mixTemplate: function(data){
            var dataBox = '';
            $.each(data, function(idx,news){
                dataBox += '<li><a class="link data1" target="_blank" href="' + news.link + '"><span>' + news.date + '</span>' + news.title + '</a></li>';
            });
            return dataBox;
        }
    })

});