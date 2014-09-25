require.config({
    baseUrl: "jquery",
    packages: ["map"],
    paths: {
        jquery: 'lib/jquery.1.11.0.min',
        'async': 'lib/async'
    }
});

require(['map']);
