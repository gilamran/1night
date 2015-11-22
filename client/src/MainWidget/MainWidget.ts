module components {
    export class MainWidgetController {
        public onLogin() {
            console.log('onLogin');
        }
    }

    /* @ngInject */
    export function mainWidget() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/MainWidget/view.html',
            controller: MainWidgetController,
            controllerAs: 'mainVM',
            bindToController: true
        };
    }
}

angular
    .module('OneNightApp')
    .directive('mainWidget', components.mainWidget);
