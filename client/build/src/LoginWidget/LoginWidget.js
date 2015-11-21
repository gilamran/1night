var components;
(function (components) {
    var LoginWidgetController = (function () {
        function LoginWidgetController() {
        }
        return LoginWidgetController;
    })();
    components.LoginWidgetController = LoginWidgetController;
    function loginWidget() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/LoginWidget/view.html',
            controller: LoginWidgetController,
            controllerAs: 'loginVM',
            bindToController: true
        };
    }
    components.loginWidget = loginWidget;
})(components || (components = {}));
angular
    .module('OneNightApp')
    .directive('loginWidget', components.loginWidget);
