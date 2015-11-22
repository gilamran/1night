var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainWidgetDriver = (function (_super) {
    __extends(MainWidgetDriver, _super);
    function MainWidgetDriver() {
        _super.call(this, 'OneNightApp');
    }
    MainWidgetDriver.prototype.init = function () {
        this.element = testUtils.compileComponent('<main-widget></main-widget>');
    };
    return MainWidgetDriver;
})(testUtils.BaseDriver);
describe('Component: mainWidget', function () {
    var driver;
    beforeEach(function () {
        angular.mock.module('OneNightApp');
        driver = new MainWidgetDriver();
        driver.init();
    });
    it('Should have a title field', function () {
        expect(driver.getElement('main-widget-title')).toBeDisplayed();
    });
    it('Should start with a login widget visible', function () {
        expect(driver.getElement('login-widget')).toBePresent();
    });
});
