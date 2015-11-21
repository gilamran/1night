beforeEach(function () {
    var toBePresent = function (actual) {
        if (actual.length) {
            return { pass: true, message: "Expected " + actual + " to be on the DOM" };
        }
        else {
            return { pass: false, message: "Expected " + actual + " to be on the DOM, but it was not found" };
        }
    };
    var toBeDisplayed = function (actual) {
        var element = actual;
        var result = { pass: false };
        if (element.length) {
            result.pass = true;
            while (result.pass && element.length) {
                result.pass = !element.attr('class') || element.attr('class').indexOf('ng-hide') < 0;
                element = element.parent();
            }
            if (result.pass) {
                result.message = "Expected " + actual + " to be displayed";
            }
            else {
                result.message = "Expected " + actual + " to be displayed, but it is hidden";
            }
        }
        else {
            result.message = "toBeDisplayed was called with no matching elements";
        }
        return result;
    };
    jasmine.addMatchers({
        toBePresent: function () { return ({ compare: toBePresent }); },
        toBeDisplayed: function () { return ({ compare: toBeDisplayed }); }
    });
});
