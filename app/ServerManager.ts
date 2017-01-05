import { GamesManager } from './GamesManager';
import PlayersManager from './PlayersManager';

class ServerManager {
    public gamesManager: GamesManager;
    public playersManager: PlayersManager;

    constructor() {
        this.gamesManager = new GamesManager();
        this.playersManager = new PlayersManager();
    }
}

export const serverManager = new ServerManager();
