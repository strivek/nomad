require.config({
    baseUrl: "js",
    packages: ['canvas-gua','wheels'],
    paths: {
        jquery: "lib/jquery.1.11.0.min"
    }
});
require(['canvas-gua']);
require(['wheels']);


