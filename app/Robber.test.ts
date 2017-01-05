import { Roles } from './Game';
import { OutMessages, InMessages } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import Dealer from './Dealer';
import Game from './Game';

describe('Robber', () => {
    let game: Game;

    beforeEach(() => {
        game = GameBuilder.RobberGame();
    });

    it('should ask the robber which player he/she wants to robe', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spy = spyOn(game.robber, 'sendMessage');
        game.playRole(Roles.Robber);

        expect(spy).toHaveBeenCalledWith({ message: OutMessages.AskRobberToChooseAPlayer });
    });

    it('after there is a response from the robber, show him/her his/her new role', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const robber = game.robber;
        const robberOriginalRole = robber.role;
        const robberSpy = spyOn(robber, 'sendMessage');

        const player = game.players[1];
        const playerOriginalRole = player.role;
        const playerSpy = spyOn(player, 'sendMessage');

        game.gotMessage(robber, { message: InMessages.RobberWantsToRobeAPlayer, playerId: player.id });
        expect(robberSpy).toHaveBeenCalledWith({ message: OutMessages.GiveRobberHisNewRole, newRole: playerOriginalRole });
        expect(playerSpy).toHaveBeenCalledWith({ message: OutMessages.RobberTookYourRole, newRole: robberOriginalRole });
        expect(robber.role).toBe(playerOriginalRole);
    });



});
