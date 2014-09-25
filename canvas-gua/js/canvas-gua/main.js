require(['jquery', 'canvas-gua/wScratchPad.min'], function () {
    $('#demo1').wScratchPad({
        bg: './images/winner.png',
        fg: './images/scratch-to-win.png',
        'cursor': 'url("./images/coin.png") 5 5, default',
        scratchMove: function (e, percent) {
        $('#demo1-percent').html(percent);
        }
        });
    $('#demo2').wScratchPad({
        bg: './images/slide1.jpg',//设置刮完之后的背景
        fg: './images/scratch-to-win.png',//设置刮之前的背景
        'cursor': 'url("./images/bird.png") 5 5, default',//设置鼠标图案，默认为十字型
        scratchMove: function (e, percent) {
        $('#demo2-percent').html(percent);
        if (percent > 70) {//区域刮70%可视为刮完
        this.clear();
        }
        }
        });
    $('#demo3').wScratchPad({
        scratchMove: function (e, percent) {
            console.log(percent);
        }
    });

    $('#demo4').wScratchPad({
        bg: '../images/slide1.jpg',
        fg: '#ff0000',
        scratchMove: function (e, percent) {
            console.log(percent);

            if (percent > 70) {
                this.clear();}
        }
    });
    $('#demo4').wScratchPad('cursor', 'url("../images/coin.png") 5 5, default');

    $('#demo5').wScratchPad({
        cursor: 'url("../images/mario.png") 5 5, default',
        scratchMove: function (e, percent) {
            console.log(percent);
        }
    });
    $('#demo5').wScratchPad('bg', '../images/winner.png');
    $('#demo5').wScratchPad('fg', '../images/scratch-to-win.png');
    $('#demo5').wScratchPad('size', 10);
    });