var Game_1 = require('../src/Game');
var Game_2 = require('../src/Game');
var GameBuilder = require('./GameDriver');
describe('Game', function () {
    var game;
    var dealer;
    beforeEach(function () {
        game = GameBuilder.SimpleGame();
        dealer = game.dealer;
    });
    it('should get 3 players after the setup', function () {
        expect(game.players.length).toBe(3);
    });
    it('should have 3 more cards than the number of players', function () {
        expect(game.cards.length).toBe(game.players.length + 3);
    });
    it('should start with 2 Warewolfs, Seer, Robber, Troublemaker, and a Villager in the cards', function () {
        expect(game.cards[0]).toBe(Game_1.Roles.Warewolf);
        expect(game.cards[1]).toBe(Game_1.Roles.Warewolf);
        expect(game.cards[2]).toBe(Game_1.Roles.Seer);
        expect(game.cards[3]).toBe(Game_1.Roles.Robber);
        expect(game.cards[4]).toBe(Game_1.Roles.Troublemaker);
        expect(game.cards[5]).toBe(Game_1.Roles.Villager);
    });
    it('should "inform" players about their role', function () {
        dealer.dealCards(game.cards, game.players, game.table);
        var warewolf1Spy = spyOn(game.wareWolfs[0], 'sendMessage');
        var warewolf2Spy = spyOn(game.wareWolfs[1], 'sendMessage');
        var seerSpy = spyOn(game.seer, 'sendMessage');
        game.tellPlayersTheirRoles();
        expect(warewolf1Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AssignedRole, role: Game_1.Roles.Warewolf });
        expect(warewolf2Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AssignedRole, role: Game_1.Roles.Warewolf });
        expect(seerSpy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AssignedRole, role: Game_1.Roles.Seer });
    });
    it('should "inform" warewolfs about each other', function () {
        dealer.dealCards(game.cards, game.players, game.table);
        var spy1 = spyOn(game.wareWolfs[0], 'sendMessage');
        var spy2 = spyOn(game.wareWolfs[1], 'sendMessage');
        game.playRole(Game_1.Roles.Warewolf);
        expect(spy1).toHaveBeenCalledWith({ message: Game_2.OutMessages.RevealOtherWarewolf, playerId: game.wareWolfs[1].id });
        expect(spy2).toHaveBeenCalledWith({ message: Game_2.OutMessages.RevealOtherWarewolf, playerId: game.wareWolfs[0].id });
    });
    it('should "inform" sole warewolf that he/she is alone', function () {
        var tmpGame = GameBuilder.SoleWareWolfGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);
        var spy = spyOn(tmpGame.wareWolfs[0], 'sendMessage');
        tmpGame.playRole(Game_1.Roles.Warewolf);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskWarewolfToChooseACard });
    });
    it('should not "inform" anyone anything, if there are no warewolfs', function () {
        var tmpGame = GameBuilder.NoWareWolfGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);
        var spys = [];
        tmpGame.players.forEach(function (player) { return spys.push(spyOn(player, 'sendMessage')); });
        tmpGame.playRole(Game_1.Roles.Warewolf);
        spys.forEach(function (spy) { return expect(spy).not.toHaveBeenCalled(); });
    });
    it('after there is a response from the sole warewolf, show him/her the card', function () {
        var tmpGame = GameBuilder.SoleWareWolfGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);
        var warewolf = tmpGame.wareWolfs[0];
        var spy = spyOn(warewolf, 'sendMessage');
        game.gotMessage(warewolf, { message: Game_2.InMessages.WarewolfWantsToSeeATableCard, card: 0 });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardToWarewolf, card: game.table.cards[0] });
        game.gotMessage(warewolf, { message: Game_2.InMessages.WarewolfWantsToSeeATableCard, card: 1 });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardToWarewolf, card: game.table.cards[1] });
        game.gotMessage(warewolf, { message: Game_2.InMessages.WarewolfWantsToSeeATableCard, card: 2 });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardToWarewolf, card: game.table.cards[2] });
    });
    it('should ask seer which card he/she wants to see', function () {
        dealer.dealCards(game.cards, game.players, game.table);
        var spy = spyOn(game.seer, 'sendMessage');
        game.playRole(Game_1.Roles.Seer);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskSeerToChooseCards });
    });
    it('after there is a response from the seer, show him/her the cards', function () {
        dealer.dealCards(game.cards, game.players, game.table);
        var seer = game.seer;
        var spy = spyOn(seer, 'sendMessage');
        game.gotMessage(seer, { message: Game_2.InMessages.SeerWantsToSeeTableCards, cards: [0, 1] });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardsToSeer, cards: [game.table.cards[0], game.table.cards[1]] });
        game.gotMessage(seer, { message: Game_2.InMessages.SeerWantsToSeeTableCards, cards: [1, 2] });
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.ShowCardsToSeer, cards: [game.table.cards[1], game.table.cards[2]] });
    });
    it('should ask the robber which player he/she wants to robe', function () {
        var tmpGame = GameBuilder.RobberGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);
        var spy = spyOn(tmpGame.robber, 'sendMessage');
        tmpGame.playRole(Game_1.Roles.Robber);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskRobberToChooseAPlayer });
    });
    it('after there is a response from the robber, show him/her his/her new role', function () {
        var tmpGame = GameBuilder.RobberGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);
        var robber = game.robber;
        var robberOriginalRole = robber.role;
        var robberSpy = spyOn(robber, 'sendMessage');
        var player = game.players[1];
        var playerOriginalRole = player.role;
        var playerSpy = spyOn(player, 'sendMessage');
        game.gotMessage(robber, { message: Game_2.InMessages.RobberWantsToRobeAPlayer, playerId: player.id });
        expect(robberSpy).toHaveBeenCalledWith({ message: Game_2.OutMessages.GiveRobberHisNewRole, newRole: playerOriginalRole });
        expect(playerSpy).toHaveBeenCalledWith({ message: Game_2.OutMessages.RobberTookYourRole, newRole: robberOriginalRole });
        expect(robber.role).toBe(playerOriginalRole);
    });
    it('should ask the troublemaker which players he/she wants to switch', function () {
        var tmpGame = GameBuilder.TroublemakerGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);
        var spy = spyOn(tmpGame.troublemaker, 'sendMessage');
        tmpGame.playRole(Game_1.Roles.Troublemaker);
        expect(spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.AskTroublemakerToChoosePlayers });
    });
    it('after there is a response from the troublemaker, switch the cards, and let players know', function () {
        var tmpGame = GameBuilder.TroublemakerGame();
        dealer.dealCards(tmpGame.cards, tmpGame.players, tmpGame.table);
        var troublemaker = tmpGame.troublemaker;
        var player1 = tmpGame.players[1];
        var player2 = tmpGame.players[2];
        var player1OriginalRole = player1.role;
        var player2OriginalRole = player2.role;
        var player1Spy = spyOn(player1, 'sendMessage');
        var player2Spy = spyOn(player2, 'sendMessage');
        tmpGame.gotMessage(troublemaker, { message: Game_2.InMessages.TroublemakerSwitchedPlayersCards, playersIds: [player1.id, player2.id] });
        expect(player1Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.TroublemakerSwitchedYourCard, newRole: player2OriginalRole });
        expect(player2Spy).toHaveBeenCalledWith({ message: Game_2.OutMessages.TroublemakerSwitchedYourCard, newRole: player1OriginalRole });
        expect(player1.role).toBe(player2OriginalRole);
        expect(player2.role).toBe(player1OriginalRole);
    });
});
