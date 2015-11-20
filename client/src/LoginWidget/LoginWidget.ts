module components {
    export class LoginWidgetController {
    }

    /* @ngInject */
    export function loginWidget() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/LoginWidget/view.html',
            controller: LoginWidgetController,
            controllerAs: 'loginVM',
            bindToController: true
        };
    }
}

angular
    .module('OneNightApp')
    .directive('loginWidget', components.loginWidget);
