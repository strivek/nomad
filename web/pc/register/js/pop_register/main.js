require(['jquery'], function () {
    var $pop_reg= $(".pop_reg");//弹出div
    var $close=$pop_reg.find(".close");//close 按钮
    var $form_input=$pop_reg.find(".form_input");//输入框
    var $form_btn=$pop_reg.find(".button");//提交按钮
    var $checked_div=$pop_reg.find(".xinxi");//包含复选框的div
    var $checked=$checked_div.find(".radio a");//复选框

    //弹出注册框
   $(".regRadio").on("click",function(e){
        $(".pop-up").show();
        return false;
    })

    //关闭注册框
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

    //单击复选框
    $checked.on("click",function(){
       $(this).toggleClass("checked");

        //如果未点击复选框，提交按钮不可点击
        if($checked.hasClass("checked")){
              $form_btn.removeAttr("disabled").addClass("button_bg");

        }
        else{$form_btn.attr("disabled","disabled").removeClass("button_bg");}
    });

    $form_btn.on("click",function(){
         alert("注册成功");
    });

})