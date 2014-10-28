require(['jquery'], function () {
    var $infm=$("#infm");
    var $icon=$infm.find(".doubt");//鼠标滑过图标
    var $pop=$infm.find(".pop");//鼠标滑过显示的提示信息

    $icon.on('mouseenter',function(){
        $(this).next().show();
    });



    $icon.on('mouseleave',function(){
        $(this).next().delay(500).hide(0);
    });
    $pop.on('mousemove',function(){
       $(this).show();
    });

})