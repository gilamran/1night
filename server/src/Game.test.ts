import Game from './Game';
import Dealer from './Dealer';
import Player from './Player';
import {Roles} from './Game';
import {OutMessages, InMessages} from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';

describe('Game', () => {
    let game : Game;
    let dealer : Dealer;

    beforeEach(() => {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });

    it('should allow a player to join the game', () => {
        var tmpGame : Game = new Game();
        expect(tmpGame.players.length).toBe(0);
        var player : Player = new Player('DUMMY_PLAYER', 'PLAYER_0');
        tmpGame.acceptPlayer(player);
        expect(tmpGame.players.length).toBe(1);
    });

    it('should allow players to join the game', () => {
        var tmpGame : Game = new Game();
        expect(tmpGame.players.length).toBe(0);
        var player1 : Player = new Player('DUMMY_PLAYER1', 'PLAYER_1');
        var player2 : Player = new Player('DUMMY_PLAYER2', 'PLAYER_2');
        tmpGame.acceptPlayers([player1, player2]);
        expect(tmpGame.players.length).toBe(2);
    });

    it('should have 3 players after the startGame', () => {
        expect(game.players.length).toBe(3);
    });

    it('should have 3 more cards than the number of players', () => {
        expect(game.cards.length).toBe(game.players.length + 3);
    });

    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', () => {
        expect(game.cards[0]).toBe(Roles.Warewolf);
        expect(game.cards[1]).toBe(Roles.Warewolf);
        expect(game.cards[2]).toBe(Roles.Seer);
        expect(game.cards[3]).toBe(Roles.Robber);
        expect(game.cards[4]).toBe(Roles.Troublemaker);
        expect(game.cards[5]).toBe(Roles.Villager);
    });

    it('should marked as started after startGame is called', () => {
        var tmpGame : Game = new Game();
        expect(tmpGame.isStarted).toBeFalsy();
        tmpGame.startGame();
        expect(tmpGame.isStarted).toBeTruthy();
    });

    it('should "inform" players about their role', () => {
        dealer.dealCards(game.cards, game.players, game.table);

        var warewolf1Spy = spyOn(game.wareWolfs[0], 'sendMessage');
        var warewolf2Spy = spyOn(game.wareWolfs[1], 'sendMessage');
        var seerSpy = spyOn(game.seer, 'sendMessage');

        game.tellPlayersTheirRoles();

        expect(warewolf1Spy).toHaveBeenCalledWith({message : OutMessages.AssignedRole, role : Roles.Warewolf});
        expect(warewolf2Spy).toHaveBeenCalledWith({message : OutMessages.AssignedRole, role : Roles.Warewolf});
        expect(seerSpy).toHaveBeenCalledWith({message : OutMessages.AssignedRole, role : Roles.Seer});
    });
});
