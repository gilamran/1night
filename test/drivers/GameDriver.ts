import Game from '../../app/Game';
import Dealer from '../../app/Dealer';
import Player from '../../app/Player';
import { Roles } from '../../app/Game';

export default class GameBuilder {

    private cards: Roles[];
    private players: Player[];

    get() {
        let game: Game = new Game('New Game', 'GAME_ID');
        game.acceptPlayers(this.players);
        game.startGame();

        if (this.cards) {
            game.cards = this.cards;
        }

        return game;
    }

    withThePlayers(players: Player[]) {
        this.players = players;
        return this;
    }

    withDeck(cards: Roles[]) {
        this.cards = cards;
        return this;
    }
}

let BASIC_GAME_PLAYERS: () => Player[] = () => [
    new Player('Gil', 'Player1'),
    new Player('AlonY', 'Player2'),
    new Player('Dvir', 'Player3')
];
let ONE_WAREWOLF_DECK = [Roles.Warewolf, Roles.Seer, Roles.Robber, Roles.Troublemaker, Roles.Villager, Roles.Villager];
let NO_WAREWOLF_DECK = [Roles.Robber, Roles.Seer, Roles.Troublemaker, Roles.Villager, Roles.Villager, Roles.Villager];
let ROBBER_DECK = [Roles.Robber, Roles.Seer, Roles.Troublemaker, Roles.Villager, Roles.Villager, Roles.Villager];
let TROUBLEMAKER_DECK = [Roles.Troublemaker, Roles.Seer, Roles.Robber, Roles.Villager, Roles.Villager, Roles.Villager];

export const SimpleGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).get();
export const SoleWareWolfGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(ONE_WAREWOLF_DECK).get();
export const NoWareWolfGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(NO_WAREWOLF_DECK).get();
export const SeerGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(ROBBER_DECK).get();
export const RobberGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(ROBBER_DECK).get();
export const TroublemakerGame = () => new GameBuilder().withThePlayers(BASIC_GAME_PLAYERS()).withDeck(TROUBLEMAKER_DECK).get();
