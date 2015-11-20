var Game_1 = require('../../src/Game');
var Player_1 = require('../../src/Player');
var Game_2 = require('../../src/Game');
var GameBuilder = (function () {
    function GameBuilder() {
    }
    GameBuilder.prototype.get = function () {
        var game = new Game_1.default('New Game', 'GAME_ID');
        game.acceptPlayers(this.players);
        game.startGame();
        if (this.cards) {
            game.cards = this.cards;
        }
        return game;
    };
    GameBuilder.prototype.withThePlayers = function (players) {
        this.players = players;
        return this;
    };
    GameBuilder.prototype.withDeck = function (cards) {
        this.cards = cards;
        return this;
    };
    return GameBuilder;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameBuilder;
var BASIC_GAME_PLAYERS = function () { return [
    new Player_1.default('Gil', 'Player1'),
    new Player_1.default('AlonY', 'Player2'),
    new Player_1.default('Dvir', 'Player3')
]; };
var ONE_WAREWOLF_DECK = [Game_2.Roles.Warewolf, Game_2.Roles.Seer, Game_2.Roles.Robber, Game_2.Roles.Troublemaker, Game_2.Roles.Villager, Game_2.Roles.Villager];
var NO_WAREWOLF_DECK = [Game_2.Roles.Robber, Game_2.Roles.Seer, Game_2.Roles.Troublemaker, Game_2.Roles.Villager, Game_2.Roles.Villager, Game_2.Roles.Villager];
var ROBBER_DECK = [Game_2.Roles.Robber, Game_2.Roles.Seer, Game_2.Roles.Troublemaker, Game_2.Roles.Villager, Game_2.Roles.Villager, Game_2.Roles.Villager];
var TROUBLEMAKER_DECK = [Game_2.Roles.Troublemaker, Game_2.Roles.Seer, Game_2.Roles.Robber, Game_2.Roles.Villager, Game_2.Roles.Villager, Game_2.Roles.Villager];
exports.SimpleGame = function () { return new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).get(); };
exports.SoleWareWolfGame = function () { return new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(ONE_WAREWOLF_DECK).get(); };
exports.NoWareWolfGame = function () { return new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(NO_WAREWOLF_DECK).get(); };
exports.SeerGame = function () { return new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(ROBBER_DECK).get(); };
exports.RobberGame = function () { return new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(ROBBER_DECK).get(); };
exports.TroublemakerGame = function () { return new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(TROUBLEMAKER_DECK).get(); };
