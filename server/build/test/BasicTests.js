var Game_1 = require('../src/Game');
var Player_1 = require('../src/Player');
var Game_2 = require('../src/Game');
var GameDriver_1 = require('./GameDriver');
describe('Game', function () {
    var game;
    var dealer;
    var driver;
    beforeEach(function () {
        game = new Game_1.default();
        dealer = game.setup([new Player_1.default('Gil'), new Player_1.default('AlonY'), new Player_1.default('Dvir')]);
        driver = new GameDriver_1.default().with.simpleSetup();
    });
    it('should get 3 players after the setup', function () {
        expect(game.players.length).toBe(3);
    });
    it('should have 3 more cards than the number of players', function () {
        expect(game.cards.length).toBe(game.players.length + 3);
    });
    it('players should have names', function () {
        expect(game.players[0].name).toBe('Gil');
        expect(game.players[1].name).toBe('AlonY');
        expect(game.players[2].name).toBe('Dvir');
    });
    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', function () {
        expect(game.cards[0]).toBe(Game_2.Roles.Warewolf);
        expect(game.cards[1]).toBe(Game_2.Roles.Warewolf);
        expect(game.cards[2]).toBe(Game_2.Roles.Seer);
        expect(game.cards[3]).toBe(Game_2.Roles.Robber);
        expect(game.cards[4]).toBe(Game_2.Roles.Troublemaker);
        expect(game.cards[5]).toBe(Game_2.Roles.Villager);
    });
    it('should "inform" warewolfs about each other', function () {
        var spy1 = spyOn(game.players[0], 'sendMessage');
        var spy2 = spyOn(game.players[1], 'sendMessage');
        dealer.dealCards(game.cards, game.players, game.table);
        game.playRole(Game_2.Roles.Warewolf);
        expect(spy1).toHaveBeenCalledWith("The other warewolf is " + game.players[1].name);
        expect(spy2).toHaveBeenCalledWith("The other warewolf is " + game.players[0].name);
    });
    it('should ask seer which card he/she wants to see', function () {
        var spy1 = spyOn(game.players[2], 'sendMessage');
        dealer.dealCards(game.cards, game.players, game.table);
        game.playRole(Game_2.Roles.Seer);
        expect(spy1).toHaveBeenCalledWith("Choose cards to see");
    });
});
