import { GamesManager } from './GamesManager';
import {expect} from 'chai';

describe('Games Manager', () => {
    let gamesManager: GamesManager;

    beforeEach(() => {
        gamesManager = new GamesManager();
    });

    it('should start with no running games', () => {
        expect(gamesManager.gamesCount).to.eq(0);
    });

    it('should be able to create new games', () => {
        const runningGamesCount = gamesManager.gamesCount;

        expect(gamesManager.createGame('New Game')).not.to.be.null;
        expect(gamesManager.gamesCount).to.eq(runningGamesCount + 1);

        expect(gamesManager.createGame('New Game')).not.to.be.null;
        expect(gamesManager.gamesCount).to.eq(runningGamesCount + 2);
    });

    it('should be able to retrieve a game by id', () => {
        const game = gamesManager.createGame('New Game');

        expect(game).not.to.be.null;
        expect(gamesManager.getGameById(game.id)).to.eq(game);
    });

    it('should be able to retrieve the list of "open" games', () => {
        const game1 = gamesManager.createGame('Game 1');
        const game2 = gamesManager.createGame('Game 2');
        const game3 = gamesManager.createGame('Game 3');
        const game4 = gamesManager.createGame('Game 4');

        expect(gamesManager.getOpenGames().length).to.eq(4);

        game2.startGame();

        expect(gamesManager.getOpenGames().length).to.eq(3);
    });
});
