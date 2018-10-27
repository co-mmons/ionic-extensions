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
export function scrollIntoView(element, scrollBehavior) {
    var parent = findParentImpl(element);
    if (parent) {
        var top_1 = element.offsetTop;
        if (element.offsetParent) {
            var offsetParent = element.offsetParent;
            while (offsetParent != parent && !!offsetParent) {
                top_1 += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }
        }
        parent.scrollTo({ top: top_1, behavior: scrollBehavior });
        return;
    }
    element.scrollIntoView();
}
//# sourceMappingURL=scroll-into-view.js.map