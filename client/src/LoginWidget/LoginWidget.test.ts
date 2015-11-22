class LoginWidgetDriver extends testUtils.BaseDriver {
    public outerScope:any;

    constructor() {
        super('OneNightApp');
        this.outerScope = testUtils.createScope( {onLogin: jasmine.createSpy('onLogin')} );
    }

    public init():void {
        this.element = testUtils.compileComponent('<login-widget on-login="onLogin()"></login-widget>', this.outerScope);
    }
}

describe('Component: loginWidget', () => {
    var driver:LoginWidgetDriver;

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

    it('Should call the given callback when then login button was clicked', () => {
        driver.getElement('login-button').click();
        expect(driver.outerScope.onLogin).toHaveBeenCalled();
    });
});
