require(['jquery'], function () {
    var bStop = true;//抽奖开关
    $('.wheel-area .start').click(function(){
        if(bStop){
            bStop=false;
            $(this).attr('src','images/start1.png');
            $(this).siblings('.wheel').attr('class','wheel');
            var arr=['spin','spin2','spin3','spin4','spin5','spin6','spin7','spin8','spin9'];
            var data=arr[Math.ceil(Math.random()*8)];
            $('.wheel-area .wheel').addClass(data);
            setTimeout(function(){
                $('.wheel-area .pupop').fadeIn();
            },6000);
        }


    });
    $('.wheel-area .pupop .close').click(function(){
        bStop=true;
        $('.wheel-area .start').attr('src','images/start2.png');
        $('.wheel-area .wheel').attr({'class':'wheel'});
        $(this).parent().fadeOut();
    })
});