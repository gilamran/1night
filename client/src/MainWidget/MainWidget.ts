module components {
    export class MainWidgetController {
        public value : string;

        constructor() {
            this.value = 'Value from the controller';
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
    .module('OneNight')
    .directive('mainWidget', components.mainWidget);
