var Game_1 = require('./Game');
var Player_1 = require('./Player');
var Game_2 = require('./Game');
var Game_3 = require('./Game');
var GameBuilder = require('./../test/drivers/GameDriver');
describe('Game', function () {
    var game;
    var dealer;
    beforeEach(function () {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });
    it('should allow a player to join the game', function () {
        var tmpGame = new Game_1.default();
        expect(tmpGame.players.length).toBe(0);
        var player = new Player_1.default('DUMMY_PLAYER', 'PLAYER_0');
        tmpGame.acceptPlayer(player);
        expect(tmpGame.players.length).toBe(1);
    });
    it('should allow players to join the game', function () {
        var tmpGame = new Game_1.default();
        expect(tmpGame.players.length).toBe(0);
        var player1 = new Player_1.default('DUMMY_PLAYER1', 'PLAYER_1');
        var player2 = new Player_1.default('DUMMY_PLAYER2', 'PLAYER_2');
        tmpGame.acceptPlayers([player1, player2]);
        expect(tmpGame.players.length).toBe(2);
    });
    it('should have 3 players after the startGame', function () {
        expect(game.players.length).toBe(3);
    });
    it('should have 3 more cards than the number of players', function () {
        expect(game.cards.length).toBe(game.players.length + 3);
    });
    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', function () {
        expect(game.cards[0]).toBe(Game_2.Roles.Warewolf);
        expect(game.cards[1]).toBe(Game_2.Roles.Warewolf);
        expect(game.cards[2]).toBe(Game_2.Roles.Seer);
        expect(game.cards[3]).toBe(Game_2.Roles.Robber);
        expect(game.cards[4]).toBe(Game_2.Roles.Troublemaker);
        expect(game.cards[5]).toBe(Game_2.Roles.Villager);
    });
    it('should marked as started after startGame is called', function () {
        var tmpGame = new Game_1.default();
        expect(tmpGame.isStarted).toBeFalsy();
        tmpGame.startGame();
        expect(tmpGame.isStarted).toBeTruthy();
    });
    it('should "inform" players about their role', function () {
        dealer.dealCards(game.cards, game.players, game.table);
        var warewolf1Spy = spyOn(game.wareWolfs[0], 'sendMessage');
        var warewolf2Spy = spyOn(game.wareWolfs[1], 'sendMessage');
        var seerSpy = spyOn(game.seer, 'sendMessage');
        game.tellPlayersTheirRoles();
        expect(warewolf1Spy).toHaveBeenCalledWith({ message: Game_3.OutMessages.AssignedRole, role: Game_2.Roles.Warewolf });
        expect(warewolf2Spy).toHaveBeenCalledWith({ message: Game_3.OutMessages.AssignedRole, role: Game_2.Roles.Warewolf });
        expect(seerSpy).toHaveBeenCalledWith({ message: Game_3.OutMessages.AssignedRole, role: Game_2.Roles.Seer });
    });
});
