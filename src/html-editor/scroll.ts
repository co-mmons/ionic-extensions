export function findScrollParent(element: HTMLElement): HTMLElement {

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
        const p = findScrollParent(element.assignedSlot.parentElement);
        if (p) {
            return p;
        }
    }

    return findScrollParent(element.parentElement);
}

export function scrollIntoView(element: HTMLElement, scrollBehavior?: ScrollBehavior, parent?: HTMLElement) {

    if (!parent) {
        parent = findScrollParent(element);
    }

    if (parent) {

        const parentRect = parent.getBoundingClientRect();
        const rect = element.getBoundingClientRect();

        if (!(rect.top > parentRect.top && rect.top <= parentRect.bottom && rect.bottom < parentRect.height)) {

            let top = element.offsetTop;

            if (element.offsetParent) {
                let offsetParent = element.offsetParent as HTMLElement;
                while (offsetParent !== parent && !!offsetParent) {
                    top += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent as HTMLElement;
                }
            }

            parent.scrollTo({top: top, behavior: scrollBehavior});
        }

        return;
    }

    element.scrollIntoView();
}
