(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/scroll', ['exports'], factory) :
    (global = global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons['ionic-extensions'] = global.co.mmons['ionic-extensions'] || {}, global.co.mmons['ionic-extensions'].scroll = {})));
}(this, (function (exports) { 'use strict';

    function findParentImpl(element) {
        if (!element) {
            return;
        }
        if (element.scrollHeight >= element.clientHeight) {
            var overflowY = window.getComputedStyle(element).overflowY;
            if (overflowY !== "visible" && overflowY !== "hidden") {
                return element;
            }
        }
        if (element.assignedSlot) {
            var p = findParentImpl(element.assignedSlot.parentElement);
            if (p) {
                return p;
            }
        }
        return findParentImpl(element.parentElement);
    }
    function scrollIntoView(element, scrollBehavior) {
        var parent = findParentImpl(element);
        if (parent) {
            var top_1 = element.offsetTop;
            if (element.offsetParent) {
                var offsetParent = element.offsetParent;
                while (offsetParent !== parent && !!offsetParent) {
                    top_1 += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }
            }
            parent.scrollTo({ top: top_1, behavior: scrollBehavior });
            return;
        }
        element.scrollIntoView();
    }

    exports.scrollIntoView = scrollIntoView;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=scroll-module.umd.js.map
