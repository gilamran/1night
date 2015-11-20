var Player_1 = require('./Player');
var PlayersManager = (function () {
    function PlayersManager() {
        this.players = [];
        this.totalPlayers = 0;
    }
    PlayersManager.prototype.playerLogin = function (playerName) {
        var playerId = 'PLAYER_' + this.totalPlayers.toString();
        var newPlayer = new Player_1.default(playerName, playerId);
        this.players.push(newPlayer);
        this.totalPlayers++;
        return playerId;
    };
    PlayersManager.prototype.playerLogout = function (playerId) {
        this.players = this.players.filter(function (player) { return player.id !== playerId; });
    };
    Object.defineProperty(PlayersManager.prototype, "playersCount", {
        get: function () {
            return this.players.length;
        },
        enumerable: true,
        configurable: true
    });
    return PlayersManager;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlayersManager;
