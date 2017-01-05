import { Roles } from './Game';
import { OutMessages, InMessages } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import Game from './Game';

describe('TroubleMaker', () => {
    let game: Game;

    beforeEach(() => {
        game = GameBuilder.TroublemakerGame();
    });

    it('should ask the troublemaker which players he/she wants to switch', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spy = spyOn(game.troublemaker, 'sendMessage');
        game.playRole(Roles.Troublemaker);

        expect(spy).toHaveBeenCalledWith({ message: OutMessages.AskTroublemakerToChoosePlayers });
    });

    it('after there is a response from the troublemaker, switch the cards, and let players know', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const troublemaker = game.troublemaker;
        const player1 = game.players[1];
        const player2 = game.players[2];
        const player1OriginalRole = player1.role;
        const player2OriginalRole = player2.role;
        const player1Spy = spyOn(player1, 'sendMessage');
        const player2Spy = spyOn(player2, 'sendMessage');

        game.gotMessage(troublemaker, { message: InMessages.TroublemakerSwitchedPlayersCards, playersIds: [player1.id, player2.id] });
        expect(player1Spy).toHaveBeenCalledWith({ message: OutMessages.TroublemakerSwitchedYourCard, newRole: player2OriginalRole });
        expect(player2Spy).toHaveBeenCalledWith({ message: OutMessages.TroublemakerSwitchedYourCard, newRole: player1OriginalRole });
        expect(player1.role).toBe(player2OriginalRole);
        expect(player2.role).toBe(player1OriginalRole);
    });
});
