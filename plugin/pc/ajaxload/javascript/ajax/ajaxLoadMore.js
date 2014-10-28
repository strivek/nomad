define(['jquery'], function ($) {

    var AjaxLoadMore = function (options) {
        this.opts = $.extend({}, AjaxLoadMore.defaults, options);
        this.container = this.opts.container;
        this.btn = this.opts.btn;
        this.pageNum = 0;
        //this.pageLens = 5;
        //this.pageCount = this.opts.totalPages;
        this.init();
    };
    AjaxLoadMore.prototype.init = function () {

        this.btn.click($.proxy(this.loadData, this));//方法1

    };

    AjaxLoadMore.prototype.viewAll = function () {

        alert('没了没了');

    };

    AjaxLoadMore.prototype.loadData = function () {
        //判断是否需要获取数据

        if (this.pageNum < this.opts.totalPages) {

            this.nextPage();

        } else {

            this.viewAll();

        }
    };
    AjaxLoadMore.prototype.nextPage = function () {

        var request = this.getData();

        this.setData(request);

    };
    AjaxLoadMore.prototype.getData = function () {

        var results = $.ajax({
            type: this.opts.type,
            url: this.opts.url,
            data: { perPage: this.opts.perPage, pages: this.pageNum }
        });

        this.pageNum++;

        return results;

    };
    AjaxLoadMore.prototype.setData = function(dataRequest){

        var that = this;

        dataRequest.done(function(data){

            that.mixTemplate(data);

        });

        dataRequest.fail(function(data){

            alert('加载失败');

        })

    };
    AjaxLoadMore.prototype.mixTemplate = function(data){

        var dataBox = '';

        $.each(data, function (idx, news) {
            dataBox += '<li><a class="link" target="_blank" href="' + news.link + '"><span>' + news.date + '</span>' + news.title + '</a></li>';
        });

        this.container.append(dataBox);

    };


    /*AjaxLoadMore.prototype.getCurrentPage = function () {
        //可以加验证，判断是否为数字
        //return this.btn.data("curPage");
        return this.opts.times;

    };
    AjaxLoadMore.prototype.setCurrentPage = function (num) {
        //返回值可以用来判断是否设置成功
        //return this.btn.data('curPage', num+1);
        return this.opts.times++;

    };*/

//    AjaxLoadMore.prototype.getData = {
//
//        getData: function () {
//
//            var request = $.ajax({
//                type: this.opts.type,
//                url: this.opts.url,
//                data: { perPage: this.opts.perPage, pages: this.opts.times }
//            });
//
//            request.done(function (msg) {
//                var data = '';
//                $.each(msg, function (idx, news) {
//                    data += '<li><a class="link" target="_blank" href="' + news.link + '"><span>' + news.date + '</span>' + news.title + '</a></li>';
//                });
//                $('.j-data').append(data);
//            });
//
//        }
//
//    };

    AjaxLoadMore.defaults = {

        url: '',
        type: 'POST',
        perPage: 5,
        totalPages: 3,
        container: $(".j-data"),
        btn: $(".j-load")

    };

    var rAjaxLoadMore = function (options) {
        new AjaxLoadMore(options);
    };

    window.rAjaxLoadMore = $.rAjaxLoadMore = $.ajaxLoadMore = rAjaxLoadMore;

});