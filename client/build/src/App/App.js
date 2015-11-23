angular
    .module('OneNightApp', ['OneNightAppConfig'])
    .service('ioSocket', function (SERVER_URL) { return io.connect(SERVER_URL); });
