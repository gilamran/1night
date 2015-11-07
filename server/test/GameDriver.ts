import Game from '../src/Game';
import Dealer from '../src/Dealer';
import Player from '../src/Player';
import {Roles} from '../src/Game';

export default class GameDriver {
    private BASIC_GAME_PLAYERS : Player[] = [new Player('Gil'), new Player('AlonY'), new Player('Dvir')];

    private game : Game;
    private dealer : Dealer;
    private players : Player[];

    init() {
        this.game = new Game();
        if (this.dealer) {
            this.game.setup(this.players);
            this.game.dealer = this.dealer;
        } else {
            this.dealer = this.game.setup(this.players);
        }
        return this;
    }

    withThePlayers(players : Player[]) {
        this.players = players;
        return this;
    }

    withTheDealer(dealer : Dealer) {
        this.dealer = dealer;
        return this;
    }

    shuffle() {
        this.dealer.shuffleCards(this.game.cards);
    }

    deal(cards? : Roles[]) {
        this.dealer.dealCards(cards ? cards : this.game.cards, this.game.players, this.game.table);
    }

    shuffleAndDeal(cards? : Roles[]) {
        this.dealer.shuffleCards(cards ? cards : this.game.cards);
        this.dealer.dealCards(cards ? cards : this.game.cards, this.game.players, this.game.table);
    }

    with = {
        simpleSetup: () => {
            this.withThePlayers(this.BASIC_GAME_PLAYERS);
            return this;
        }
    };
}
