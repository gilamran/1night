namespace testUtils {
    export class BaseDriver {
        protected element:angular.IAugmentedJQuery;

        constructor(moduleName:string) {
            angular.mock.module(moduleName);
        }

        public getElement(elementHook:string):angular.IAugmentedJQuery {
            return this.element.find(`[data-hook="${elementHook}"]`);
        }

        public getElementText(elementHook:string):string {
            return this.element.find(`[data-hook="${elementHook}"]`).text().trim();
        }
    }
}
