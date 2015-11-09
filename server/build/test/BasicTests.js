var Game_1 = require('../src/Game');
var Game_2 = require('../src/Game');
var GameBuilder = require('./GameDriver');
describe('Game', function () {
    var game;
    var dealer;
    beforeEach(function () {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });
    it('should get 3 players after the setup', function () {
        expect(game.players.length).toBe(3);
    });
    it('should have 3 more cards than the number of players', function () {
        expect(game.cards.length).toBe(game.players.length + 3);
    });
    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', function () {
        expect(game.cards[0]).toBe(Game_1.Roles.Warewolf);
        expect(game.cards[1]).toBe(Game_1.Roles.Warewolf);
        expect(game.cards[2]).toBe(Game_1.Roles.Seer);
        expect(game.cards[3]).toBe(Game_1.Roles.Robber);
        expect(game.cards[4]).toBe(Game_1.Roles.Troublemaker);
        expect(game.cards[5]).toBe(Game_1.Roles.Villager);
    });
    it('should "inform" players about their role', function () {
        dealer.dealCards(game.cards, game.players, game.table);
        var warewolf1Spy = spyOn(game.wareWolfs[0], 'sendMessage');
        var warewolf2Spy = spyOn(game.wareWolfs[1], 'sendMessage');
        var seerSpy = spyOn(game.seer, 'sendMessage');
        game.tellPlayersTheirRoles();
        expect(warewolf1Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AssignedRole, role: Game_1.Roles.Warewolf });
        expect(warewolf2Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AssignedRole, role: Game_1.Roles.Warewolf });
        expect(seerSpy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AssignedRole, role: Game_1.Roles.Seer });
    });
});
