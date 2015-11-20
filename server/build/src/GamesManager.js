var Game_1 = require('./Game');
var GamesManager = (function () {
    function GamesManager() {
        this.games = [];
        this.totalGame = 0;
    }
    GamesManager.prototype.getGameById = function (gameId) {
        return this.games.filter(function (game) { return game.id === gameId; })[0];
    };
    GamesManager.prototype.getOpenGames = function () {
        return this.games.filter(function (game) { return !game.isStarted; });
    };
    GamesManager.prototype.createGame = function (gameName) {
        this.totalGame++;
        var gameId = 'GAME_' + this.totalGame.toString();
        var game = new Game_1.default(gameName, gameId);
        this.games.push(game);
        return game;
    };
    Object.defineProperty(GamesManager.prototype, "gamesCount", {
        get: function () {
            return this.games.length;
        },
        enumerable: true,
        configurable: true
    });
    return GamesManager;
})();
exports.GamesManager = GamesManager;
