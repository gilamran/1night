var Dealer_1 = require('./Dealer');
(function (OutMessages) {
    OutMessages[OutMessages["AssignedRole"] = 0] = "AssignedRole";
    OutMessages[OutMessages["RevealOtherWarewolf"] = 1] = "RevealOtherWarewolf";
    OutMessages[OutMessages["AskWarewolfToChooseACard"] = 2] = "AskWarewolfToChooseACard";
    OutMessages[OutMessages["AskSeerToChooseCards"] = 3] = "AskSeerToChooseCards";
    OutMessages[OutMessages["ShowCardsToSeer"] = 4] = "ShowCardsToSeer";
    OutMessages[OutMessages["ShowCardToWarewolf"] = 5] = "ShowCardToWarewolf";
    OutMessages[OutMessages["AskRobberToChooseAPlayer"] = 6] = "AskRobberToChooseAPlayer";
    OutMessages[OutMessages["GiveRobberHisNewRole"] = 7] = "GiveRobberHisNewRole";
    OutMessages[OutMessages["RobberTookYourRole"] = 8] = "RobberTookYourRole";
    OutMessages[OutMessages["AskTroublemakerToChoosePlayers"] = 9] = "AskTroublemakerToChoosePlayers";
    OutMessages[OutMessages["TroublemakerSwitchedYourCard"] = 10] = "TroublemakerSwitchedYourCard";
})(exports.OutMessages || (exports.OutMessages = {}));
var OutMessages = exports.OutMessages;
(function (InMessages) {
    InMessages[InMessages["SeerWantsToSeeTableCards"] = 0] = "SeerWantsToSeeTableCards";
    InMessages[InMessages["WarewolfWantsToSeeATableCard"] = 1] = "WarewolfWantsToSeeATableCard";
    InMessages[InMessages["RobberWantsToRobeAPlayer"] = 2] = "RobberWantsToRobeAPlayer";
    InMessages[InMessages["TroublemakerSwitchedPlayersCards"] = 3] = "TroublemakerSwitchedPlayersCards";
})(exports.InMessages || (exports.InMessages = {}));
var InMessages = exports.InMessages;
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
        var roles = this.players.filter(function (player) { return player.dealtRole === role; });
        return roles.length === 1 ? roles[0] : null;
    };
    Game.prototype.getMultiRole = function (role) {
        return this.players.filter(function (player) { return player.dealtRole === role; });
    };
    Game.prototype.getPlayer = function (id) {
        return this.players.filter(function (player) { return player.id === id; })[0];
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
            return this.getSingleRole(Roles.Seer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "robber", {
        get: function () {
            return this.getSingleRole(Roles.Robber);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "troublemaker", {
        get: function () {
            return this.getSingleRole(Roles.Troublemaker);
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gotMessage = function (player, data) {
        switch (data.message) {
            case InMessages.SeerWantsToSeeTableCards:
                player.sendMessage({ message: OutMessages.ShowCardsToSeer, cards: [this.table.cards[data.cards[0]], this.table.cards[data.cards[1]]] });
                break;
            case InMessages.WarewolfWantsToSeeATableCard:
                player.sendMessage({ message: OutMessages.ShowCardToWarewolf, card: this.table.cards[data.card] });
                break;
            case InMessages.RobberWantsToRobeAPlayer:
                var targetPlayer = this.getPlayer(data.playerId);
                player.sendMessage({ message: OutMessages.GiveRobberHisNewRole, newRole: this.getPlayer(data.playerId).role });
                targetPlayer.sendMessage({ message: OutMessages.RobberTookYourRole, newRole: player.role });
                var tmpRole = player.role;
                player.role = targetPlayer.role;
                targetPlayer.role = tmpRole;
                break;
            case InMessages.TroublemakerSwitchedPlayersCards:
                var player1 = this.getPlayer(data.playersIds[0]);
                var player2 = this.getPlayer(data.playersIds[1]);
                player1.sendMessage({ message: OutMessages.TroublemakerSwitchedYourCard, newRole: player2.role });
                player2.sendMessage({ message: OutMessages.TroublemakerSwitchedYourCard, newRole: player1.role });
                var tmpRole = player1.role;
                player1.role = player2.role;
                player2.role = tmpRole;
                break;
        }
    };
    Game.prototype.playRole = function (role) {
        switch (role) {
            case Roles.Warewolf:
                this.informWarewolfsAboutEachOther();
                break;
            case Roles.Seer:
                this.askSeerForCards();
                break;
            case Roles.Robber:
                this.askRobberForAPlayer();
                break;
            case Roles.Troublemaker:
                this.askTroublemakerForPlayers();
                break;
        }
    };
    Game.prototype.tellPlayersTheirRoles = function () {
        this.players[0].sendMessage({ message: OutMessages.AssignedRole, role: this.players[0].role });
        this.players[1].sendMessage({ message: OutMessages.AssignedRole, role: this.players[1].role });
        this.players[2].sendMessage({ message: OutMessages.AssignedRole, role: this.players[2].role });
    };
    Game.prototype.askSeerForCards = function () {
        this.seer.sendMessage({ message: OutMessages.AskSeerToChooseCards });
    };
    Game.prototype.askRobberForAPlayer = function () {
        this.robber.sendMessage({ message: OutMessages.AskRobberToChooseAPlayer });
    };
    Game.prototype.askTroublemakerForPlayers = function () {
        this.troublemaker.sendMessage({ message: OutMessages.AskTroublemakerToChoosePlayers });
    };
    Game.prototype.informWarewolfsAboutEachOther = function () {
        switch (this.wareWolfs.length) {
            case 1:
                this.wareWolfs[0].sendMessage({ message: OutMessages.AskWarewolfToChooseACard });
                break;
            case 2:
                this.wareWolfs[0].sendMessage({ message: OutMessages.RevealOtherWarewolf, playerId: this.wareWolfs[1].id });
                this.wareWolfs[1].sendMessage({ message: OutMessages.RevealOtherWarewolf, playerId: this.wareWolfs[0].id });
                break;
        }
    };
    return Game;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
