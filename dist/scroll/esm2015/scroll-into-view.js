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
export function scrollIntoView(element, scrollBehavior) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3Njcm9sbC8iLCJzb3VyY2VzIjpbInNjcm9sbC1pbnRvLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxjQUFjLENBQUMsT0FBb0I7SUFFeEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLE9BQU87S0FDVjtJQUVELElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1FBQzlDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDN0QsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDbkQsT0FBTyxPQUFPLENBQUM7U0FDbEI7S0FDSjtJQUVELElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtRQUN0QixJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsRUFBRTtZQUNILE9BQU8sQ0FBQyxDQUFDO1NBQ1o7S0FDSjtJQUVELE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUFvQixFQUFFLGNBQStCO0lBQ2hGLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQyxJQUFJLE1BQU0sRUFBRTtRQUVSLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFFNUIsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUEyQixDQUFDO1lBQ3ZELE9BQU8sWUFBWSxLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFO2dCQUM5QyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQztnQkFDOUIsWUFBWSxHQUFHLFlBQVksQ0FBQyxZQUEyQixDQUFDO2FBQzNEO1NBQ0o7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPO0tBQ1Y7SUFFRCxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZpbmRQYXJlbnRJbXBsKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuXG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgPj0gZWxlbWVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3dZID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkub3ZlcmZsb3dZO1xuICAgICAgICBpZiAob3ZlcmZsb3dZICE9PSBcInZpc2libGVcIiAmJiBvdmVyZmxvd1kgIT09IFwiaGlkZGVuXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQuYXNzaWduZWRTbG90KSB7XG4gICAgICAgIGxldCBwID0gZmluZFBhcmVudEltcGwoZWxlbWVudC5hc3NpZ25lZFNsb3QucGFyZW50RWxlbWVudCk7XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaW5kUGFyZW50SW1wbChlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsSW50b1ZpZXcoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjcm9sbEJlaGF2aW9yPzogU2Nyb2xsQmVoYXZpb3IpIHtcbiAgICBsZXQgcGFyZW50ID0gZmluZFBhcmVudEltcGwoZWxlbWVudCk7XG5cbiAgICBpZiAocGFyZW50KSB7XG5cbiAgICAgICAgbGV0IHRvcCA9IGVsZW1lbnQub2Zmc2V0VG9wO1xuXG4gICAgICAgIGlmIChlbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgbGV0IG9mZnNldFBhcmVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKG9mZnNldFBhcmVudCAhPT0gcGFyZW50ICYmICEhb2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdG9wICs9IG9mZnNldFBhcmVudC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudC5zY3JvbGxUbyh7dG9wOiB0b3AsIGJlaGF2aW9yOiBzY3JvbGxCZWhhdmlvcn0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldygpO1xufVxuIl19