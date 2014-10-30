require(['jquery','ajax/ajaxLoadMore'], function ($) {

    $('.j-load').alm({
        url:'json/data.json',
        container: $('.j-data')
    });

    $('.j-load1').alm({
        url:'json/data1.json',
        container: $('.j-data1'),
        mixTemplate: function(data){
            var dataBox = '';
            $.each(data, function(idx,img){
                dataBox += '<a class="img" target="_blank" href="' + img.href + '"><img class="cover" src="' + img.src + '" alt="' + img.alt + '"/></a>';
            });
            return dataBox;
        }
    })

});