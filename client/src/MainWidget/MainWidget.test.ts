class MainWidgetDriver extends testUtils.BaseDriver {
    private controller:components.MainWidgetController;
    private driver:MainWidgetDriver;

    constructor() {
        super('OneNightApp');
        this.driver = this;
    }

    public init():void {
        this.element = testUtils.compileComponent('<main-widget></main-widget>');
        this.controller = this.element.scope()[components.MainWidgetController.CONTROLLER_AS];
    }

    public when = {
        afterLogin: () => {
            this.driver.controller.onLoginSucceed();
            testUtils.applyChanges();
            return this.driver;
        }
    };
}

describe('Component: mainWidget', () => {
    var driver:MainWidgetDriver;

    beforeEach(() => {
        angular.mock.module('OneNightApp');
        driver = new MainWidgetDriver();
        driver.init();
    });

    it('Should have a title field', () => {
        expect(driver.getElement('main-widget-title')).toBeDisplayed();
    });

    it('Should start with a login widget visible and the lobby widget invisible', () => {
        expect(driver.getElement('login-widget')).toBePresent();
        expect(driver.getElement('lobby-widget')).not.toBePresent();
    });

    it('Should toggle the visibility of the login and the lobby after login was succeeded', () => {
        driver.when.afterLogin();
        expect(driver.getElement('login-widget')).not.toBePresent();
        expect(driver.getElement('lobby-widget')).toBePresent();
    });
});
