
require.config({
    baseUrl: "js",
    packages: ['showDes','mouseOverShow'],
    paths: {
        jquery: "lib/jquery.1.11.0.min"
    }
});
require(['showDes']);//myCenter.html 模仿下拉菜单
require(['mouseOverShow']);//myCenter1.html 鼠标滑过显示提示信息
