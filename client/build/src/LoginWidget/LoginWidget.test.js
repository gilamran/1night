var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginWidgetDriver = (function (_super) {
    __extends(LoginWidgetDriver, _super);
    function LoginWidgetDriver() {
        var _this = this;
        _super.call(this, 'OneNightApp');
        this.outerScope = testUtils.createScope({ onLogin: jasmine.createSpy('onLogin') });
        inject(function (_$http_) {
            _this.$http = _$http_;
        });
    }
    LoginWidgetDriver.prototype.init = function () {
        this.element = testUtils.compileComponent('<login-widget on-login="onLogin(userName)"></login-widget>', this.outerScope);
    };
    return LoginWidgetDriver;
})(testUtils.BaseDriver);
describe('Component: loginWidget', function () {
    var driver;
    beforeEach(function () {
        angular.mock.module('OneNightApp');
        driver = new LoginWidgetDriver();
        driver.init();
    });
    it('Should have a username field', function () {
        expect(driver.getElement('login-username-input')).toBeDisplayed();
    });
    it('Should have a login button', function () {
        expect(driver.getElement('login-button')).toBeDisplayed();
        expect(driver.getElement('login-button').text()).toBe('Login');
    });
    xit('Should call $http when the login button was clicked', function () {
        driver.getElement('login-button').click();
        expect(driver.$http.get).toHaveBeenCalledWith("http://localhost:8080//api/playerLogin");
    });
});
