function findParentImpl(element: HTMLElement): HTMLElement {

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

export function scrollIntoView(element: HTMLElement, scrollBehavior?: ScrollBehavior) {
    let parent = findParentImpl(element);

    if (parent) {

        let top = element.offsetTop;

        if (element.offsetParent) {
            let offsetParent = element.offsetParent as HTMLElement;
            while (offsetParent != parent && !!offsetParent) {
                top += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent as HTMLElement;
            }
        }

        parent.scrollTo({top: top, behavior: scrollBehavior});
        return;
    }

    element.scrollIntoView();
}