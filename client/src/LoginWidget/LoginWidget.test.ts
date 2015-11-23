class LoginWidgetDriver extends testUtils.BaseDriver {
    public outerScope:any;
    public $http:ng.IHttpService;

    constructor() {
        super('OneNightApp');
        this.outerScope = testUtils.createScope( {onLogin: jasmine.createSpy('onLogin')} );
        inject((_$http_:ng.IHttpService) => {
            this.$http = _$http_;
        });
    }

    public init():void {
        this.element = testUtils.compileComponent('<login-widget on-login="onLogin(userName)"></login-widget>', this.outerScope);
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

    xit('Should call $http when the login button was clicked', () => {
        driver.getElement('login-button').click();
        expect(driver.$http.get).toHaveBeenCalledWith(`http://localhost:8080//api/playerLogin`);
    });
    //
    //it('Should call the given callback when then login button was clicked', () => {
    //    driver.getElement('login-username-input').val('USER_NAME').trigger('input');
    //    driver.getElement('login-button').click();
    //    expect(driver.outerScope.onLogin).toHaveBeenCalledWith('USER_NAME');
    //});
});
