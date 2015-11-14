import {Roles} from './Game';
import {OutMessages, InMessages} from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';

describe('Warewolfs', () => {
    it('should "inform" warewolfs about each other', () => {
        var game = GameBuilder.SimpleGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        var spy1 = spyOn(game.wareWolfs[0], 'sendMessage');
        var spy2 = spyOn(game.wareWolfs[1], 'sendMessage');
        game.playRole(Roles.Warewolf);

        expect(spy1).toHaveBeenCalledWith({message : OutMessages.RevealOtherWarewolf, playerId : game.wareWolfs[1].id});
        expect(spy2).toHaveBeenCalledWith({message : OutMessages.RevealOtherWarewolf, playerId : game.wareWolfs[0].id});
    });

    it('should "inform" sole warewolf that he/she is alone', () => {
        let game = GameBuilder.SoleWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        var spy = spyOn(game.wareWolfs[0], 'sendMessage');
        game.playRole(Roles.Warewolf);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskWarewolfToChooseACard});
    });

    it('should not "inform" anyone anything, if there are no warewolfs', () => {
        let game = GameBuilder.NoWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        var spys : jasmine.Spy[] = [];
        game.players.forEach(player => spys.push(spyOn(player, 'sendMessage')));
        game.playRole(Roles.Warewolf);

        spys.forEach(spy => expect(spy).not.toHaveBeenCalled());
    });

    it('after there is a response from the sole warewolf, show him/her the card', () => {
        let game = GameBuilder.SoleWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        var warewolf = game.wareWolfs[0];
        var spy = spyOn(warewolf, 'sendMessage');


        game.gotMessage(warewolf, {message : InMessages.WarewolfWantsToSeeATableCard, card : 0});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardToWarewolf, card : game.table.cards[0]});

        game.gotMessage(warewolf, {message : InMessages.WarewolfWantsToSeeATableCard, card : 1});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardToWarewolf, card : game.table.cards[1]});

        game.gotMessage(warewolf, {message : InMessages.WarewolfWantsToSeeATableCard, card : 2});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardToWarewolf, card : game.table.cards[2]});
    });
});
