import {Roles} from '../src/Game';
import {OutMessages, InMessages} from '../src/Game';
import * as GameBuilder from './GameDriver';
import Dealer from '../src/Dealer';
import Game from '../src/Game';

describe('Seer', () => {
    let game : Game;

    beforeEach(() => {
        game = GameBuilder.SeerGame();
    });

    it('should ask seer which card he/she wants to see', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        var spy = spyOn(game.seer, 'sendMessage');
        game.playRole(Roles.Seer);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskSeerToChooseCards});
    });

    it('after there is a response from the seer, show him/her the cards', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        var seer = game.seer;
        var spy = spyOn(seer, 'sendMessage');

        game.gotMessage(seer, {message : InMessages.SeerWantsToSeeTableCards, cards : [0, 1]});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardsToSeer, cards : [game.table.cards[0], game.table.cards[1]]});

        game.gotMessage(seer, {message : InMessages.SeerWantsToSeeTableCards, cards : [1, 2]});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardsToSeer, cards : [game.table.cards[1], game.table.cards[2]]});
    });
});
