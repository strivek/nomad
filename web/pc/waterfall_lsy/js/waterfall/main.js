//瀑布流调用
require(['jquery', 'waterfall/jquery.waterfall'], function ($) {
    $(function(){
        // 一次性全部加载到本地，再部分显示
//        $('#waterfall').waterfall({
////        	url: 'json/water.json',
////        	perNum: 5,			// 每次显示五个
////        	ajaxTimes: 1 		// 只发送一次请求
//        });


        // 按需加载方式
//        var wf_page = 0;
        $('#waterfall').waterfall({
            url: 'json/water.json',
            perNum: 5,			// 每次显示五个
            ajaxTimes: 1,		// 只发送一次请求
            createHtml: function(data){
                return '<div class="wf_item_inner">' +
                    '<a href="'+ data.url +'" class="thumb" target="_blank">' +
                    '<img class="thumb_img"  src="'+ data.imgSrc +'" />' +//图片类名必须添加thumb_img
                    '</a>' +
                    '<p class="desc" style="margin-top:1px;">'+ data.title +'</p>' +
                    '<a style="display:block;color:#060;" href="'+data.image+'" target="_blank">查看大图</a>' +
                    '</div>';
            }
        });
    });
});
