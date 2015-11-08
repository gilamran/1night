import Game from '../src/Game';
import Dealer from '../src/Dealer';
import Player from '../src/Player';
import {Roles} from '../src/Game';
import {OutMessages, InMessages} from '../src/Game';
import * as GameBuilder from './GameDriver';

describe('Game', () => {
    let game : Game;
    let dealer : Dealer;

    beforeEach(() => {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });

    it('should get 3 players after the setup', () => {
        expect(game.players.length).toBe(3);
    });

    it('should have 3 more cards than the number of players', () => {
        expect(game.cards.length).toBe(game.players.length + 3);
    });

    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', () => {
        expect(game.cards[0]).toBe(Roles.Warewolf);
        expect(game.cards[1]).toBe(Roles.Warewolf);
        expect(game.cards[2]).toBe(Roles.Seer);
        expect(game.cards[3]).toBe(Roles.Robber);
        expect(game.cards[4]).toBe(Roles.Troublemaker);
        expect(game.cards[5]).toBe(Roles.Villager);
    });

    it('should "inform" players about their role', () => {
        dealer.dealCards(game.cards, game.players, game.table);

        var warewolf1Spy = spyOn(game.wareWolfs[0], 'sendMessage');
        var warewolf2Spy = spyOn(game.wareWolfs[1], 'sendMessage');
        var seerSpy = spyOn(game.seer, 'sendMessage');

        game.tellPlayersTheirRoles();

        expect(warewolf1Spy).toHaveBeenCalledWith({message : OutMessages.AssignedRole, role : Roles.Warewolf});
        expect(warewolf2Spy).toHaveBeenCalledWith({message : OutMessages.AssignedRole, role : Roles.Warewolf});
        expect(seerSpy).toHaveBeenCalledWith({message : OutMessages.AssignedRole, role : Roles.Seer});
    });



    // Warewolfs
    it('should "inform" warewolfs about each other', () => {
        dealer.dealCards(game.cards, game.players, game.table);

        var spy1 = spyOn(game.wareWolfs[0], 'sendMessage');
        var spy2 = spyOn(game.wareWolfs[1], 'sendMessage');
        game.playRole(Roles.Warewolf);

        expect(spy1).toHaveBeenCalledWith({message : OutMessages.RevealOtherWarewolf, playerId : game.wareWolfs[1].id});
        expect(spy2).toHaveBeenCalledWith({message : OutMessages.RevealOtherWarewolf, playerId : game.wareWolfs[0].id});
    });

    it('should "inform" sole warewolf that he/she is alone', () => {
        let tmpGame = GameBuilder.SoleWareWolfGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);

        var spy = spyOn(tmpGame.wareWolfs[0], 'sendMessage');
        tmpGame.playRole(Roles.Warewolf);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskWarewolfToChooseACard});
    });

    it('should not "inform" anyone anything, if there are no warewolfs', () => {
        let tmpGame = GameBuilder.NoWareWolfGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);

        var spys : jasmine.Spy[] = [];
        tmpGame.players.forEach(player => spys.push(spyOn(player, 'sendMessage')));
        tmpGame.playRole(Roles.Warewolf);

        spys.forEach(spy => expect(spy).not.toHaveBeenCalled());
    });

    it('after there is a response from the sole warewolf, show him/her the card', () => {
        let tmpGame = GameBuilder.SoleWareWolfGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);

        var warewolf = tmpGame.wareWolfs[0];
        var spy = spyOn(warewolf, 'sendMessage');


        game.gotMessage(warewolf, {message : InMessages.WarewolfWantsToSeeATableCard, card : 0});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardToWarewolf, card : game.table.cards[0]});

        game.gotMessage(warewolf, {message : InMessages.WarewolfWantsToSeeATableCard, card : 1});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardToWarewolf, card : game.table.cards[1]});

        game.gotMessage(warewolf, {message : InMessages.WarewolfWantsToSeeATableCard, card : 2});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardToWarewolf, card : game.table.cards[2]});
    });



    // Seer
    it('should ask seer which card he/she wants to see', () => {
        dealer.dealCards(game.cards, game.players, game.table);

        var spy = spyOn(game.seer, 'sendMessage');
        game.playRole(Roles.Seer);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskSeerToChooseCards});
    });

    it('after there is a response from the seer, show him/her the cards', () => {
        dealer.dealCards(game.cards, game.players, game.table);

        var seer = game.seer;
        var spy = spyOn(seer, 'sendMessage');

        game.gotMessage(seer, {message : InMessages.SeerWantsToSeeTableCards, cards : [0, 1]});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardsToSeer, cards : [game.table.cards[0], game.table.cards[1]]});

        game.gotMessage(seer, {message : InMessages.SeerWantsToSeeTableCards, cards : [1, 2]});
        expect(spy).toHaveBeenCalledWith({message: OutMessages.ShowCardsToSeer, cards : [game.table.cards[1], game.table.cards[2]]});
    });



    // Robber
    it('should ask the robber which player he/she wants to robe', () => {
        let tmpGame = GameBuilder.RobberGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);

        var spy = spyOn(tmpGame.robber, 'sendMessage');
        tmpGame.playRole(Roles.Robber);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskRobberToChooseAPlayer});
    });

    it('after there is a response from the robber, show him/her his/her new role', () => {
        let tmpGame = GameBuilder.RobberGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);

        var robber = game.robber;
        var robberOriginalRole = robber.role;
        var robberSpy = spyOn(robber, 'sendMessage');

        var player = game.players[1];
        var playerOriginalRole = player.role;
        var playerSpy = spyOn(player, 'sendMessage');

        game.gotMessage(robber, {message : InMessages.RobberWantsToRobeAPlayer, playerId : player.id});
        expect(robberSpy).toHaveBeenCalledWith({message: OutMessages.GiveRobberHisNewRole, newRole : playerOriginalRole});
        expect(playerSpy).toHaveBeenCalledWith({message: OutMessages.RobberTookYourRole, newRole : robberOriginalRole});
        expect(robber.role).toBe(playerOriginalRole);
    });



    // TroubleMaker
    it('should ask the troublemaker which players he/she wants to switch', () => {
        let tmpGame = GameBuilder.TroublemakerGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);

        var spy = spyOn(tmpGame.troublemaker, 'sendMessage');
        tmpGame.playRole(Roles.Troublemaker);

        expect(spy).toHaveBeenCalledWith({message : OutMessages.AskTroublemakerToChoosePlayers});
    });

    it('after there is a response from the troublemaker, switch the cards, and let players know', () => {
        let tmpGame = GameBuilder.TroublemakerGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);

        var troublemaker = tmpGame.troublemaker;
        var player1 = tmpGame.players[1];
        var player2 = tmpGame.players[2];
        var player1OriginalRole = player1.role;
        var player2OriginalRole = player2.role;
        var player1Spy = spyOn(player1, 'sendMessage');
        var player2Spy = spyOn(player2, 'sendMessage');

        tmpGame.gotMessage(troublemaker, {message : InMessages.TroublemakerSwitchedPlayersCards, playersIds : [player1.id, player2.id]});
        expect(player1Spy).toHaveBeenCalledWith({message: OutMessages.TroublemakerSwitchedYourCard, newRole : player2OriginalRole});
        expect(player2Spy).toHaveBeenCalledWith({message: OutMessages.TroublemakerSwitchedYourCard, newRole : player1OriginalRole});
        expect(player1.role).toBe(player2OriginalRole);
        expect(player2.role).toBe(player1OriginalRole);
    });
});
