define(['jquery'], function ($) {

    var AjaxLoadMore = function(options) {
        this.opts = $.extend({}, AjaxLoadMore.defaults, options);
        this.wrap = $(".wrap");//容器
        this.btnLoad = $(".wrap").find(".loadmore");//按钮
        this.init();


    };
    AjaxLoadMore.prototype.init = function(){
        var that = this;
        $(".btnLoad").click($.proxy(this.loadData,this));//方法1

    };

    AjaxLoadMore.prototype.loadData = function(){

    }

    AjaxLoadMore.prototype = {

        getData : function(){

            var request = $.ajax({
                type: this.opts.type,
                url: this.opts.url,
                data: { perPage: this.opts.perPage, pages: this.opts.times }
            });

            request.done(function (msg) {
                var data = '';
                $.each(msg, function (idx, news) {
                    data += '<li><a class="link" target="_blank" href="' + news.link + '"><span>' + news.date + '</span>' + news.title + '</a></li>';
                });
                $('.j-data').append(data);
            });

        }

    };

    AjaxLoadMore.defaults = {

        url : '',
        type : 'POST',
        times : 0,
        perPage : 5,
        totalPages : 5,
        getData : null,
        createHtml : null

    };

    var rAjaxLoadMore = function(options) {
        new AjaxLoadMore(options);
    };

    window.rAjaxLoadMore = $.rAjaxLoadMore = $.ajaxLoadMore = rAjaxLoadMore;

});