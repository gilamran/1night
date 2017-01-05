import { Roles } from './Game';
import { OutMessages, InMessages } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import Game from './Game';
import {expect} from 'chai';
import * as sinon from 'sinon';

describe('TroubleMaker', () => {
    let game: Game;

    beforeEach(() => {
        game = GameBuilder.TroublemakerGame();
    });

    it('should ask the troublemaker which players he/she wants to switch', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spy = sinon.spy(game.troublemaker, 'sendMessage');
        game.playRole(Roles.Troublemaker);

        expect(spy.calledWith({ message: OutMessages.AskTroublemakerToChoosePlayers })).to.be.ok;
    });

    it('after there is a response from the troublemaker, switch the cards, and let players know', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const troublemaker = game.troublemaker;
        const player1 = game.players[1];
        const player2 = game.players[2];
        const player1OriginalRole = player1.role;
        const player2OriginalRole = player2.role;
        const player1Spy = sinon.spy(player1, 'sendMessage');
        const player2Spy = sinon.spy(player2, 'sendMessage');

        game.gotMessage(troublemaker, { message: InMessages.TroublemakerSwitchedPlayersCards, playersIds: [player1.id, player2.id] });
        expect(player1Spy.calledWith({ message: OutMessages.TroublemakerSwitchedYourCard, newRole: player2OriginalRole })).to.be.ok;
        expect(player2Spy.calledWith({ message: OutMessages.TroublemakerSwitchedYourCard, newRole: player1OriginalRole })).to.be.ok;
        expect(player1.role).to.eq(player2OriginalRole);
        expect(player2.role).to.eq(player1OriginalRole);
    });
});
