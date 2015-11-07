var Player = (function () {
    function Player(name) {
        this.name = name;
        this.role = null;
    }
    Player.prototype.sendMessage = function (message) {
        console.log(this.name + " got: " + message);
    };
    return Player;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
