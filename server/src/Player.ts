import {Roles} from '../src/Game';

export default class Player {
    public dealtRole:Roles;
    public role:Roles;

    constructor(public name:string, public id:string) {
        this.role = null;
        this.dealtRole = null;
    }

    sendMessage(message:any):void {
        console.log(`${this.name} got: ${message}`);
    }

    dealCard(role:Roles) {
        this.role = role;
        this.dealtRole = role;
    }
}