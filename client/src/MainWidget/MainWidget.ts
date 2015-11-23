module components {
    /**
     * @name mainVM
     * @type MainWidgetController
     */
    export class MainWidgetController {
        constructor() {
        }

        public onLoginSucceed() {
            console.log('onLoginSucceed');
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
