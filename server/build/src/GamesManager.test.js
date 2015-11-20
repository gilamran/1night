var GamesManager_1 = require('./GamesManager');
describe('Games Manager', function () {
    var gamesManager;
    beforeEach(function () {
        gamesManager = new GamesManager_1.GamesManager();
    });
    it('should start with no running games', function () {
        expect(gamesManager.gamesCount).toBe(0);
    });
    it('should be able to create new games', function () {
        var runningGamesCount = gamesManager.gamesCount;
        expect(gamesManager.createGame('New Game')).not.toBeNull();
        expect(gamesManager.gamesCount).toBe(runningGamesCount + 1);
        expect(gamesManager.createGame('New Game')).not.toBeNull();
        expect(gamesManager.gamesCount).toBe(runningGamesCount + 2);
    });
    it('should be able to retrieve a game by id', function () {
        var game = gamesManager.createGame('New Game');
        expect(game).not.toBeNull();
        expect(gamesManager.getGameById(game.id)).toBe(game);
    });
    it('should be able to retrieve the list of "open" games', function () {
        var game1 = gamesManager.createGame('Game 1');
        var game2 = gamesManager.createGame('Game 2');
        var game3 = gamesManager.createGame('Game 3');
        var game4 = gamesManager.createGame('Game 4');
        expect(gamesManager.getOpenGames().length).toBe(4);
        game2.startGame();
        expect(gamesManager.getOpenGames().length).toBe(3);
    });
});
