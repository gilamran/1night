import { GamesManager } from './GamesManager';

describe('Games Manager', () => {
    let gamesManager: GamesManager;

    beforeEach(() => {
        gamesManager = new GamesManager();
    });

    it('should start with no running games', () => {
        expect(gamesManager.gamesCount).toBe(0);
    });

    it('should be able to create new games', () => {
        const runningGamesCount = gamesManager.gamesCount;

        expect(gamesManager.createGame('New Game')).not.toBeNull();
        expect(gamesManager.gamesCount).toBe(runningGamesCount + 1);

        expect(gamesManager.createGame('New Game')).not.toBeNull();
        expect(gamesManager.gamesCount).toBe(runningGamesCount + 2);
    });

    it('should be able to retrieve a game by id', () => {
        const game = gamesManager.createGame('New Game');

        expect(game).not.toBeNull();
        expect(gamesManager.getGameById(game.id)).toBe(game);
    });

    it('should be able to retrieve the list of "open" games', () => {
        const game1 = gamesManager.createGame('Game 1');
        const game2 = gamesManager.createGame('Game 2');
        const game3 = gamesManager.createGame('Game 3');
        const game4 = gamesManager.createGame('Game 4');

        expect(gamesManager.getOpenGames().length).toBe(4);

        game2.startGame();

        expect(gamesManager.getOpenGames().length).toBe(3);
    });
});
