require(['jquery','ajax/ajaxLoadMore'], function ($) {

    $.ajaxLoadMore({
        url:'json/data.json',
        container: $(".j-data"),
        btn: $(".j-load")
    });

    $.ajaxLoadMore({
        url:'json/data1.json',
        container: $(".j-data1"),
        btn: $(".j-load1")
    });

});