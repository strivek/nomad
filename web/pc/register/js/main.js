require.config({
    baseUrl: "js",
    packages: ['pop_register'],
    paths: {
        jquery: "lib/jquery.1.11.0.min"
    }
});

require(['pop_register']);//弹出式注册表单 pop_register.html