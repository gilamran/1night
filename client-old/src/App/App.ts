angular
    .module('OneNightApp', ['OneNightAppConfig'])
    .service('ioSocket', (SERVER_URL:string) => io.connect(SERVER_URL));
