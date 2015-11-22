var components;
(function (components) {
    var LoginWidgetController = (function () {
        function LoginWidgetController() {
        }
        LoginWidgetController.prototype.onLoginButtonClicked = function () {
            if (typeof this.onLogin === 'function') {
                this.onLogin();
            }
        };
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
            bindToController: true,
            scope: {
                onLogin: '&'
            }
        };
    }
    components.loginWidget = loginWidget;
})(components || (components = {}));
angular
    .module('OneNightApp')
    .directive('loginWidget', components.loginWidget);
