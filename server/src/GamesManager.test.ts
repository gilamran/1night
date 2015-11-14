import GamesManager from './GamesManager';

describe('Games Manager', () => {
    let gamesManager : GamesManager;

    beforeEach(() => {
        gamesManager = new GamesManager();
    });

    it('should start with no running games', () => {
        expect(gamesManager.gamesCount).toBe(0);
    });

    it('should be able to create new games', () => {
        var runningGamesCount = gamesManager.gamesCount;

        expect(gamesManager.createGame('New Game')).not.toBeNull();
        expect(gamesManager.gamesCount).toBe(runningGamesCount + 1);

        expect(gamesManager.createGame('New Game')).not.toBeNull();
        expect(gamesManager.gamesCount).toBe(runningGamesCount + 2);
    });

    it('should be able to retrieve a game by id', () => {
        var game = gamesManager.createGame('New Game');

        expect(game).not.toBeNull();
        expect(gamesManager.getGameById(game.id)).toBe(game);
    });

    it('should be able to retrieve the list of "open" games', () => {
        var game1 = gamesManager.createGame('Game 1');
        var game2 = gamesManager.createGame('Game 2');
        var game3 = gamesManager.createGame('Game 3');
        var game4 = gamesManager.createGame('Game 4');

        expect(gamesManager.getOpenGames().length).toBe(4);

        game2.startGame();

        expect(gamesManager.getOpenGames().length).toBe(3);
    });
});
