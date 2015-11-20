var components;
(function (components) {
    var MainWidgetController = (function () {
        function MainWidgetController() {
            this.value = 'Value from the controller';
        }
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
    .module('OneNight')
    .directive('mainWidget', components.mainWidget);
