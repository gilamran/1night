import Player from './Player';
import Dealer from './Dealer';

export interface ITable {
    cards : Roles[];
}

export enum OutMessages {
    AssignedRole,
    RevealOtherWarewolf,
    AskWarewolfToChooseACard,
    AskSeerToChooseCards,
    ShowCardsToSeer,
    ShowCardToWarewolf,
    AskRobberToChooseAPlayer,
    GiveRobberHisNewRole,
    RobberTookYourRole,
    AskTroublemakerToChoosePlayers,
    TroublemakerSwitchedYourCard
}

export enum InMessages {
    SeerWantsToSeeTableCards,
    WarewolfWantsToSeeATableCard,
    RobberWantsToRobeAPlayer,
    TroublemakerSwitchedPlayersCards
}

export enum Roles {
    Warewolf,
    Seer,
    Robber,
    Troublemaker,
    Villager
}

export default class Game {
    public players:Player[];
    public cards:Roles[];
    public table:ITable;
    public dealer:Dealer;
    public isStarted:Boolean;

    constructor(public name:string = '', public id:string = '') {
        this.table = {
            cards: []
        };
        this.isStarted = false;
        this.dealer = new Dealer();
        this.players = [];
        this.cards = [Roles.Warewolf, Roles.Warewolf, Roles.Seer, Roles.Robber, Roles.Troublemaker, Roles.Villager];
    }

    public acceptPlayers(players:Player[]) {
        players.forEach(player => this.acceptPlayer(player));
    }

    public acceptPlayer(player:Player) {
        this.players.push(player);
    }

    public startGame() {
        this.isStarted = true;
        return this.dealer;
    }

    private getSingleRole(role:Roles):Player {
        var roles = this.players.filter(player => player.dealtRole === role);
        return roles.length === 1 ? roles[0] : null;
    }

    private getMultiRole(role:Roles):Player[] {
        return this.players.filter(player => player.dealtRole === role);
    }

    private getPlayer(id:string):Player {
        return this.players.filter(player => player.id === id)[0];
    }

    public get wareWolfs():Player[] {
        return this.getMultiRole(Roles.Warewolf);
    }

    public get seer():Player {
        return this.getSingleRole(Roles.Seer);
    }

    public get robber():Player {
        return this.getSingleRole(Roles.Robber);
    }

    public get troublemaker():Player {
        return this.getSingleRole(Roles.Troublemaker);
    }

    private switchRoles(player1:Player, player2:Player) {
        var tmpRole = player1.role;
        player1.role = player2.role;
        player2.role = tmpRole;
    }

    public gotMessage(player:Player, data:any) {
        switch (data.message) {
            case InMessages.SeerWantsToSeeTableCards:
                player.sendMessage({
                    message: OutMessages.ShowCardsToSeer,
                    cards: [this.table.cards[data.cards[0]], this.table.cards[data.cards[1]]]
                });
                break;

            case InMessages.WarewolfWantsToSeeATableCard:
                player.sendMessage({message: OutMessages.ShowCardToWarewolf, card: this.table.cards[data.card]});
                break;

            case InMessages.RobberWantsToRobeAPlayer:
                let targetPlayer = this.getPlayer(data.playerId);
                player.sendMessage({
                    message: OutMessages.GiveRobberHisNewRole,
                    newRole: this.getPlayer(data.playerId).role
                });
                targetPlayer.sendMessage({message: OutMessages.RobberTookYourRole, newRole: player.role});

                this.switchRoles(player, targetPlayer);
                break;

            case InMessages.TroublemakerSwitchedPlayersCards:
                let player1 = this.getPlayer(data.playersIds[0]);
                let player2 = this.getPlayer(data.playersIds[1]);
                player1.sendMessage({message: OutMessages.TroublemakerSwitchedYourCard, newRole: player2.role});
                player2.sendMessage({message: OutMessages.TroublemakerSwitchedYourCard, newRole: player1.role});

                this.switchRoles(player1, player2);
                break;
        }
    }

    public playRole(role:Roles) {
        switch (role) {
            case Roles.Warewolf:
                this.informWarewolfsAboutEachOther();
                break;
            case Roles.Seer:
                this.askSeerForCards();
                break;
            case Roles.Robber:
                this.askRobberForAPlayer();
                break;
            case Roles.Troublemaker:
                this.askTroublemakerForPlayers();
                break;
        }
    }

    public tellPlayersTheirRoles() {
        this.players[0].sendMessage({message: OutMessages.AssignedRole, role: this.players[0].role});
        this.players[1].sendMessage({message: OutMessages.AssignedRole, role: this.players[1].role});
        this.players[2].sendMessage({message: OutMessages.AssignedRole, role: this.players[2].role});
    }

    private askSeerForCards() {
        this.seer.sendMessage({message: OutMessages.AskSeerToChooseCards});
    }

    private askRobberForAPlayer() {
        this.robber.sendMessage({message: OutMessages.AskRobberToChooseAPlayer});
    }

    private askTroublemakerForPlayers() {
        this.troublemaker.sendMessage({message: OutMessages.AskTroublemakerToChoosePlayers});
    }

    private informWarewolfsAboutEachOther() {
        switch (this.wareWolfs.length) {
            case 1 :
                this.wareWolfs[0].sendMessage({message: OutMessages.AskWarewolfToChooseACard});
                break;

            case 2 :
                this.wareWolfs[0].sendMessage({
                    message: OutMessages.RevealOtherWarewolf,
                    playerId: this.wareWolfs[1].id
                });
                this.wareWolfs[1].sendMessage({
                    message: OutMessages.RevealOtherWarewolf,
                    playerId: this.wareWolfs[0].id
                });
                break;
        }
    }
}
