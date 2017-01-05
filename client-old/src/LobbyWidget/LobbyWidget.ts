module components {
    /**
     * @name lobbyVM
     * @type LobbyWidgetController
     */
    export class LobbyWidgetController {
        static CONTROLLER_AS : string = 'lobbyVM';
        constructor() {
        }
    }
    /* @ngInject */
    export function lobbyWidget() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/LobbyWidget/view.html',
            controller: LobbyWidgetController,
            controllerAs: LobbyWidgetController.CONTROLLER_AS,
            bindToController: true
        };
    }
}

angular
    .module('OneNightApp')
    .directive('lobbyWidget', components.lobbyWidget);
