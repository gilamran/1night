module services {
    export class MessagesManager {

        public
        constructor(private ioSocket:SocketIOClient.Socket, private $q:ng.IQService, private $rootScope:ng.IRootScopeService) {
        }

        public doLogin(playerName:string):ng.IPromise<void> {
            const deferred:ng.IDeferred<void> = this.$q.defer<void>();
            this.ioSocket.on('PLAYER_LOGIN_SUCCEED', () => {
                console.log('got PLAYER_LOGIN_SUCCEED');
                deferred.resolve();
                this.$rootScope.$apply();
            });
            this.ioSocket.emit('PLAYER_LOGIN', playerName);
            return deferred.promise;
        }
    }
}

angular
    .module('OneNightApp')
    .service('messagesManager', services.MessagesManager);
