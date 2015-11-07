import {Roles} from '../src/Game';

export default class Player {
    public role:Roles;

    constructor(public name:string) {
        this.role = null;
    }

    sendMessage(message:string):void {
        console.log(`${this.name} got: ${message}`);
    }
}