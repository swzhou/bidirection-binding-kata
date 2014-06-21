(function ($, _, window) {
    'use strict';
    var god = {}, bindingMap = {};

    var trigger = function (modelName) {
        _.each(bindingMap[modelName], function (element) {
            var tagName = element.prop("tagName");
            if (tagName === "INPUT") {
                element.val(god[modelName]);
            } else {
                element.html(god[modelName]);
            }
        });
    };

    god.set = function (modelName, value) {
        god[modelName] = value;
        if (!!bindingMap[modelName]) {
            trigger(modelName);
        }
    };

    god.get = function (modelName) {
        return god[modelName];
    };

    var addWatcher = function (modelName, element) {
        if (!bindingMap[modelName]) {
            bindingMap[modelName] = [];
        }
        bindingMap[modelName].push(element);
    };

    var bindEvent = function (modelName, element) {
        element.on("input", function () {
            god.set(modelName, element.val());
        });
    };

    $(document).ready(function () {
        $("[bi-bind]").each(function () {
            var modelName = $(this).attr("bi-bind");
            addWatcher(modelName, $(this));
            if ($(this).prop("tagName") === "INPUT") {
                bindEvent(modelName, $(this));
            }
        });
    });
    window.god = god;
})(jQuery, _, window);