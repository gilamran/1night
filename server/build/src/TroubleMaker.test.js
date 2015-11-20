var Game_1 = require('./Game');
var Game_2 = require('./Game');
var GameBuilder = require('./../test/drivers/GameDriver');
describe('TroubleMaker', function () {
    var game;
    beforeEach(function () {
        game = GameBuilder.TroublemakerGame();
    });
    it('should ask the troublemaker which players he/she wants to switch', function () {
        game.dealer.dealCards(game.cards, game.players, game.table);
        var spy = spyOn(game.troublemaker, 'sendMessage');
        game.playRole(Game_1.Roles.Troublemaker);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskTroublemakerToChoosePlayers });
    });
    it('after there is a response from the troublemaker, switch the cards, and let players know', function () {
        game.dealer.dealCards(game.cards, game.players, game.table);
        var troublemaker = game.troublemaker;
        var player1 = game.players[1];
        var player2 = game.players[2];
        var player1OriginalRole = player1.role;
        var player2OriginalRole = player2.role;
        var player1Spy = spyOn(player1, 'sendMessage');
        var player2Spy = spyOn(player2, 'sendMessage');
        game.gotMessage(troublemaker, { message: Game_2.InMessages.TroublemakerSwitchedPlayersCards, playersIds: [player1.id, player2.id] });
        expect(player1Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.TroublemakerSwitchedYourCard, newRole: player2OriginalRole });
        expect(player2Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.TroublemakerSwitchedYourCard, newRole: player1OriginalRole });
        expect(player1.role).toBe(player2OriginalRole);
        expect(player2.role).toBe(player1OriginalRole);
    });
});
