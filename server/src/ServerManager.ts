import Game from './Game';
import {GamesManager} from "./GamesManager";
import PlayersManager from "./PlayersManager";

export class ServerManager {
   public gamesManager : GamesManager;
   public playersManager : PlayersManager;

    constructor() {
        this.gamesManager = new GamesManager();
        this.playersManager = new PlayersManager();
    }
}
