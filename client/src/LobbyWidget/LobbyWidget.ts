module components {
    /**
     * @name lobbyVM
     * @type LobbyWidgetController
     */
    export class LobbyWidgetController {
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
            controllerAs: 'lobbyVM',
            bindToController: true
        };
    }
}

angular
    .module('OneNightApp')
    .directive('lobbyWidget', components.lobbyWidget);
