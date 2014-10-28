require(['jquery','ajax/ajaxLoadMore'], function ($) {

    $.ajaxLoadMore({
        url:'json/data.json'
    });

});