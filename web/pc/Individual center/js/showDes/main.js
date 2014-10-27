require(['jquery'], function () {
  $(".r_wrap .show").on("click",function(){
      $(this).siblings().toggle();
  });
})