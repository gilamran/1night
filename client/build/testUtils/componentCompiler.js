var testUtils;
(function (testUtils) {
    function compileComponent(element) {
        var compiledElement = null;
        inject(function ($compile, $rootScope) {
            compiledElement = $compile(element)($rootScope.$new());
            $rootScope.$apply();
        });
        return compiledElement;
    }
    testUtils.compileComponent = compileComponent;
})(testUtils || (testUtils = {}));
