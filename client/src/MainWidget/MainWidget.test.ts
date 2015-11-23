class MainWidgetDriver extends testUtils.BaseDriver {

    constructor() {
        super('OneNightApp');
    }

    public init():void {
        this.element = testUtils.compileComponent('<main-widget></main-widget>');
    }
}

describe('Component: mainWidget', () => {
    var driver : MainWidgetDriver;

    beforeEach(() => {
        angular.mock.module('OneNightApp');
        driver = new MainWidgetDriver();
        driver.init();
    });

    it('Should have a title field', () => {
        expect(driver.getElement('main-widget-title')).toBeDisplayed();
    });

    it('Should start with a login widget visible', () => {
        expect(driver.getElement('login-widget')).toBePresent();
    });
});
