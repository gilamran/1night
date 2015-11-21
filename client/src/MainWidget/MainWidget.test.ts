class MainWidgetDriver extends testUtils.BaseDriver {
    constructor() {
        super('OneNightApp', 'main-widget', 'mainVM');
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
        expect(driver.getElement('main-widget-title')).toBeDefined();
    });
});