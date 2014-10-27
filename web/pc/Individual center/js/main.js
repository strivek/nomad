
require.config({
    baseUrl: "js",
    packages: ['showDes'],
    paths: {
        jquery: "lib/jquery.1.11.0.min"
    }
});
require(['showDes']);