module components {
    /**
     * @name loginVM
     * @type LoginWidgetController
     */
    export class LoginWidgetController {
        static CONTROLLER_AS : string = 'loginVM';

        public onLoginSucceed   : () => void;
        public playerName       : string;

        constructor(private messagesManager:services.MessagesManager) {
        }

        private callOnLoginSuccess() {
            if (typeof this.onLoginSucceed === 'function') {
                this.onLoginSucceed();
            }
        }

        public onLoginButtonClicked() {
            this.messagesManager.doLogin(this.playerName).then(() => this.callOnLoginSuccess());
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
