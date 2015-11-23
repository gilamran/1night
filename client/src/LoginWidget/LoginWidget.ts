module components {
    /**
     * @name loginVM
     * @type LoginWidgetController
     */
    export class LoginWidgetController {
        static CONTROLLER_AS : string = 'loginVM';

        public onLoginSucceed   : () => void;
        public playerName       : string;

        constructor(private ioSocket:SocketIOClient.Socket, private $rootScope:ng.IRootScopeService) {
            this.ioSocket.on('PLAYER_LOGIN_SUCCEED', () => this.callOnLoginSuccess());
        }

        private callOnLoginSuccess() {
            if (typeof this.onLoginSucceed === 'function') {
                this.onLoginSucceed();
                this.$rootScope.$apply();
            }
        }

        public onLoginButtonClicked() {
            this.ioSocket.emit('PLAYER_LOGIN', this.playerName);
        }
    }

    /* @ngInject */
    export function loginWidget() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/LoginWidget/view.html',
            controller: LoginWidgetController,
            controllerAs: LoginWidgetController.CONTROLLER_AS,
            bindToController: true,
            scope: {
                onLoginSucceed : '&'
            }
        };
    }
}

angular
    .module('OneNightApp')
    .directive('loginWidget', components.loginWidget);
