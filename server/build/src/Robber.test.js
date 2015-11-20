var Game_1 = require('./Game');
var Game_2 = require('./Game');
var GameBuilder = require('./../test/drivers/GameDriver');
describe('Robber', function () {
    var game;
    beforeEach(function () {
        game = GameBuilder.RobberGame();
    });
    it('should ask the robber which player he/she wants to robe', function () {
        game.dealer.dealCards(game.cards, game.players, game.table);
        var spy = spyOn(game.robber, 'sendMessage');
        game.playRole(Game_1.Roles.Robber);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskRobberToChooseAPlayer });
    });
    it('after there is a response from the robber, show him/her his/her new role', function () {
        game.dealer.dealCards(game.cards, game.players, game.table);
        var robber = game.robber;
        var robberOriginalRole = robber.role;
        var robberSpy = spyOn(robber, 'sendMessage');
        var player = game.players[1];
        var playerOriginalRole = player.role;
        var playerSpy = spyOn(player, 'sendMessage');
        game.gotMessage(robber, { message: Game_2.InMessages.RobberWantsToRobeAPlayer, playerId: player.id });
        expect(robberSpy).toHaveBeenCalledWith({ message: Game_2.OutMessages.GiveRobberHisNewRole, newRole: playerOriginalRole });
        expect(playerSpy).toHaveBeenCalledWith({ message: Game_2.OutMessages.RobberTookYourRole, newRole: robberOriginalRole });
        expect(robber.role).toBe(playerOriginalRole);
    });
});
