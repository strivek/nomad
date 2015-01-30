(function ($) {
    var vp, s, map, mf, de, fi, page, ty, hv;
    var html = $("HTML,BODY");
    var body = $("BODY");
    var fixed_header_h = 75;

    function Viewport() {
        this.height, this.width;
        function init() {
            this.width = $(window).width();
            this.height = $(window).height();
            if (de != undefined)de.update()
        }
        this.update = init;
        this.update()
    }
    function Scroll() {
        var top;

        function init() {
            top = html.scrollTop() != 0 ? html.scrollTop() : body.scrollTop();
            if (ty != undefined)ty.scroll();
            if (de != undefined)de.scroll()
        }

        this.top = function (t) {
            if (t != undefined) {
                html.scrollTop(t);
                top = t
            }
            return top
        };
        this.animTop = function (t, a_t, callback) {
            t = t < fixed_header_h ? t : t - fixed_header_h;
            html.animate({"scrollTop": t}, a_t);
            if (typeof callback == "function")setTimeout(function () {
                callback()
            }, a_t)
        };
        this.update = init;
        this.update()
    }

    function Map() {
        var ANIM_TIME = 500;
        var map_container = $(".map-container");
        if (map_container.length === 0)return{getMap: function () {
        }};
        var that = this;
        that.mapTransfer = function (parent) {
            if (vp.width < 1024) {
                parent.parent().after(map_container);
                return
            }
            parent.parent().parent().append(map_container);
            if ((parent.parent().index() - 1) % 2 == 0)parent.parent().after(map_container); else parent.parent().next().after(map_container)
        };
        that.showMap = function (e) {
            e.preventDefault();
            var map_data = [];
            var parent = $(this).parents("[data-lat]");
            if (parent.length == 1) {
                map_data.push({"lat": parent.data("lat"), "lng": parent.data("lng")});
                if (map_container.css("display") != "block") {
                    that.mapTransfer(parent);
                    map_container.slideDown(ANIM_TIME);
                    s.animTop(map_container.offset().top, ANIM_TIME)
                } else map_container.slideUp(ANIM_TIME / 2,
                    function () {
                        that.mapTransfer(parent);
                        map_container.slideDown(ANIM_TIME);
                        setTimeout(function () {
                            s.animTop(map_container.offset().top, ANIM_TIME)
                        }, 10)
                    })
            } else {
                if (map_container.css("display") != "block")map_container.slideDown(ANIM_TIME);
                s.animTop(map_container.offset().top, ANIM_TIME)
            }
            that.getMap(map_data)
        };
        that.closeMap = function (e) {
            if (e != undefined)e.preventDefault();
            map_container.slideUp(ANIM_TIME)
        };
        body.on("click", ".show-on-map", that.showMap);
        body.on("click", ".map-close", that.closeMap);

    }

    function MailForm() {
        var ANIM_TIME = 500;
        var mail_form = $(".contact-form");
        var ajax_loader = $("<div>").addClass("ajax-loader").attr("style", "opacity:0").append($("<div>").addClass("bg")).append($("<p>").html(""));

        function submitForm() {
            var form = $(this);
            form.parent().append(ajax_loader);
            return false
        }
        mail_form.on("submit", "FORM", submitForm);
    }
    function Detail() {
        var detail = $(".detail");
        if (detail.length == 0)return{update: function () {
        }, scroll: function () {
        }};
        var ANIM_TIME = 100;
        var detail_table = detail.find("SECTION TABLE"), detail_slider = detail.find("HEADER .slider");
        this.update = function () {
            headerSliderHeight()
        };
        this.scroll = function () {
            fixedTable();
            if (s.top() <= 0)detail_slider.find(".red-border").addClass("red-border-anim"); else detail_slider.find(".red-border").removeClass("red-border-anim")
        };
        tableImgCorrection();
        detail_slider.find(".controll DIV").css("overflow", "visible");
        detail_slider.find(".controll LI").eq(1).addClass("showed");
        detail_slider.on("mouseenter", ".controll", function () {
            $(this).find("UL LI").removeClass("showed")
        });
        detail_table.on("mouseleave", tableHover);
        detail_table.on("mouseenter mouseleave", "TD", tableHover);
    }

    function Filter() {
        var ANIM_TIME = 500;
        var filter_form = $(".filter");
        var results = filter_form.parent().find(".results");
        var selects = filter_form.find("SELECT");

        function createFakeSelect(select) {
            var options = select.find("option"), wrap = $("<div>").addClass("fake-select"), button = $("<a>").attr("href",
                "#"), arrows = $("<span>").append($("<span>")), list = $("<ul>");
            for (var i = 0; i < options.length; i++) {
                options.eq(i).attr("data-index", i);
                if (select.val() == options.eq(i).val()) {
                    button.html(options.eq(i).html()).append(arrows);
                    list.append($("<li>").addClass("selected").attr("data-index", i).append($("<a>").attr("href", "#").html(options.eq(i).html())))
                } else list.append($("<li>").attr("data-index", i).append($("<a>").attr("href", "#").html(options.eq(i).html())))
            }

        }
        for (var i = 0; i < selects.length; i++)createFakeSelect(selects.eq(i))
    }
    function AjaxLoader() {
        var ANIM_TIME = 200;
        var pies = $("<div>").add($("<div>"));
        var ajax_loader = $("<div>").addClass("white-ajax-loader").css("opacity", 0).append($("<div>").addClass("bg")).append($("<div>").addClass("round").append($("<div>").addClass("pie").append(pies.eq(1))).append($("<div>").addClass("pie fill").append(pies.eq(0))).append($("<div>").addClass("slice").append($("<img>").attr("src",
                cdn_url + "threebeers/src/images/preloader.gif"))));
        this.black_ajax_loader = false;
        function transformAnim(pie, growth) {
            var retFun = {after: function () {
            }};
            pie.animate({borderSpacing: -180}, {step: function (now, fx) {
                if (growth)$(this).css(Modernizr.prefixed("transform"), "rotate(" + -now + "deg)"); else $(this).css(Modernizr.prefixed("transform"), "rotate(" + (180 - now) + "deg)")
            }, duration: ANIM_TIME, specialEasing: {borderSpacing: "linear"}, complete: function () {
                retFun.after()
            }});
            return retFun
        }
        function loop() {
            transformAnim(pies.eq(1), true).after =
                function () {
                    transformAnim(pies.eq(0), true).after = function () {
                        transformAnim(pies.eq(1), false).after = function () {
                            transformAnim(pies.eq(0), false).after = function () {
                                loop(pies, false)
                            }
                        }
                    }
                }
        }
        this.show = function (container) {
            var retFun = {after: function () {
            }};
            if (this.black_ajax_loader)ajax_loader.removeClass("white-ajax-loader").addClass("ajax-loader");
            ajax_loader.appendTo(container).animate({"opacity": 1}, ANIM_TIME, function () {
                loop();
                retFun.after()
            });
            return retFun
        };
        this.hide = function () {
            var retFun = {after: function () {
            }};
            ajax_loader.animate({"opacity": 0}, ANIM_TIME * 3, function () {
                pies.stop().attr("style", "");
                ajax_loader.remove();
                retFun.after()
            });
            return retFun
        }
    }
    function Types() {
        var types_section = $(".types SECTION");
        if (types_section.length == 0)return{scroll: function () {
        }};
        var types_list = types_section.find("UL"), types_list_items = types_list.children(), types_or = $(".or");
        var li_array = [];
        var ANIM_TIME = 200, TOP_SHIFT = 100;


        this.scroll =
            function () {
                for (var i = li_array.length - 1; i >= 0; i--) {
                    var li = li_array[i];
                    if (li.offset().top - TOP_SHIFT + li.height() / 2 < s.top() + vp.height) {
                        li_array.remove(li);
                        li.addClass("showed")
                    }
                }
            };
        for (var i = 0; i < types_list_items.length; i++)li_array.push(types_list_items.eq(i));
        this.scroll()
    }

    function PageTransition() {
        var ANIM_TIME = 500;
        var page_transition = $("#page-transition");
        var page_pies = page_transition.find(".pie");
        var hidden = $(".hidden-types, .hidden-detail");
        var is_loaded = false;

        function bear(show) {
            var retFun = {after: function () {
            }};
            if (show) {
                page_transition.show();
                page_pies.eq(0).css({"height": "100%", "bottom": 0, "top": "auto"});
                page_pies.eq(1).css({"height": "100%", "bottom": "", "top": 0});
                page_transition.find("IMG").css({"left": vp.width / 3 + "px"}).animate({"left": 0}, ANIM_TIME);
                page_transition.animate({opacity: 1}, ANIM_TIME / 2, function () {
                    page_pies.eq(0).animate({"height": 0}, ANIM_TIME / 2, function () {
                        page_pies.eq(1).animate({"height": 0}, ANIM_TIME / 2, function () {
                            retFun.after()
                        })
                    })
                })
            } else {
                is_loaded =
                    true;
                page_transition.find("IMG").animate({"left": -vp.width / 3}, ANIM_TIME);
                page_transition.animate({opacity: 0}, ANIM_TIME / 2, function () {
                    page_transition.hide();
                    retFun.after()
                })
            }
            return retFun
        }
        function bearLoop(h) {
            if (is_loaded)return;
            if (h == 0) {
                page_pies.eq(0).css({"bottom": 0, "top": "auto"});
                page_pies.eq(1).css({"bottom": "auto", "top": 0})
            } else page_pies.attr("style", "");
            page_pies.eq(0).animate({"height": h}, ANIM_TIME / 2, function () {
                if (is_loaded)return;
                page_pies.eq(1).animate({"height": h}, ANIM_TIME / 2, function () {
                    if (is_loaded)return;
                    bearLoop(h == 0 ? "100%" : 0)
                })
            })
        }
        this.show = function () {
            var retFun = {after: function () {
            }};
            if (location.hash != "") {
                if (hidden.length == 1) {
                    var spl = hidden.attr("class").split("hidden")[1];
                    hidden.addClass("no-animate");
                    hidden.removeClass("hidden" + spl);
                    hidden.length = 0
                }
                setTimeout(function () {
                    var st = $(location.hash).offset().top - fixed_header_h;
                    s.top(st)
                }, 100)
            }
            bear(false).after = function () {
                if (hidden.length == 1) {
                    if (location.hash == "")s.top(0);
                    hidden.removeClass("hidden" + hidden.attr("class").split("hidden")[1]);
                    setTimeout(function () {
                            retFun.after()
                        },
                            ANIM_TIME * 2)
                } else retFun.after()
            };
            return retFun
        };
        this.hide = function () {
            var retFun = {after: function () {
            }};
            bear(true).after = function () {
                retFun.after()
            };
            return retFun
        };
        bearLoop("100%");
    }
    function HomeVideo() {
        var video = $(".tiles .video");
        if (video.length == 0)return{start: function () {
        }};
        var url = cdn_url + "assets/files/baby";
        var imgs_array = [];
        var SHOTS = 14;
        var URLS = 3;

        function preload() {
            var imageObj = new Image;
            for (var j = 1; j < URLS + 1; j++)for (var i = 1; i < SHOTS + 1; i++) {
                imageObj = new Image;
                imageObj.src = url + j + "/" + i + ".jpg";
                imageObj.style.opacity = 0;
                video.append(imageObj);
                imgs_array.push(video.children().last())
            }
        }
        function loop(i) {
            imgs_array[i].animate({"opacity": 1}, 100, function () {
                var y = i == 0 ? imgs_array.length - 1 : i - 1;
                imgs_array[y].css({"opacity": 0});
                if (++i <
                    imgs_array.length)loop(i); else loop(0)
            })
        }
        this.start = function () {
            loop(0)
        };
        preload()
    }
    function socNetworks() {
        !function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], p = "";
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.async = true;
                js.src = p + "js/main.js";
                fjs.parentNode.insertBefore(js, fjs)
            }
        }(document, "script", "twitter-wjs");
        window.___gcfg = {lang: "cs"};
        (function () {
            var po = document.createElement("script");
            po.type = "text/javascript";
            po.async =
                true;
            po.async = true;
            po.src = "js/main.js";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(po, s)
        })()
    }
    $(document).ready(function () {
        aj = new AjaxLoader;
        vp = new Viewport;
        s = new Scroll;
        map = new Map;
        mf = new MailForm;
        de = new Detail;
        fi = new Filter;
        hv = new HomeVideo;
        page = new PageTransition;
        $(window).load(function () {
            vp.update();
            s.update();
            page.show().after = function () {
                ty = new Types;
                hv.start();
                socNetworks()
            }
        });
        $(window).resize(function () {
            vp.update()
        });
        $(window).scroll(function (e) {
            s.update()
        })
    })
})(jQuery);