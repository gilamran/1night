var Game_1 = require('../src/Game');
var Dealer_1 = require('../src/Dealer');
var Player_1 = require('../src/Player');
var Game_2 = require('../src/Game');
describe('Dealer', function () {
    var game;
    var dealer;
    beforeEach(function () {
        game = new Game_1.default();
        dealer = game.setup([new Player_1.default('Gil', 'Player1'), new Player_1.default('AlonY', 'Player2'), new Player_1.default('Dvir', 'Player3')]);
    });
    it('should return a dealer after setup', function () {
        expect(dealer).not.toBeNull();
    });
    it('should be able to shuffle the cards', function () {
        var dummyGame = new Game_1.default();
        dummyGame.cards = [];
        for (var i = 0; i < 20; i++) {
            dummyGame.cards.push(Game_2.Roles.Warewolf);
            dummyGame.cards.push(Game_2.Roles.Robber);
            dummyGame.cards.push(Game_2.Roles.Seer);
            dummyGame.cards.push(Game_2.Roles.Troublemaker);
            dummyGame.cards.push(Game_2.Roles.Villager);
        }
        var tmpDealer = new Dealer_1.default();
        var cardsCopy = dummyGame.cards.slice();
        tmpDealer.shuffleCards(dummyGame.cards);
        expect(dummyGame.cards).not.toEqual(cardsCopy);
    });
    it('players should hold cards only after dealing', function () {
        expect(game.players[0].role).toBeNull();
        expect(game.players[1].role).toBeNull();
        expect(game.players[2].role).toBeNull();
        dealer.shuffleCards(game.cards);
        dealer.dealCards(game.cards, game.players, game.table);
        expect(game.players[0].role).toBe(game.cards[0]);
        expect(game.players[1].role).toBe(game.cards[1]);
        expect(game.players[2].role).toBe(game.cards[2]);
    });
    it('table should have the remaining 3 cards after dealing', function () {
        expect(game.table.cards.length).toBe(0);
        dealer.shuffleCards(game.cards);
        dealer.dealCards(game.cards, game.players, game.table);
        expect(game.table.cards.length).toBe(3);
        expect(game.table.cards[0]).toBe(game.cards[3]);
        expect(game.table.cards[1]).toBe(game.cards[4]);
        expect(game.table.cards[2]).toBe(game.cards[5]);
    });
    it('should be able to deal as expected', function () {
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
