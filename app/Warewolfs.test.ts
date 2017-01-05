import { Roles } from './Game';
import { OutMessages, InMessages } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import {expect} from 'chai';
import * as sinon from 'sinon';

describe('Warewolfs', () => {
    it('should "inform" warewolfs about each other', () => {
        const game = GameBuilder.SimpleGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spy1 = sinon.spy(game.wareWolfs[0], 'sendMessage');
        const spy2 = sinon.spy(game.wareWolfs[1], 'sendMessage');
        game.playRole(Roles.Warewolf);

        expect(spy1.calledWith({ message: OutMessages.RevealOtherWarewolf, playerId: game.wareWolfs[1].id })).to.be.ok;
        expect(spy2.calledWith({ message: OutMessages.RevealOtherWarewolf, playerId: game.wareWolfs[0].id })).to.be.ok;
    });

    it('should "inform" sole warewolf that he/she is alone', () => {
        let game = GameBuilder.SoleWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spy = sinon.spy(game.wareWolfs[0], 'sendMessage');
        game.playRole(Roles.Warewolf);

        expect(spy.calledWith({ message: OutMessages.AskWarewolfToChooseACard })).to.be.ok;
    });

    it('should not "inform" anyone anything, if there are no warewolfs', () => {
        let game = GameBuilder.NoWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spys: sinon.SinonSpy[] = [];
        game.players.forEach(player => spys.push(sinon.spy(player, 'sendMessage')));
        game.playRole(Roles.Warewolf);

        spys.forEach(spy => expect(spy.callCount).to.eq(0));
    });

    it('after there is a response from the sole warewolf, show him/her the card', () => {
        let game = GameBuilder.SoleWareWolfGame();
        game.dealer.dealCards(game.cards, game.players, game.table);

        const warewolf = game.wareWolfs[0];
        const spy = sinon.spy(warewolf, 'sendMessage');


        game.gotMessage(warewolf, { message: InMessages.WarewolfWantsToSeeATableCard, card: 0 });
        expect(spy.calledWith({ message: OutMessages.ShowCardToWarewolf, card: game.table.cards[0] })).to.be.ok;

        game.gotMessage(warewolf, { message: InMessages.WarewolfWantsToSeeATableCard, card: 1 });
        expect(spy.calledWith({ message: OutMessages.ShowCardToWarewolf, card: game.table.cards[1] })).to.be.ok;

        game.gotMessage(warewolf, { message: InMessages.WarewolfWantsToSeeATableCard, card: 2 });
        expect(spy.calledWith({ message: OutMessages.ShowCardToWarewolf, card: game.table.cards[2] })).to.be.ok;
    });
});
