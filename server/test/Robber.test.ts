import {Roles} from '../src/Game';
import {OutMessages, InMessages} from '../src/Game';
import * as GameBuilder from './GameDriver';
import Dealer from '../src/Dealer';
import Game from '../src/Game';

describe('Robber', () => {
    let game : Game;

    beforeEach(() => {
        game = GameBuilder.RobberGame();
    });

    it('should ask the robber which player he/she wants to robe', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        var spy = spyOn(game.robber, 'sendMessage');
        game.playRole(Roles.Robber);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskRobberToChooseAPlayer});
    });

    it('after there is a response from the robber, show him/her his/her new role', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        var robber = game.robber;
        var robberOriginalRole = robber.role;
        var robberSpy = spyOn(robber, 'sendMessage');

        var player = game.players[1];
        var playerOriginalRole = player.role;
        var playerSpy = spyOn(player, 'sendMessage');

        game.gotMessage(robber, {message : InMessages.RobberWantsToRobeAPlayer, playerId : player.id});
        expect(robberSpy).toHaveBeenCalledWith({message: OutMessages.GiveRobberHisNewRole, newRole : playerOriginalRole});
        expect(playerSpy).toHaveBeenCalledWith({message: OutMessages.RobberTookYourRole, newRole : robberOriginalRole});
        expect(robber.role).toBe(playerOriginalRole);
    });



});
