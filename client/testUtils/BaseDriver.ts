namespace testUtils {
    export class BaseDriver {
        public controller:any;
        private element:angular.IAugmentedJQuery;

        constructor(moduleName:string, private componentName:string, private controllerAsName:string) {
            angular.mock.module(moduleName);
        }

        public init():void {
            inject(() => {
                this.element = compileComponent(`<${this.componentName}>`);
                this.controller = this.element.scope()[this.controllerAsName];
            });
        }

        public getElement(elementHook:string):angular.IAugmentedJQuery {
            return this.element.find(`[data-hook="${elementHook}"]`);
        }

        public getElementText(elementHook:string):string {
            return this.element.find(`[data-hook="${elementHook}"]`).text().trim();
        }
    }
}
