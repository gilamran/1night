declare module jasmine {
    interface Matchers {
        toBePresent(): boolean;
        toBeDisplayed(): boolean;
    }
}

beforeEach(function () {
    const toBePresent = function (actual:any):jasmine.CustomMatcherResult {
        if (actual.length) {
            return { pass:true, message: `Expected ${actual} to be on the DOM`};
        } else {
            return { pass:false, message: `Expected ${actual} to be on the DOM, but it was not found`};
        }
    };

    const toBeDisplayed = function (actual:any):jasmine.CustomMatcherResult {
        const element = actual;
        const result:jasmine.CustomMatcherResult = {pass: false};

        // check if present
        if (element.length) {
            // check ng-hide class
            result.pass = true;
            while (result.pass && element.length) {
                result.pass = !element.attr('class') || element.attr('class').indexOf('ng-hide') < 0;
                element = element.parent();
            }

            if (result.pass) {
                result.message = `Expected ${actual} to be displayed`;
            } else {
                result.message = `Expected ${actual} to be displayed, but it is hidden`;
            }
        } else {
            result.message = `toBeDisplayed was called with no matching elements`;
        }

        return result;
    };

    jasmine.addMatchers({
        toBePresent:   () => ({compare: toBePresent}),
        toBeDisplayed: () => ({compare: toBeDisplayed})
    });
});
