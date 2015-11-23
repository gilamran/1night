module components {
    export class LoginWidgetController {
        public onLogin  : Function;
        public userName  : string;

        public onLoginButtonClicked() {
            if (typeof this.onLogin === 'function') {
                this.onLogin({userName : this.userName});
            }
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
                onLogin : '&'
            }
        };
    }
}

angular
    .module('OneNightApp')
    .directive('loginWidget', components.loginWidget);
