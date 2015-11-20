var Game_1 = require('./Game');
var Game_2 = require('./Game');
var GameBuilder = require('./../test/drivers/GameDriver');
describe('Seer', function () {
    var game;
    beforeEach(function () {
        game = GameBuilder.SeerGame();
    });
    it('should ask seer which card he/she wants to see', function () {
        game.dealer.dealCards(game.cards, game.players, game.table);
        var spy = spyOn(game.seer, 'sendMessage');
        game.playRole(Game_1.Roles.Seer);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskSeerToChooseCards });
    });
    it('after there is a response from the seer, show him/her the cards', function () {
        game.dealer.dealCards(game.cards, game.players, game.table);
        var seer = game.seer;
        var spy = spyOn(seer, 'sendMessage');
        game.gotMessage(seer, { message: Game_2.InMessages.SeerWantsToSeeTableCards, cards: [0, 1] });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardsToSeer, cards: [game.table.cards[0], game.table.cards[1]] });
        game.gotMessage(seer, { message: Game_2.InMessages.SeerWantsToSeeTableCards, cards: [1, 2] });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardsToSeer, cards: [game.table.cards[1], game.table.cards[2]] });
    });
});
