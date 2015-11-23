var components;
(function (components) {
    var LoginWidgetController = (function () {
        function LoginWidgetController(ioSocket) {
            var _this = this;
            this.ioSocket = ioSocket;
            this.ioSocket.on('PLAYER_LOGIN_SUCCEED', function () { return _this.callOnLoginSuccess(); });
        }
        LoginWidgetController.prototype.callOnLoginSuccess = function () {
            if (typeof this.onLogin === 'function') {
                this.onLogin();
            }
        };
        LoginWidgetController.prototype.onLoginButtonClicked = function () {
            this.ioSocket.emit('PLAYER_LOGIN', this.playerName);
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
