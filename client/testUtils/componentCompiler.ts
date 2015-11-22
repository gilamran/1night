namespace testUtils {
    export function createScope(values?:any) {
        var scope : any = undefined;
        inject(($rootScope:any) => {
            scope = $rootScope.$new();
            if (values) {
                angular.extend(scope, values);
            }
        });
        return scope;
    };

    export function compileComponent(element:any, outerScope?:any):angular.IAugmentedJQuery {
        var compiledElement:angular.IAugmentedJQuery = null;
        inject(($compile:angular.ICompileService, $rootScope:angular.IRootScopeService) => {
            var scope:any = outerScope ? outerScope : $rootScope.$new();
            compiledElement = $compile(element)(scope);
            $rootScope.$apply();
        });

        return compiledElement;
    }
}
