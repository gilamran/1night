import { Roles } from './Game';
import { OutMessages, InMessages } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import Dealer from './Dealer';
import Game from './Game';

describe('Seer', () => {
    let game: Game;

    beforeEach(() => {
        game = GameBuilder.SeerGame();
    });

    it('should ask seer which card he/she wants to see', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spy = spyOn(game.seer, 'sendMessage');
        game.playRole(Roles.Seer);

        expect(spy).toHaveBeenCalledWith({ message: OutMessages.AskSeerToChooseCards });
    });

    it('after there is a response from the seer, show him/her the cards', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const seer = game.seer;
        const spy = spyOn(seer, 'sendMessage');

        game.gotMessage(seer, { message: InMessages.SeerWantsToSeeTableCards, cards: [0, 1] });
        expect(spy).toHaveBeenCalledWith({ message: OutMessages.ShowCardsToSeer, cards: [game.table.cards[0], game.table.cards[1]] });

        game.gotMessage(seer, { message: InMessages.SeerWantsToSeeTableCards, cards: [1, 2] });
        expect(spy).toHaveBeenCalledWith({ message: OutMessages.ShowCardsToSeer, cards: [game.table.cards[1], game.table.cards[2]] });
    });
});
