import Game from '../src/Game';
import Dealer from '../src/Dealer';
import Player from '../src/Player';
import {Roles} from '../src/Game';
import GameDriver from './GameDriver';

describe('Game', () => {
    let game : Game;
    let dealer : Dealer;
    let driver : GameDriver;

    beforeEach(() => {
        game = new Game();
        dealer = game.setup([new Player('Gil'), new Player('AlonY'), new Player('Dvir')]);
        driver = new GameDriver().with.simpleSetup();
    });

    it('should get 3 players after the setup', () => {
        expect(game.players.length).toBe(3);
    });

    it('should have 3 more cards than the number of players', () => {
        expect(game.cards.length).toBe(game.players.length + 3);
    });

    it('players should have names', () => {
        expect(game.players[0].name).toBe('Gil');
        expect(game.players[1].name).toBe('AlonY');
        expect(game.players[2].name).toBe('Dvir');
    });

    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', () => {
        expect(game.cards[0]).toBe(Roles.Warewolf);
        expect(game.cards[1]).toBe(Roles.Warewolf);
        expect(game.cards[2]).toBe(Roles.Seer);
        expect(game.cards[3]).toBe(Roles.Robber);
        expect(game.cards[4]).toBe(Roles.Troublemaker);
        expect(game.cards[5]).toBe(Roles.Villager);
    });

    it('should "inform" warewolfs about each other', () => {
        var spy1 = spyOn(game.players[0], 'sendMessage');
        var spy2 = spyOn(game.players[1], 'sendMessage');

        dealer.dealCards(game.cards, game.players, game.table);
        game.playRole(Roles.Warewolf);

        expect(spy1).toHaveBeenCalledWith(`The other warewolf is ${game.players[1].name}`);
        expect(spy2).toHaveBeenCalledWith(`The other warewolf is ${game.players[0].name}`);
    });

    it('should ask seer which card he/she wants to see', () => {
        var spy1 = spyOn(game.players[2], 'sendMessage');

        dealer.dealCards(game.cards, game.players, game.table);
        game.playRole(Roles.Seer);

        expect(spy1).toHaveBeenCalledWith(`Choose cards to see`);
    });

    it('after there is a response from the seer, show him/her the cards', () => {
        var spy1 = spyOn(game.players[2], 'sendMessage');

        dealer.dealCards(game.cards, game.players, game.table);
        game.gotMessage({cards:[0,1], location:'table'});

        expect(spy1).toHaveBeenCalledWith(`Show cards to player ${game.cards[0]} and ${game.cards[1]}`);
    });
});
