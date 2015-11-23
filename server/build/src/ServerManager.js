var GamesManager_1 = require('./GamesManager');
var PlayersManager_1 = require('./PlayersManager');
var ServerManager = (function () {
    function ServerManager() {
        this.gamesManager = new GamesManager_1.GamesManager();
        this.playersManager = new PlayersManager_1.default();
    }
    return ServerManager;
})();
exports.serverManager = new ServerManager();
