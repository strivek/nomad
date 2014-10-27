define(['jquery'], function ($) {

    var AjaxLoadMore = function(options) {

        this.opts = $.extend({}, AjaxLoadMore.defaults, options);

        this.getData();

    };

    AjaxLoadMore.prototype = {

        getData : function(){

            var request = $.ajax({
                type: this.opts.type,
                url: this.opts.url,
                data: { perPage: this.opts.ajaxPerPage, totalPages: this.opts.ajaxTimes }
            });

            request.done(function (msg) {
                var data = '';
                $.each(msg, function (idx, news) {
                    data += '<li><a class="link" target="_blank" href="' + news.link + '"><span>' + news.date + '</span>' + news.title + '</a></li>';
                });
                $('.j-data').append(data);
            });

        },

        createHtml : function () {
            
        }
    };

    AjaxLoadMore.defaults = {

        url : '',
        type : 'POST',
        ajaxTimes : 5,
        ajaxPerPage : 5,
        getData : null,
        createHtml : null

    };

    var rAjaxLoadMore = function(options) {
        new AjaxLoadMore(options);
    };

    window.rAjaxLoadMore = $.rAjaxLoadMore = $.ajaxLoadMore = rAjaxLoadMore;
});