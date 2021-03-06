class LoginWidgetDriver extends testUtils.BaseDriver {
    public outerScope:any;
    public ioSocket:SocketIOClient.Socket;

    constructor() {
        super('OneNightApp');
        inject((_ioSocket_:SocketIOClient.Socket) => {
            this.ioSocket = _ioSocket_;
        });
        this.outerScope = testUtils.createScope({ onLoginSucceed: () => {} });
    }

    public init():void {
        this.element = testUtils.compileComponent('<login-widget on-login-succeed="onLoginSucceed()"></login-widget>', this.outerScope);
    }
}

describe('Component: loginWidget', () => {
    const driver:LoginWidgetDriver;

    beforeEach(() => {
        angular.mock.module('OneNightApp');
        driver = new LoginWidgetDriver();
        driver.init();
    });

    it('Should have a player name field', () => {
        expect(driver.getElement('login-player-name-input')).to.eqDisplayed();
    });

    it('Should have a login button', () => {
        expect(driver.getElement('login-button')).to.eqDisplayed();
        expect(driver.getElement('login-button').text()).to.eq('Login');
    });

    it('Should send a LOGIN message when login button was clicked', () => {
        spyOn(driver.ioSocket, 'emit').and.callThrough();

        driver.getElement('login-player-name-input').val('PLAYER_NAME1').trigger('input');
        driver.getElement('login-button').click();
        expect(driver.ioSocket.emit).toHaveBeenCalledWith('PLAYER_LOGIN', 'PLAYER_NAME1');
    });

    it('Should respond to PLAYER_LOGIN_SUCCEED by calling the given callback', (done) => {
        const spy = spyOn(driver.outerScope, 'onLoginSucceed').and.callFake(() => {
            expect(spy).toHaveBeenCalled();
            done();
        });
        driver.getElement('login-player-name-input').val('PLAYER_NAME2').trigger('input');
        driver.getElement('login-button').click();
    });
});
