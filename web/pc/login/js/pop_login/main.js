require(['jquery'], function () {
    var $pop_log= $(".pop_log");//弹出div
    var $close=$pop_log.find(".close");//close 按钮
    var $form_input=$pop_log.find(".form_input");//输入框

    //弹出登录框
   $(".logRadio").on("click",function(e){
        $(".pop-up").show();
        return false;
    })

    //关闭登录框
    $close.on("click", function(){
        $(this).parent().parent().parent().hide();
    });

   //输入框获得焦点
    $form_input.on("focus",function(){
      $(this).parent().parent().addClass("focus_border").children().removeClass("blur_border");
    });

    //输入框失去焦点
    $form_input.on("blur",function(){
       $(this).next().show();
    });

    //输入框按下
    $form_input.on("keydown",function(event){
       $(this).siblings("i").hide();
    });

})