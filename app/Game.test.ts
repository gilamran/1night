import Game from './Game';
import Dealer from './Dealer';
import Player from './Player';
import { Roles } from './Game';
import { OutMessages, InMessages } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import {expect} from 'chai';
import * as sinon from 'sinon';

describe('Game', () => {
    let game: Game;
    let dealer: Dealer;

    beforeEach(() => {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });

    it('should allow a player to join the game', () => {
        const tmpGame: Game = new Game();
        expect(tmpGame.players.length).to.eq(0);
        const player: Player = new Player('DUMMY_PLAYER', 'PLAYER_0');
        tmpGame.acceptPlayer(player);
        expect(tmpGame.players.length).to.eq(1);
    });

    it('should allow players to join the game', () => {
        const tmpGame: Game = new Game();
        expect(tmpGame.players.length).eq(0);
        const player1: Player = new Player('DUMMY_PLAYER1', 'PLAYER_1');
        const player2: Player = new Player('DUMMY_PLAYER2', 'PLAYER_2');
        tmpGame.acceptPlayers([player1, player2]);
        expect(tmpGame.players.length).eq(2);
    });

    it('should have 3 players after the startGame', () => {
        expect(game.players.length).eq(3);
    });

    it('should have 3 more cards than the number of players', () => {
        expect(game.cards.length).eq(game.players.length + 3);
    });

    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', () => {
        expect(game.cards[0]).to.eq(Roles.Warewolf);
        expect(game.cards[1]).to.eq(Roles.Warewolf);
        expect(game.cards[2]).to.eq(Roles.Seer);
        expect(game.cards[3]).to.eq(Roles.Robber);
        expect(game.cards[4]).to.eq(Roles.Troublemaker);
        expect(game.cards[5]).to.eq(Roles.Villager);
    });

    it('should marked as started after startGame is called', () => {
        const tmpGame: Game = new Game();
        expect(tmpGame.isStarted).to.be.false;
        tmpGame.startGame();
        expect(tmpGame.isStarted).to.be.true;
    });

    it('should "inform" players about their role', () => {
        dealer.dealCards(game.cards, game.players, game.table);


        const warewolf1Spy = sinon.spy(game.wareWolfs[0], 'sendMessage');
        const warewolf2Spy = sinon.spy(game.wareWolfs[1], 'sendMessage');
        const seerSpy = sinon.spy(game.seer, 'sendMessage');

        game.tellPlayersTheirRoles();

        expect(warewolf1Spy.calledWith({ message: OutMessages.AssignedRole, role: Roles.Warewolf })).to.be.ok;
        expect(warewolf2Spy.calledWith({ message: OutMessages.AssignedRole, role: Roles.Warewolf })).to.be.ok;
        expect(seerSpy.calledWith({ message: OutMessages.AssignedRole, role: Roles.Seer })).to.be.ok;
    });
});
