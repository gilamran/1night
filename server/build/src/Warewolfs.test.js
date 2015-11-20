var Game_1 = require('./Game');
var Game_2 = require('./Game');
var GameBuilder = require('./../test/drivers/GameDriver');
describe('Warewolfs', function () {
    it('should "inform" warewolfs about each other', function () {
        var game = GameBuilder.SimpleGame();
        game.dealer.dealCards(game.cards, game.players, game.table);
        var spy1 = spyOn(game.wareWolfs[0], 'sendMessage');
        var spy2 = spyOn(game.wareWolfs[1], 'sendMessage');
        game.playRole(Game_1.Roles.Warewolf);
        expect(spy1).toHaveBeenCalledWith({ message: Game_2.OutMessages.RevealOtherWarewolf, playerId: game.wareWolfs[1].id });
        expect(spy2).toHaveBeenCalledWith({ message: Game_2.OutMessages.RevealOtherWarewolf, playerId: game.wareWolfs[0].id });
    });
    it('should "inform" sole warewolf that he/she is alone', function () {
        var game = GameBuilder.SoleWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);
        var spy = spyOn(game.wareWolfs[0], 'sendMessage');
        game.playRole(Game_1.Roles.Warewolf);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskWarewolfToChooseACard });
    });
    it('should not "inform" anyone anything, if there are no warewolfs', function () {
        var game = GameBuilder.NoWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);
        var spys = [];
        game.players.forEach(function (player) { return spys.push(spyOn(player, 'sendMessage')); });
        game.playRole(Game_1.Roles.Warewolf);
        spys.forEach(function (spy) { return expect(spy).not.toHaveBeenCalled(); });
    });
    it('after there is a response from the sole warewolf, show him/her the card', function () {
        var game = GameBuilder.SoleWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);
        var warewolf = game.wareWolfs[0];
        var spy = spyOn(warewolf, 'sendMessage');
        game.gotMessage(warewolf, { message: Game_2.InMessages.WarewolfWantsToSeeATableCard, card: 0 });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardToWarewolf, card: game.table.cards[0] });
        game.gotMessage(warewolf, { message: Game_2.InMessages.WarewolfWantsToSeeATableCard, card: 1 });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardToWarewolf, card: game.table.cards[1] });
        game.gotMessage(warewolf, { message: Game_2.InMessages.WarewolfWantsToSeeATableCard, card: 2 });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardToWarewolf, card: game.table.cards[2] });
    });
});
