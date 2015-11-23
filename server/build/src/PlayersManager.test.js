var PlayersManager_1 = require('./PlayersManager');
describe('Players Manager', function () {
    var playersManager;
    beforeEach(function () {
        playersManager = new PlayersManager_1.default();
    });
    it('should be able to let players join and leave using their player id', function () {
        expect(playersManager.playersCount).toBe(0);
        var player1Id = playersManager.playerLogin('PLAYER1');
        var player2Id = playersManager.playerLogin('PLAYER2');
        expect(playersManager.playersCount).toBe(2);
        playersManager.playerLogout(player1Id);
        expect(playersManager.playersCount).toBe(1);
    });
    it('should return an array of the players names, when asked to', function () {
        playersManager.playerLogin('PLAYER1');
        playersManager.playerLogin('PLAYER2');
        expect(playersManager.playersNames).toEqual(['PLAYER1', 'PLAYER2']);
    });
});
