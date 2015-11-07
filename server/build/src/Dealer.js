var Dealer = (function () {
    function Dealer() {
    }
    Dealer.prototype.shuffleCards = function (cards) {
        var currentIndex = cards.length;
        while (0 !== currentIndex) {
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            var temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }
    };
    Dealer.prototype.dealCards = function (cards, players, table) {
        players[0].role = cards[0];
        players[1].role = cards[1];
        players[2].role = cards[2];
        table.cards[0] = cards[3];
        table.cards[1] = cards[4];
        table.cards[2] = cards[5];
    };
    return Dealer;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dealer;
