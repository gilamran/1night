import Game from './Game';
import { Roles } from './Game';
import { ITable } from './Game';
import Player from './Player';

export default class Dealer {
    shuffleCards(cards: Roles[]) {
        let currentIndex = cards.length;

        while (0 !== currentIndex) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            let temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }
    }

    dealCards(cards: Roles[], players: Player[], table: ITable) {
        players[0].dealCard(cards[0]);
        players[1].dealCard(cards[1]);
        players[2].dealCard(cards[2]);

        table.cards[0] = cards[3];
        table.cards[1] = cards[4];
        table.cards[2] = cards[5];
    }
}
