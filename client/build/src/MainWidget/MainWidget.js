var components;
(function (components) {
    var MainWidgetController = (function () {
        function MainWidgetController() {
        }
        MainWidgetController.prototype.onLogin = function (username) {
            console.log('onLogin', username);
        };
        return MainWidgetController;
    })();
    components.MainWidgetController = MainWidgetController;
    function mainWidget() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/MainWidget/view.html',
            controller: MainWidgetController,
            controllerAs: 'mainVM',
            bindToController: true
        };
    }
    components.mainWidget = mainWidget;
})(components || (components = {}));
angular
    .module('OneNightApp')
    .directive('mainWidget', components.mainWidget);
