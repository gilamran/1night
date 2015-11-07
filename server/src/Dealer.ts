import Game from '../src/Game';
import {Roles} from '../src/Game';
import {ITable} from '../src/Game';
import Player from '../src/Player';

export default class Dealer {
    constructor() {
    }

    shuffleCards(cards : Roles[]):void {
        var currentIndex = cards.length;

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

    dealCards(cards : Roles[], players : Player[], table : ITable):void {
       players[0].role = cards[0];
       players[1].role = cards[1];
       players[2].role = cards[2];

        table.cards[0] = cards[3];
        table.cards[1] = cards[4];
        table.cards[2] = cards[5];
    }
}