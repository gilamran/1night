var testUtils;
(function (testUtils) {
    var BaseDriver = (function () {
        function BaseDriver(moduleName) {
            angular.mock.module(moduleName);
        }
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
