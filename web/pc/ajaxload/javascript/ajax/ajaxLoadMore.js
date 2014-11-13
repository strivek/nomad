define(['jquery'], function ($) {

    $.fn.alm = function(options){

        var opts = $.extend({}, $.fn.alm.defaults, options),
            $this = $(this),
            container = opts.container,
            loadHeight = opts.container.height(),
            pageNum = 0,
            mixTemplate = $.isFunction(opts.mixTemplate) ? opts.mixTemplate :
                function(data){

                    var dataBox = '';

                    $.each(data, function(idx,news){
                        dataBox += '<li><a class="link" target="_blank" href="' + news.link + '"><span>' + news.date + '</span>' + news.title + '</a></li>';
                    });

                    return dataBox;
                };

        function loadNext() {

            var request = getData();

            setData(request);

        }

        function getData() {

            var results = $.ajax({
                type: opts.type,
                url: opts.url,
                cache: false,
                data: { perPage: opts.perPage, pages: pageNum },
                beforeSend: function(){
                    $this.text('正在加载…………')
                }
            });

            return results;

        }

        function setData(dataRequest) {

            dataRequest.done(function(data){

                createHtml(data);

                pageAnimate();

            });

            dataRequest.fail(function(data){

                $this.text('加载失败').attr('disabled', 'true').off('click');

            })

        }

        function createHtml(data){

            htmlStr = mixTemplate(data);

            if($(htmlStr).find('img').length){

                var t_img; // 定时器
                var isLoad = true; // 控制变量
                // 判断图片加载状况，加载完成后回调
                isImgLoad(function(){
                    // 加载完成
                    container.append(htmlStr);
                    resetBtn()
                });
                // 判断图片加载的函数
                function isImgLoad(callback){
                    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
                    // 查找所有封面图，迭代处理
                    $('.cover').each(function(){
                        // 找到为0就将isLoad设为false，并退出each
                        if(this.height === 0){
                            isLoad = false;
                            return false;
                        }
                    });
                    // 为true，没有发现为0的。加载完毕
                    if(isLoad){
                        clearTimeout(t_img); // 清除定时器
                        // 回调函数
                        callback();
                        // 为false，因为找到了没有加载完成的图，将调用定时器递归
                    }else{
                        isLoad = true;
                        t_img = setTimeout(function(){
                            isImgLoad(callback); // 递归扫描
                        },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
                    }
                }

                /*var imgCount = $(htmlStr).find('img').length;
                var imgLoaded = 0;
                $(htmlStr).hide()
                    .appendTo(container)
                    .find('img')
                    .load(function(){
                        ++imgLoaded;
                        if(imgLoaded >= imgCount){
                            container.children().show();
                            resetBtn()
                        }
                    });
                setTimeout( function(){
                    container.children().show();
                    resetBtn()
                }, 5000);*/

            }else{
                container.append(htmlStr);
                resetBtn()
            }

        }

        function resetBtn(){
            $this.text('加载更多');
            if(pageNum == opts.totalPages){
                $this.text('没有更多了').attr('disabled', 'true').off('click');
            }
        }

        function pageAnimate() {

            $(document.body).animate({scrollTop : '+='+loadHeight},1000);

        }

        return this.each(function(){

            $this.on('click', function(){

                loadNext();

                pageNum++;

            })

        });

    };

    $.fn.alm.defaults = {

        url: '',
        type: 'POST',
        perPage: 5,
        totalPages: 3,
        container: null,
        btn: $(this),
        mixTemplate:null

    }

});