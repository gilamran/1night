class LoginWidgetDriver extends testUtils.BaseDriver {
    constructor() {
        super('OneNightApp', 'login-widget', 'loginVM');
    }
}

describe('Component: loginWidget', () => {
    var driver : LoginWidgetDriver;

    beforeEach(() => {
        angular.mock.module('OneNightApp');
        driver = new LoginWidgetDriver();
        driver.init();
    });

    it('Should have a username field', () => {
        expect(driver.getElement('login-username-input')).toBeDisplayed();
    });

    it('Should have a login button', () => {
        expect(driver.getElement('login-button')).toBeDisplayed();
        expect(driver.getElement('login-button').text()).toBe('Login');
    });
});
