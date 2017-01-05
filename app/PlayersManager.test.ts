import PlayersManager from './PlayersManager';

describe('Players Manager', () => {
    let playersManager: PlayersManager;

    beforeEach(() => {
        playersManager = new PlayersManager();
    });

    it('should be able to let players join and leave using their player id', () => {
        expect(playersManager.playersCount).toBe(0);
        const player1Id = playersManager.playerLogin('PLAYER1');
        const player2Id = playersManager.playerLogin('PLAYER2');
        expect(playersManager.playersCount).toBe(2);
        playersManager.playerLogout(player1Id);
        expect(playersManager.playersCount).toBe(1);
    });

    it('should return an array of the players names, when asked to', () => {
        playersManager.playerLogin('PLAYER1');
        playersManager.playerLogin('PLAYER2');
        expect(playersManager.playersNames).toEqual(['PLAYER1', 'PLAYER2']);
    });
});
