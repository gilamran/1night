import Game from '../src/Game';
import Dealer from '../src/Dealer';
import Player from '../src/Player';
import {Roles} from '../src/Game';

describe('Dealer', () => {
    let game : Game;
    let dealer : Dealer;

    beforeEach(() => {
        game = new Game();
        dealer = game.setup([new Player('Gil', 'Player1'), new Player('AlonY', 'Player2'), new Player('Dvir', 'Player3')]);
    });

    it('should return a dealer after setup', () => {
        expect(dealer).not.toBeNull();
    });

    it('should be able to shuffle the cards', () => {
        var dummyGame : Game = new Game();
        dummyGame.cards = [];

        // generate loads of cards
        for (let i = 0; i < 20; i++) {
            dummyGame.cards.push(Roles.Warewolf);
            dummyGame.cards.push(Roles.Robber);
            dummyGame.cards.push(Roles.Seer);
            dummyGame.cards.push(Roles.Troublemaker);
            dummyGame.cards.push(Roles.Villager);
        }
        var tmpDealer : Dealer = new Dealer();
        var cardsCopy = [...dummyGame.cards];
        tmpDealer.shuffleCards(dummyGame.cards);
        expect(dummyGame.cards).not.toEqual(cardsCopy);
    });

    it('players should hold cards only after dealing', () => {
        expect(game.players[0].role).toBeNull();
        expect(game.players[1].role).toBeNull();
        expect(game.players[2].role).toBeNull();

        dealer.shuffleCards(game.cards);
        dealer.dealCards(game.cards, game.players, game.table);

        expect(game.players[0].role).toBe(game.cards[0]);
        expect(game.players[1].role).toBe(game.cards[1]);
        expect(game.players[2].role).toBe(game.cards[2]);
    });

    it('table should have the remaining 3 cards after dealing', () => {
        expect(game.table.cards.length).toBe(0);

        dealer.shuffleCards(game.cards);
        dealer.dealCards(game.cards, game.players, game.table);

        expect(game.table.cards.length).toBe(3);
        expect(game.table.cards[0]).toBe(game.cards[3]);
        expect(game.table.cards[1]).toBe(game.cards[4]);
        expect(game.table.cards[2]).toBe(game.cards[5]);
    });

    it('should be able to deal as expected', () => {
        expect(game.table.cards.length).toBe(0);
        expect(game.players[0].role).toBeNull();
        expect(game.players[1].role).toBeNull();
        expect(game.players[2].role).toBeNull();

        dealer.dealCards(game.cards, game.players, game.table);

        expect(game.players[0].role).toBe(game.cards[0]);
        expect(game.players[1].role).toBe(game.cards[1]);
        expect(game.players[2].role).toBe(game.cards[2]);
        expect(game.table.cards[0]).toBe(game.cards[3]);
        expect(game.table.cards[1]).toBe(game.cards[4]);
        expect(game.table.cards[2]).toBe(game.cards[5]);
    });
});
