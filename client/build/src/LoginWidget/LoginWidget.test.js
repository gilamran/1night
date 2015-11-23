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
        inject(function (_ioSocket_) {
            _this.ioSocket = _ioSocket_;
        });
        this.outerScope = testUtils.createScope({ onLogin: function () { } });
    }
    LoginWidgetDriver.prototype.init = function () {
        this.element = testUtils.compileComponent('<login-widget on-login="onLogin()"></login-widget>', this.outerScope);
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
    it('Should have a player name field', function () {
        expect(driver.getElement('login-player-name-input')).toBeDisplayed();
    });
    it('Should have a login button', function () {
        expect(driver.getElement('login-button')).toBeDisplayed();
        expect(driver.getElement('login-button').text()).toBe('Login');
    });
    it('Should send a LOGIN message when login button was clicked', function () {
        spyOn(driver.ioSocket, 'emit').and.callThrough();
        driver.getElement('login-player-name-input').val('PLAYER_NAME1').trigger('input');
        driver.getElement('login-button').click();
        expect(driver.ioSocket.emit).toHaveBeenCalledWith('PLAYER_LOGIN', 'PLAYER_NAME1');
    });
    it('Should respond to PLAYER_LOGIN_SUCCEED by calling the given callback', function (done) {
        var spy = spyOn(driver.outerScope, 'onLogin').and.callFake(function () {
            expect(spy).toHaveBeenCalled();
            done();
        });
        driver.getElement('login-player-name-input').val('PLAYER_NAME2').trigger('input');
        driver.getElement('login-button').click();
    });
});
