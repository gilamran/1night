import PlayersManager from './PlayersManager';

describe('Players Manager', () => {
    let playersManager : PlayersManager;

    beforeEach(() => {
        playersManager = new PlayersManager();
    });

    it('should be able to let players join and leave using their player id', () => {
        expect(playersManager.playersCount).toBe(0);
        var player1Id = playersManager.playerLogin('PLAYER1');
        var player2Id = playersManager.playerLogin('PLAYER2');
        expect(playersManager.playersCount).toBe(2);
        playersManager.playerLogout(player1Id);
        expect(playersManager.playersCount).toBe(1);
    });
});
