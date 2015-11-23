module components {
    /**
     * @name loginVM
     * @type LoginWidgetController
     */
    export class LoginWidgetController {
        public onLoginSucceed   : () => void;
        public playerName       : string;

        constructor(private ioSocket:SocketIOClient.Socket) {
            this.ioSocket.on('PLAYER_LOGIN_SUCCEED', () => this.callOnLoginSuccess());
        }

        private callOnLoginSuccess() {
            if (typeof this.onLoginSucceed === 'function') {
                this.onLoginSucceed();
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
            controllerAs: 'loginVM',
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
