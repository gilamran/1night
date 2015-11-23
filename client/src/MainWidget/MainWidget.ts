module components {
    export class MainWidgetController {
        constructor(private ioService:SocketIOClientStatic) {
            ioService.connect('http://localhost:9000');
        }

        public onLogin(username:string) {
            console.log('onLogin', username);
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
