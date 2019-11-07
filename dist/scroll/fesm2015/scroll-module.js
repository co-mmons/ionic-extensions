function findParentImpl(element) {
    if (!element) {
        return;
    }
    if (element.scrollHeight >= element.clientHeight) {
        const overflowY = window.getComputedStyle(element).overflowY;
        if (overflowY !== "visible" && overflowY !== "hidden") {
            return element;
        }
    }
    if (element.assignedSlot) {
        let p = findParentImpl(element.assignedSlot.parentElement);
        if (p) {
            return p;
        }
    }
    return findParentImpl(element.parentElement);
}
function scrollIntoView(element, scrollBehavior) {
    let parent = findParentImpl(element);
    if (parent) {
        let top = element.offsetTop;
        if (element.offsetParent) {
            let offsetParent = element.offsetParent;
            while (offsetParent !== parent && !!offsetParent) {
                top += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }
        }
        parent.scrollTo({ top: top, behavior: scrollBehavior });
        return;
    }
    element.scrollIntoView();
}

/**
 * Generated bundle index. Do not edit.
 */

export { scrollIntoView };
//# sourceMappingURL=scroll-module.js.map
