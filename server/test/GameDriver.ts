import Game from '../src/Game';
import Dealer from '../src/Dealer';
import Player from '../src/Player';
import {Roles} from '../src/Game';

export default class GameBuilder {

    private cards : Roles[];
    private players : Player[];

    get() {
        let game : Game = new Game();
        game.setup(this.players);

        if (this.cards) {
            game.cards = this.cards;
        }

        return game;
    }

    withThePlayers(players : Player[]) {
        this.players = players;
        return this;
    }

    withDeck(cards : Roles[]) {
        this.cards = cards;
        return this;
    }
}

let BASIC_GAME_PLAYERS : Player[] = [new Player('Gil', 'Player1'), new Player('AlonY', 'Player2'), new Player('Dvir', 'Player3')];
let ONE_WAREWOLF_DECK = [Roles.Warewolf, Roles.Seer, Roles.Robber, Roles.Troublemaker, Roles.Villager, Roles.Villager];
let NO_WAREWOLF_DECK = [Roles.Robber, Roles.Seer, Roles.Troublemaker, Roles.Villager, Roles.Villager, Roles.Villager];
let ROBBER_DECK = [Roles.Robber, Roles.Seer, Roles.Troublemaker, Roles.Villager, Roles.Villager, Roles.Villager];
let TROUBLEMAKER_DECK = [Roles.Troublemaker, Roles.Seer, Roles.Robber, Roles.Villager, Roles.Villager, Roles.Villager];

export var SimpleGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS).get();
export var SoleWareWolfGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS).withDeck(ONE_WAREWOLF_DECK).get();
export var NoWareWolfGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS).withDeck(NO_WAREWOLF_DECK).get();
export var SeerGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS).withDeck(ROBBER_DECK).get();
export var RobberGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS).withDeck(ROBBER_DECK).get();
export var TroublemakerGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS).withDeck(TROUBLEMAKER_DECK).get();
