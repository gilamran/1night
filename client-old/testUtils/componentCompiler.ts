namespace testUtils {
    export function applyChanges() {
        inject(($rootScope:any) => $rootScope.$apply());
    }

    export function createScope(values?:any) {
        const scope:any = undefined;
        inject(($rootScope:any) => {
            scope = $rootScope.$new();
            if (values) {
                angular.extend(scope, values);
            }
        });
        return scope;
    };

    export function compileComponent(element:any, outerScope?:any):angular.IAugmentedJQuery {
        const compiledElement:angular.IAugmentedJQuery = null;
        inject(($compile:angular.ICompileService, $rootScope:angular.IRootScopeService) => {
            const scope:any = outerScope ? outerScope : $rootScope.$new();
            compiledElement = $compile(element)(scope);
            $rootScope.$apply();
        });

        return compiledElement;
    }
}
