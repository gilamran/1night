import Player from './Player';

export default class PlayersManager {
    private players : Player[];
    private totalPlayers : number;

    constructor() {
        this.players = [];
        this.totalPlayers = 0;
    }

    playerLogin(playerName : string):string {
        var playerId = 'PLAYER_' + this.totalPlayers.toString();
        var newPlayer : Player = new Player(playerName, playerId);
        this.players.push(newPlayer);
        this.totalPlayers++;

        return playerId;
    }

    playerLogout(playerId : String) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    get playersCount():number {
        return this.players.length;
    }
}
