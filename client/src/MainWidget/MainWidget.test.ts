class MainWidgetDriver extends testUtils.BaseDriver {
    public ioService : SocketIOClientStatic;

    constructor() {
        super('OneNightApp');
        inject((_ioService_:SocketIOClientStatic) => {
            this.ioService = _ioService_;
            spyOn(this.ioService, 'connect').and.callThrough();
        });
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

    it('Should init a connection to the server', () => {
        expect(driver.ioService.connect).toHaveBeenCalledWith('http://localhost:9000');
    });
});
