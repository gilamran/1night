var Dealer_1 = require('./Dealer');
(function (Roles) {
    Roles[Roles["Warewolf"] = 0] = "Warewolf";
    Roles[Roles["Seer"] = 1] = "Seer";
    Roles[Roles["Robber"] = 2] = "Robber";
    Roles[Roles["Troublemaker"] = 3] = "Troublemaker";
    Roles[Roles["Villager"] = 4] = "Villager";
})(exports.Roles || (exports.Roles = {}));
var Roles = exports.Roles;
var Game = (function () {
    function Game() {
        this.table = {
            cards: []
        };
        this.dealer = new Dealer_1.default();
        this.players = [];
        this.cards = [Roles.Warewolf, Roles.Warewolf, Roles.Seer, Roles.Robber, Roles.Troublemaker, Roles.Villager];
    }
    Game.prototype.setup = function (players) {
        this.players = players;
        return this.dealer;
    };
    Game.prototype.getSingleRole = function (role) {
        var roles = this.players.filter(function (player) { return player.role === role; });
        return roles.length === 1 ? roles[0] : null;
    };
    Game.prototype.getMultiRole = function (role) {
        return this.players.filter(function (player) { return player.role === Roles.Warewolf; });
    };
    Object.defineProperty(Game.prototype, "wareWolfs", {
        get: function () {
            return this.getMultiRole(Roles.Warewolf);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "seer", {
        get: function () {
            var seers = this.players.filter(function (player) { return player.role === Roles.Seer; });
            return seers.length === 1 ? seers[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.playRole = function (role) {
        switch (role) {
            case Roles.Warewolf:
                this.informWarewolfsAboutEachOther();
                break;
            case Roles.Seer:
                this.askSeerForCards();
                break;
        }
    };
    Game.prototype.askSeerForCards = function () {
        this.seer.sendMessage("Choose cards to see");
    };
    Game.prototype.informWarewolfsAboutEachOther = function () {
        if (this.wareWolfs.length == 2) {
            this.wareWolfs[0].sendMessage("The other warewolf is " + this.wareWolfs[1].name);
            this.wareWolfs[1].sendMessage("The other warewolf is " + this.wareWolfs[0].name);
        }
    };
    return Game;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
