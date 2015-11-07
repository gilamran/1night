var Game_1 = require('../src/Game');
var Player_1 = require('../src/Player');
var GameDriver = (function () {
    function GameDriver() {
        var _this = this;
        this.BASIC_GAME_PLAYERS = [new Player_1.default('Gil'), new Player_1.default('AlonY'), new Player_1.default('Dvir')];
        this.with = {
            simpleSetup: function () {
                _this.withThePlayers(_this.BASIC_GAME_PLAYERS);
                return _this;
            }
        };
    }
    GameDriver.prototype.init = function () {
        this.game = new Game_1.default();
        if (this.dealer) {
            this.game.setup(this.players);
            this.game.dealer = this.dealer;
        }
        else {
            this.dealer = this.game.setup(this.players);
        }
        return this;
    };
    GameDriver.prototype.withThePlayers = function (players) {
        this.players = players;
        return this;
    };
    GameDriver.prototype.withTheDealer = function (dealer) {
        this.dealer = dealer;
        return this;
    };
    GameDriver.prototype.shuffle = function () {
        this.dealer.shuffleCards(this.game.cards);
    };
    GameDriver.prototype.deal = function (cards) {
        this.dealer.dealCards(cards ? cards : this.game.cards, this.game.players, this.game.table);
    };
    GameDriver.prototype.shuffleAndDeal = function (cards) {
        this.dealer.shuffleCards(cards ? cards : this.game.cards);
        this.dealer.dealCards(cards ? cards : this.game.cards, this.game.players, this.game.table);
    };
    return GameDriver;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameDriver;
