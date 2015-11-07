import Messenger from './Messenger';
import Player from './Player';
import Dealer from './Dealer';

export interface ITable {
    cards : Roles[];
}

export enum Roles {Warewolf, Seer, Robber, Troublemaker, Villager}

export default class Game {
    public players : Player[];
    public cards   : Roles[];
    public table   : ITable;
    public dealer  : Dealer;

    constructor() {
        this.table = {
            cards: []
        };

        this.dealer = new Dealer();
        this.players = [];
        this.cards = [Roles.Warewolf, Roles.Warewolf, Roles.Seer, Roles.Robber, Roles.Troublemaker, Roles.Villager];
    }

    public setup(players:Player[]) {
        this.players = players;
        return this.dealer;
    }

    private getSingleRole(role:Roles):Player {
        var roles = this.players.filter((player : Player) => player.role === role);
        return roles.length === 1 ? roles[0] : null;
    }

    private getMultiRole(role:Roles):Player[] {
        return this.players.filter((player) => player.role === Roles.Warewolf);
    }

    private get wareWolfs():Player[] {
        return this.getMultiRole(Roles.Warewolf);
    }

    private get seer():Player {
        var seers = this.players.filter((player) => player.role === Roles.Seer);
        return seers.length === 1 ? seers[0] : null;
    }

    public playRole(role:Roles) {
        switch (role) {
            case Roles.Warewolf: this.informWarewolfsAboutEachOther(); break;
            case Roles.Seer: this.askSeerForCards(); break;
        }
    }

    private askSeerForCards() {
        this.seer.sendMessage(`Choose cards to see`);
    }

    private informWarewolfsAboutEachOther() {
        if (this.wareWolfs.length == 2) {
            this.wareWolfs[0].sendMessage(`The other warewolf is ${this.wareWolfs[1].name}`);
            this.wareWolfs[1].sendMessage(`The other warewolf is ${this.wareWolfs[0].name}`);
        }
    }
}
