class LobbyWidgetDriver extends testUtils.BaseDriver {

    constructor() {
        super('OneNightApp');
    }

    public init():void {
        this.element = testUtils.compileComponent('<lobby-widget></lobby-widget>');
    }
}

describe('Component: lobbyWidget', () => {
    var driver : LobbyWidgetDriver;

    beforeEach(() => {
        angular.mock.module('OneNightApp');
        driver = new LobbyWidgetDriver();
        driver.init();
    });

    it('Should have a title field', () => {
        expect(driver.getElement('lobby-widget-title')).toBeDisplayed();
    });
});
