import {Roles} from '../src/Game';
import {OutMessages, InMessages} from '../src/Game';
import * as GameBuilder from './GameDriver';
import Game from '../src/Game';

describe('TroubleMaker', () => {
    let game : Game;

    beforeEach(() => {
        game = GameBuilder.TroublemakerGame();
    });

    it('should ask the troublemaker which players he/she wants to switch', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        var spy = spyOn(game.troublemaker, 'sendMessage');
        game.playRole(Roles.Troublemaker);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskTroublemakerToChoosePlayers});
    });

    it('after there is a response from the troublemaker, switch the cards, and let players know', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        var troublemaker = game.troublemaker;
        var player1 = game.players[1];
        var player2 = game.players[2];
        var player1OriginalRole = player1.role;
        var player2OriginalRole = player2.role;
        var player1Spy = spyOn(player1, 'sendMessage');
        var player2Spy = spyOn(player2, 'sendMessage');

        game.gotMessage(troublemaker, {message : InMessages.TroublemakerSwitchedPlayersCards, playersIds : [player1.id, player2.id]});
        expect(player1Spy).toHaveBeenCalledWith({message: OutMessages.TroublemakerSwitchedYourCard, newRole : player2OriginalRole});
        expect(player2Spy).toHaveBeenCalledWith({message: OutMessages.TroublemakerSwitchedYourCard, newRole : player1OriginalRole});
        expect(player1.role).toBe(player2OriginalRole);
        expect(player2.role).toBe(player1OriginalRole);
    });
});
