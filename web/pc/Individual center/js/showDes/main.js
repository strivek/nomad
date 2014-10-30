require(['jquery'], function () {

        //输入框
        var $input = $(".r_wrap .show");
        //下拉框
        var $dropList = $('.r_wrap .list');
        $input.on("click", showDropList);
        $dropList.on("click", "a", syncDropList);

    function showDropList() {
        $(this).siblings().toggle();
    }

    function syncDropList(e) {
        var $value = $(this).html();
        $input.text($value);
        e.preventDefault();
        $dropList.hide();
    }
//    var droplist = function(){
//
//    }
//    droplist.prototype.init = function(){
//
//    }
//    droplist.prototype.bindEvent = function(){
//
//    }
//    droplist.prototype.showDropList = function(){
//
//    }
//    droplist.prototype.syncDropList(e){
//
//    }
//
//
//    var e = new droplist( $("aaa"));
//
//    var e1 = new droplist($)("bbbb");


    //css 隐藏的下拉框
    //1.event:点击输入框，弹出下拉框
    //2.event:点击下拉菜单，输入框关闭，点击的下拉菜单选项与输入框绑定


})