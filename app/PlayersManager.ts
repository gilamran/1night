import Player from './Player';

export default class PlayersManager {
    private players: Player[];
    private totalPlayers: number;

    constructor() {
        this.players = [];
        this.totalPlayers = 0;
    }

    playerLogin(playerName: string): string {
        const playerId = 'PLAYER_' + this.totalPlayers.toString();
        const newPlayer: Player = new Player(playerName, playerId);
        this.players.push(newPlayer);
        this.totalPlayers++;

        return playerId;
    }

    playerLogout(playerId: String) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    get playersCount(): number {
        return this.players.length;
    }

    get playersNames(): string[] {
        return this.players.map((player: Player) => player.name);
    }
}
