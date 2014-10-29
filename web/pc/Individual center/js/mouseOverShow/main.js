require(['jquery'], function () {
    var $infm=$("#infm");
    var $pop=$infm.find(".pop");
    var $icon=$pop.find(".doubt");//鼠标滑过图标
    var $pop_s=$pop.find(".pop_des");//鼠标滑过显示的提示信息

    $pop.on('mouseenter',function(){
        $(this).find($pop_s).show();
    });

    $pop.on('mouseleave',function(){
        $(this).find($pop_s).hide();
    });
})