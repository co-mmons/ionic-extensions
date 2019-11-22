export function findScrollParent(element) {
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
export function scrollIntoView(element, parent) {
    if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        if (!(rect.top > parentRect.top && rect.top <= parentRect.bottom && rect.bottom < parentRect.height)) {
            let top = element.offsetTop - 100;
            if (element.offsetParent) {
                let offsetParent = element.offsetParent;
                while (offsetParent !== parent && !!offsetParent) {
                    top += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }
            }
            parent.scrollTo({ top: top });
        }
        return;
    }
    element.scrollIntoView();
}
export function scrollToCaret(parent) {
    if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const rect = caretTopPoint();
        rect.top -= 100;
        if (!(rect.top > parentRect.top && rect.top <= parentRect.bottom)) {
            let top = rect.top - parentRect.top;
            parent.scrollTo({ top: top, behavior: "auto" });
        }
        return;
    }
}
export function caretTopPoint() {
    const selection = document.getSelection();
    const range0 = selection.getRangeAt(0);
    let rect;
    let range;
    // supposed to be textNode in most cases
    // but div[contenteditable] when empty
    const node = range0.startContainer;
    const offset = range0.startOffset;
    if (offset > 0) {
        // new range, don't influence DOM state
        range = document.createRange();
        range.setStart(node, (offset - 1));
        range.setEnd(node, offset);
        // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
        // IE9, Safari?(but look good in Safari 8)
        rect = range.getBoundingClientRect();
        return { left: rect["right"], top: rect.top };
    }
    else if (offset < node["length"]) {
        range = document.createRange();
        // similar but select next on letter
        range.setStart(node, offset);
        range.setEnd(node, (offset + 1));
        rect = range.getBoundingClientRect();
        return { left: rect.left, top: rect.top };
    }
    else {
        // textNode has length
        // https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
        rect = node.getBoundingClientRect();
        const styles = getComputedStyle(node);
        const lineHeight = parseInt(styles.lineHeight);
        const fontSize = parseInt(styles.fontSize);
        // roughly half the whitespace... but not exactly
        const delta = (lineHeight - fontSize) / 2;
        return { left: rect.left, top: (rect.top + delta) };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJzY3JvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE9BQW9CO0lBRWpELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDVixPQUFPO0tBQ1Y7SUFFRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtRQUM5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzdELElBQUksU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQ25ELE9BQU8sT0FBTyxDQUFDO1NBQ2xCO0tBQ0o7SUFFRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7UUFDdEIsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsRUFBRTtZQUNILE9BQU8sQ0FBQyxDQUFDO1NBQ1o7S0FDSjtJQUVELE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQW9CLEVBQUUsTUFBbUI7SUFFcEUsSUFBSSxNQUFNLEVBQUU7UUFFUixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcs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QyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQztLQUUzQztTQUFNO1FBQ0gsc0JBQXNCO1FBRXRCLGlGQUFpRjtRQUNqRixJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNDLGlEQUFpRDtRQUNqRCxNQUFNLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUMsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUMsQ0FBQztLQUNyRDtBQUVMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZmluZFNjcm9sbFBhcmVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcblxuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID49IGVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIGNvbnN0IG92ZXJmbG93WSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLm92ZXJmbG93WTtcbiAgICAgICAgaWYgKG92ZXJmbG93WSAhPT0gXCJ2aXNpYmxlXCIgJiYgb3ZlcmZsb3dZICE9PSBcImhpZGRlblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbGVtZW50LmFzc2lnbmVkU2xvdCkge1xuICAgICAgICBjb25zdCBwID0gZmluZFNjcm9sbFBhcmVudChlbGVtZW50LmFzc2lnbmVkU2xvdC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbmRTY3JvbGxQYXJlbnQoZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG5cbiAgICBpZiAocGFyZW50KSB7XG5cbiAgICAgICAgY29uc3QgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgaWYgKCEocmVjdC50b3AgPiBwYXJlbnRSZWN0LnRvcCAmJiByZWN0LnRvcCA8PSBwYXJlbnRSZWN0LmJvdHRvbSAmJiByZWN0LmJvdHRvbSA8IHBhcmVudFJlY3QuaGVpZ2h0KSkge1xuXG4gICAgICAgICAgICBsZXQgdG9wID0gZWxlbWVudC5vZmZzZXRUb3AgLSAxMDA7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQYXJlbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICE9PSBwYXJlbnQgJiYgISFvZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wICs9IG9mZnNldFBhcmVudC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJlbnQuc2Nyb2xsVG8oe3RvcDogdG9wfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsVG9DYXJldChwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XG5cbiAgICBpZiAocGFyZW50KSB7XG5cbiAgICAgICAgY29uc3QgcGFyZW50UmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgcmVjdCA9IGNhcmV0VG9wUG9pbnQoKTtcbiAgICAgICAgcmVjdC50b3AgLT0gMTAwO1xuXG4gICAgICAgIGlmICghKHJlY3QudG9wID4gcGFyZW50UmVjdC50b3AgJiYgcmVjdC50b3AgPD0gcGFyZW50UmVjdC5ib3R0b20pKSB7XG5cbiAgICAgICAgICAgIGxldCB0b3AgPSByZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wO1xuICAgICAgICAgICAgcGFyZW50LnNjcm9sbFRvKHt0b3A6IHRvcCwgYmVoYXZpb3I6IFwiYXV0b1wifSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJldFRvcFBvaW50KCk6IHtsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfSB7XG5cbiAgICBjb25zdCBzZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICBjb25zdCByYW5nZTAgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcblxuICAgIGxldCByZWN0OiB7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcn07XG4gICAgbGV0IHJhbmdlOiBSYW5nZTtcblxuICAgIC8vIHN1cHBvc2VkIHRvIGJlIHRleHROb2RlIGluIG1vc3QgY2FzZXNcbiAgICAvLyBidXQgZGl2W2NvbnRlbnRlZGl0YWJsZV0gd2hlbiBlbXB0eVxuICAgIGNvbnN0IG5vZGUgPSByYW5nZTAuc3RhcnRDb250YWluZXIgYXMgRWxlbWVudDtcblxuICAgIGNvbnN0IG9mZnNldCA9IHJhbmdlMC5zdGFydE9mZnNldDtcbiAgICBpZiAob2Zmc2V0ID4gMCkge1xuXG4gICAgICAgIC8vIG5ldyByYW5nZSwgZG9uJ3QgaW5mbHVlbmNlIERPTSBzdGF0ZVxuICAgICAgICByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KG5vZGUsIChvZmZzZXQgLSAxKSk7XG4gICAgICAgIHJhbmdlLnNldEVuZChub2RlLCBvZmZzZXQpO1xuXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9yYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAgICAgICAgLy8gSUU5LCBTYWZhcmk/KGJ1dCBsb29rIGdvb2QgaW4gU2FmYXJpIDgpXG4gICAgICAgIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge2xlZnQ6IHJlY3RbXCJyaWdodFwiXSwgdG9wOiByZWN0LnRvcH07XG5cbiAgICB9IGVsc2UgaWYgKG9mZnNldCA8IG5vZGVbXCJsZW5ndGhcIl0pIHtcblxuICAgICAgICByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIC8vIHNpbWlsYXIgYnV0IHNlbGVjdCBuZXh0IG9uIGxldHRlclxuICAgICAgICByYW5nZS5zZXRTdGFydChub2RlLCBvZmZzZXQpO1xuICAgICAgICByYW5nZS5zZXRFbmQobm9kZSwgKG9mZnNldCArIDEpKTtcbiAgICAgICAgcmVjdCA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7bGVmdDogcmVjdC5sZWZ0LCB0b3A6IHJlY3QudG9wfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRleHROb2RlIGhhcyBsZW5ndGhcblxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAgICAgICAgcmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgIGNvbnN0IGxpbmVIZWlnaHQgPSBwYXJzZUludChzdHlsZXMubGluZUhlaWdodCk7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gcGFyc2VJbnQoc3R5bGVzLmZvbnRTaXplKTtcblxuICAgICAgICAvLyByb3VnaGx5IGhhbGYgdGhlIHdoaXRlc3BhY2UuLi4gYnV0IG5vdCBleGFjdGx5XG4gICAgICAgIGNvbnN0IGRlbHRhID0gKGxpbmVIZWlnaHQgLSBmb250U2l6ZSkgLyAyO1xuXG4gICAgICAgIHJldHVybiB7bGVmdDogcmVjdC5sZWZ0LCB0b3A6IChyZWN0LnRvcCArIGRlbHRhKX07XG4gICAgfVxuXG59XG4iXX0=