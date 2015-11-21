namespace testUtils {
    export function compileComponent(element:any):angular.IAugmentedJQuery {
        var compiledElement:angular.IAugmentedJQuery = null;
        inject(($compile:angular.ICompileService, $rootScope:angular.IRootScopeService) => {
            compiledElement = $compile(element)($rootScope.$new());
            $rootScope.$apply();
        });

        return compiledElement;
    }
}
