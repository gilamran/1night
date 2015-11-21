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

    it('Should have a title field', () => {
        expect(driver.getElement('login-widget-title')).toBeDisplayed();
    });
});
