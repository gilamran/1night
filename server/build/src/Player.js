var Player = (function () {
    function Player(name, id) {
        this.name = name;
        this.id = id;
        this.role = null;
        this.dealtRole = null;
    }
    Player.prototype.sendMessage = function (message) {
        console.log(this.name + " got: " + message);
    };
    Player.prototype.dealCard = function (role) {
        this.role = role;
        this.dealtRole = role;
    };
    return Player;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
