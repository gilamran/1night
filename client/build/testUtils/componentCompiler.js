var testUtils;
(function (testUtils) {
    function createScope(values) {
        var scope = undefined;
        inject(function ($rootScope) {
            scope = $rootScope.$new();
            if (values) {
                angular.extend(scope, values);
            }
        });
        return scope;
    }
    testUtils.createScope = createScope;
    ;
    function compileComponent(element, outerScope) {
        var compiledElement = null;
        inject(function ($compile, $rootScope) {
            var scope = outerScope ? outerScope : $rootScope.$new();
            compiledElement = $compile(element)(scope);
            $rootScope.$apply();
        });
        return compiledElement;
    }
    testUtils.compileComponent = compileComponent;
})(testUtils || (testUtils = {}));
