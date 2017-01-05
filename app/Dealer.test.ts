import Game from './Game';
import Dealer from './Dealer';
import Player from './Player';
import { Roles } from './Game';
import * as GameBuilder from './../test/drivers/GameDriver';
import {expect} from 'chai';

describe('Dealer', () => {
    let game: Game;
    let dealer: Dealer;

    beforeEach(() => {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });

    it('should return a dealer after startGame', () => {
        expect(dealer).not.to.be.null;
    });

    it('should be able to shuffle the cards', () => {
        const dummyGame: Game = new Game('New Game', 'GAME_ID');
        dummyGame.cards = [];

        // generate loads of cards
        for (let i = 0; i < 20; i++) {
            dummyGame.cards.push(Roles.Warewolf);
            dummyGame.cards.push(Roles.Robber);
            dummyGame.cards.push(Roles.Seer);
            dummyGame.cards.push(Roles.Troublemaker);
            dummyGame.cards.push(Roles.Villager);
        }
        const tmpDealer: Dealer = new Dealer();
        const cardsCopy = [...dummyGame.cards];
        tmpDealer.shuffleCards(dummyGame.cards);
        expect(dummyGame.cards).not.to.deep.eq(cardsCopy);
    });

    it('players should hold cards only after dealing', () => {
        expect(game.players[0].role).to.be.null;
        expect(game.players[1].role).to.be.null;
        expect(game.players[2].role).to.be.null;

        dealer.shuffleCards(game.cards);
        dealer.dealCards(game.cards, game.players, game.table);

        expect(game.players[0].role).to.eq(game.cards[0]);
        expect(game.players[1].role).to.eq(game.cards[1]);
        expect(game.players[2].role).to.eq(game.cards[2]);
    });

    it('table should have the remaining 3 cards after dealing', () => {
        expect(game.table.cards.length).to.eq(0);

        dealer.shuffleCards(game.cards);
        dealer.dealCards(game.cards, game.players, game.table);

        expect(game.table.cards.length).to.eq(3);
        expect(game.table.cards[0]).to.eq(game.cards[3]);
        expect(game.table.cards[1]).to.eq(game.cards[4]);
        expect(game.table.cards[2]).to.eq(game.cards[5]);
    });

    it('should be able to deal as expected', () => {
        expect(game.table.cards.length).to.eq(0);
        expect(game.players[0].role).to.be.null;
        expect(game.players[1].role).to.be.null;
        expect(game.players[2].role).to.be.null;

        dealer.dealCards(game.cards, game.players, game.table);

        expect(game.players[0].role).to.eq(game.cards[0]);
        expect(game.players[1].role).to.eq(game.cards[1]);
        expect(game.players[2].role).to.eq(game.cards[2]);
        expect(game.table.cards[0]).to.eq(game.cards[3]);
        expect(game.table.cards[1]).to.eq(game.cards[4]);
        expect(game.table.cards[2]).to.eq(game.cards[5]);
    });
});
