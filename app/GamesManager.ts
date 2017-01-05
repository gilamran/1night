import Game from './Game';

export class GamesManager {
    public games: Game[];
    private totalGame: number;

    constructor() {
        this.games = [];
        this.totalGame = 0;
    }

    getGameById(gameId: string): Game {
        return this.games.filter(game => game.id === gameId)[0];
    }

    getOpenGames(): Game[] {
        return this.games.filter(game => !game.isStarted);
    }

    createGame(gameName: string) {
        this.totalGame++;
        let gameId = 'GAME_' + this.totalGame.toString();
        let game = new Game(gameName, gameId);
        this.games.push(game);
        return game;
    }

    get gamesCount(): number {
        return this.games.length;
    }
}
