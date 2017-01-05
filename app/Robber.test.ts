import { Roles } from './Game';
import { OutMessages, InMessages } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import Dealer from './Dealer';
import Game from './Game';
import {expect} from 'chai';
import * as sinon from 'sinon';

describe('Robber', () => {
    let game: Game;

    beforeEach(() => {
        game = GameBuilder.RobberGame();
    });

    it('should ask the robber which player he/she wants to robe', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const spy = sinon.spy(game.robber, 'sendMessage');
        game.playRole(Roles.Robber);

        expect(spy.calledWith({ message: OutMessages.AskRobberToChooseAPlayer })).to.be.ok;
    });

    it('after there is a response from the robber, show him/her his/her new role', () => {
        game.dealer.dealCards(game.cards, game.players, game.table);

        const robber = game.robber;
        const robberOriginalRole = robber.role;
        const robberSpy = sinon.spy(robber, 'sendMessage');

        const player = game.players[1];
        const playerOriginalRole = player.role;
        const playerSpy = sinon.spy(player, 'sendMessage');

        game.gotMessage(robber, { message: InMessages.RobberWantsToRobeAPlayer, playerId: player.id });
        expect(robberSpy.calledWith({ message: OutMessages.GiveRobberHisNewRole, newRole: playerOriginalRole })).to.be.ok;
        expect(playerSpy.calledWith({ message: OutMessages.RobberTookYourRole, newRole: robberOriginalRole })).to.be.ok;
        expect(robber.role).to.eq(playerOriginalRole);
    });



});
