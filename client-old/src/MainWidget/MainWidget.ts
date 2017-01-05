module components {
    /**
     * @name mainVM
     * @type MainWidgetController
     */
    export class MainWidgetController {
        static CONTROLLER_AS : string = 'mainVM';

        public logged : boolean;
        constructor() {
            this.logged = false;
        }

        public onLoginSucceed() {
            this.logged = true;
        }
    }
    /* @ngInject */
    export function mainWidget() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/MainWidget/view.html',
            controller: MainWidgetController,
            controllerAs: MainWidgetController.CONTROLLER_AS,
            bindToController: true
        };
    }
}

angular
    .module('OneNightApp')
    .directive('mainWidget', components.mainWidget);
