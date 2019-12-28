import { __values } from "tslib";
import { NodeSelection } from "prosemirror-state";
export function isActive(state, nodeType, attrs, marks) {
    var selection = state.selection;
    if (selection instanceof NodeSelection && selection.node) {
        return selection.node.hasMarkup(nodeType, attrs, marks);
    }
    return selection.to <= selection.$from.end() && selection.$from.parent.hasMarkup(nodeType, attrs, marks);
}
export function isMarkActive(state, type) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    if (empty) {
        return !!(type.isInSet(state.storedMarks || $from.marks()));
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
}
export function anyMarkActive(state, types) {
    var e_1, _a, e_2, _b;
    var _c = state.selection, from = _c.from, $from = _c.$from, to = _c.to, empty = _c.empty;
    if (empty) {
        try {
            for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                var type = types_1_1.value;
                if (type.isInSet(state.storedMarks || $from.marks())) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (types_1_1 && !types_1_1.done && (_a = types_1.return)) _a.call(types_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        try {
            for (var types_2 = __values(types), types_2_1 = types_2.next(); !types_2_1.done; types_2_1 = types_2.next()) {
                var type = types_2_1.value;
                if (state.doc.rangeHasMark(from, to, type)) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (types_2_1 && !types_2_1.done && (_b = types_2.return)) _b.call(types_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJwcm9zZW1pcnJvci9pcy1hY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBYyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUU3RCxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQWtCLEVBQUUsUUFBa0IsRUFBRSxLQUE0QixFQUFFLEtBQXdCO0lBRW5ILElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFFbEMsSUFBSSxTQUFTLFlBQVksYUFBYSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7UUFDdEQsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzNEO0lBRUQsT0FBTyxTQUFTLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0csQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBa0IsRUFBRSxJQUFjO0lBQ3JELElBQUEsb0JBQTBDLEVBQXpDLGNBQUksRUFBRSxnQkFBSyxFQUFFLFVBQUUsRUFBRSxnQkFBd0IsQ0FBQztJQUVqRCxJQUFJLEtBQUssRUFBRTtRQUNQLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7U0FBTTtRQUNILE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqRDtBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQWtCLEVBQUUsS0FBaUI7O0lBRXpELElBQUEsb0JBQTBDLEVBQXpDLGNBQUksRUFBRSxnQkFBSyxFQUFFLFVBQUUsRUFBRSxnQkFBd0IsQ0FBQztJQUVqRCxJQUFJLEtBQUssRUFBRTs7WUFFUCxLQUFtQixJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7Z0JBQXJCLElBQU0sSUFBSSxrQkFBQTtnQkFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtvQkFDbEQsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjs7Ozs7Ozs7O0tBRUo7U0FBTTs7WUFFSCxLQUFtQixJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7Z0JBQXJCLElBQU0sSUFBSSxrQkFBQTtnQkFDWCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ3hDLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7Ozs7Ozs7OztLQUVKO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFyaywgTWFya1R5cGUsIE5vZGVUeXBlfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcbmltcG9ydCB7RWRpdG9yU3RhdGUsIE5vZGVTZWxlY3Rpb259IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBY3RpdmUoc3RhdGU6IEVkaXRvclN0YXRlLCBub2RlVHlwZTogTm9kZVR5cGUsIGF0dHJzPzoge1trZXk6IHN0cmluZ106IGFueX0sIG1hcmtzPzogQXJyYXk8TWFyazxhbnk+Pikge1xuXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgaWYgKHNlbGVjdGlvbiBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24gJiYgc2VsZWN0aW9uLm5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5ub2RlLmhhc01hcmt1cChub2RlVHlwZSwgYXR0cnMsIG1hcmtzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uLnRvIDw9IHNlbGVjdGlvbi4kZnJvbS5lbmQoKSAmJiBzZWxlY3Rpb24uJGZyb20ucGFyZW50Lmhhc01hcmt1cChub2RlVHlwZSwgYXR0cnMsIG1hcmtzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWFya0FjdGl2ZShzdGF0ZTogRWRpdG9yU3RhdGUsIHR5cGU6IE1hcmtUeXBlKSB7XG4gICAgY29uc3Qge2Zyb20sICRmcm9tLCB0bywgZW1wdHl9ID0gc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgaWYgKGVtcHR5KSB7XG4gICAgICAgIHJldHVybiAhISh0eXBlLmlzSW5TZXQoc3RhdGUuc3RvcmVkTWFya3MgfHwgJGZyb20ubWFya3MoKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kb2MucmFuZ2VIYXNNYXJrKGZyb20sIHRvLCB0eXBlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbnlNYXJrQWN0aXZlKHN0YXRlOiBFZGl0b3JTdGF0ZSwgdHlwZXM6IE1hcmtUeXBlW10pIHtcblxuICAgIGNvbnN0IHtmcm9tLCAkZnJvbSwgdG8sIGVtcHR5fSA9IHN0YXRlLnNlbGVjdGlvbjtcblxuICAgIGlmIChlbXB0eSkge1xuXG4gICAgICAgIGZvciAoY29uc3QgdHlwZSBvZiB0eXBlcykge1xuICAgICAgICAgICAgaWYgKHR5cGUuaXNJblNldChzdGF0ZS5zdG9yZWRNYXJrcyB8fCAkZnJvbS5tYXJrcygpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAoY29uc3QgdHlwZSBvZiB0eXBlcykge1xuICAgICAgICAgICAgaWYgKHN0YXRlLmRvYy5yYW5nZUhhc01hcmsoZnJvbSwgdG8sIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==