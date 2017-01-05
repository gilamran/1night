import PlayersManager from './PlayersManager';
import {expect} from 'chai';

describe('Players Manager', () => {
    let playersManager: PlayersManager;

    beforeEach(() => {
        playersManager = new PlayersManager();
    });

    it('should be able to let players join and leave using their player id', () => {
        expect(playersManager.playersCount).to.eq(0);
        const player1Id = playersManager.playerLogin('PLAYER1');
        const player2Id = playersManager.playerLogin('PLAYER2');
        expect(playersManager.playersCount).to.eq(2);
        playersManager.playerLogout(player1Id);
        expect(playersManager.playersCount).to.eq(1);
    });

    it('should return an array of the players names, when asked to', () => {
        playersManager.playerLogin('PLAYER1');
        playersManager.playerLogin('PLAYER2');
        expect(playersManager.playersNames).to.deep.eq(['PLAYER1', 'PLAYER2']);
    });
});
