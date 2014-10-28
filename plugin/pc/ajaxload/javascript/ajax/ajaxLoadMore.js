define(['jquery'], function ($) {

    var AjaxLoadMore = function (options) {
        this.opts = $.extend({}, AjaxLoadMore.defaults, options);
        this.container = this.opts.container;
        this.btn = this.opts.btn;
        this.pageNum = 0;
        this.init();
    };
    AjaxLoadMore.prototype.init = function () {

        this.btn.click($.proxy(this.loadData, this));//方法1

    };

    AjaxLoadMore.prototype.loadData = function () {
        //判断是否需要获取数据

        if (this.pageNum < this.opts.totalPages) {

            this.nextPage();

            this.pageAnimate();

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
            cache: this.opts.cache,
            data: { perPage: this.opts.perPage, pages: this.pageNum }
        });

        this.pageNum++;

        if(this.pageNum == this.opts.totalPages){
            this.btn.text('view all');
        }

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

    AjaxLoadMore.prototype.viewAll = function () {

        alert('no more!!');

    };

    AjaxLoadMore.prototype.pageAnimate = function () {

        var loadHeight = (parseInt(this.container.children().css('height')) + 1) * this.opts.perPage;

        $(document.body).animate({scrollTop : '+='+loadHeight},800);

    };

    AjaxLoadMore.defaults = {

        url: '',
        type: 'POST',
        cache: false,
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