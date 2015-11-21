var testUtils;
(function (testUtils) {
    var BaseDriver = (function () {
        function BaseDriver(moduleName, componentName, controllerAsName) {
            this.componentName = componentName;
            this.controllerAsName = controllerAsName;
            angular.mock.module(moduleName);
        }
        BaseDriver.prototype.init = function () {
            var _this = this;
            inject(function () {
                _this.element = testUtils.compileComponent("<" + _this.componentName + ">");
                _this.controller = _this.element.scope()[_this.controllerAsName];
            });
        };
        BaseDriver.prototype.getElement = function (elementHook) {
            return this.element.find("[data-hook=\"" + elementHook + "\"]");
        };
        BaseDriver.prototype.getElementText = function (elementHook) {
            return this.element.find("[data-hook=\"" + elementHook + "\"]").text().trim();
        };
        return BaseDriver;
    })();
    testUtils.BaseDriver = BaseDriver;
})(testUtils || (testUtils = {}));
