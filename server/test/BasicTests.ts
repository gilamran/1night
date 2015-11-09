import Game from '../src/Game';
import Dealer from '../src/Dealer';
import Player from '../src/Player';
import {Roles} from '../src/Game';
import {OutMessages, InMessages} from '../src/Game';
import * as GameBuilder from './GameDriver';

describe('Game', () => {
    let game : Game;
    let dealer : Dealer;

    beforeEach(() => {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });

    it('should get 3 players after the setup', () => {
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
