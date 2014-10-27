require(['jquery','ajax/ajaxLoadMore'], function ($) {

    $('.j-load').on('click', function(){
        $.ajaxLoadMore({
            url:'json/data.json'
        });
    });

});