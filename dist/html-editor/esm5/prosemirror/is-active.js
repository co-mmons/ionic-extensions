import * as tslib_1 from "tslib";
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
            for (var types_1 = tslib_1.__values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
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
            for (var types_2 = tslib_1.__values(types), types_2_1 = types_2.next(); !types_2_1.done; types_2_1 = types_2.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJwcm9zZW1pcnJvci9pcy1hY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBYyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUU3RCxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQWtCLEVBQUUsUUFBa0IsRUFBRSxLQUE0QixFQUFFLEtBQXdCO0lBRW5ILElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFFbEMsSUFBSSxTQUFTLFlBQVksYUFBYSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7UUFDdEQsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzNEO0lBRUQsT0FBTyxTQUFTLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0csQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBa0IsRUFBRSxJQUFjO0lBQ3JELElBQUEsb0JBQTBDLEVBQXpDLGNBQUksRUFBRSxnQkFBSyxFQUFFLFVBQUUsRUFBRSxnQkFBd0IsQ0FBQztJQUVqRCxJQUFJLEtBQUssRUFBRTtRQUNQLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7U0FBTTtRQUNILE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqRDtBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQWtCLEVBQUUsS0FBaUI7O0lBRXpELElBQUEsb0JBQTBDLEVBQXpDLGNBQUksRUFBRSxnQkFBSyxFQUFFLFVBQUUsRUFBRSxnQkFBd0IsQ0FBQztJQUVqRCxJQUFJLEtBQUssRUFBRTs7WUFFUCxLQUFtQixJQUFBLFVBQUEsaUJBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO2dCQUFyQixJQUFNLElBQUksa0JBQUE7Z0JBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7b0JBQ2xELE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7Ozs7Ozs7OztLQUVKO1NBQU07O1lBRUgsS0FBbUIsSUFBQSxVQUFBLGlCQUFBLEtBQUssQ0FBQSw0QkFBQSwrQ0FBRTtnQkFBckIsSUFBTSxJQUFJLGtCQUFBO2dCQUNYLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDeEMsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjs7Ozs7Ozs7O0tBRUo7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNYXJrLCBNYXJrVHlwZSwgTm9kZVR5cGV9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xuaW1wb3J0IHtFZGl0b3JTdGF0ZSwgTm9kZVNlbGVjdGlvbn0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FjdGl2ZShzdGF0ZTogRWRpdG9yU3RhdGUsIG5vZGVUeXBlOiBOb2RlVHlwZSwgYXR0cnM/OiB7W2tleTogc3RyaW5nXTogYW55fSwgbWFya3M/OiBBcnJheTxNYXJrPGFueT4+KSB7XG5cbiAgICBjb25zdCBzZWxlY3Rpb24gPSBzdGF0ZS5zZWxlY3Rpb247XG5cbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbiAmJiBzZWxlY3Rpb24ubm9kZSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uLm5vZGUuaGFzTWFya3VwKG5vZGVUeXBlLCBhdHRycywgbWFya3MpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3Rpb24udG8gPD0gc2VsZWN0aW9uLiRmcm9tLmVuZCgpICYmIHNlbGVjdGlvbi4kZnJvbS5wYXJlbnQuaGFzTWFya3VwKG5vZGVUeXBlLCBhdHRycywgbWFya3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNYXJrQWN0aXZlKHN0YXRlOiBFZGl0b3JTdGF0ZSwgdHlwZTogTWFya1R5cGUpIHtcbiAgICBjb25zdCB7ZnJvbSwgJGZyb20sIHRvLCBlbXB0eX0gPSBzdGF0ZS5zZWxlY3Rpb247XG5cbiAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgcmV0dXJuICEhKHR5cGUuaXNJblNldChzdGF0ZS5zdG9yZWRNYXJrcyB8fCAkZnJvbS5tYXJrcygpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRvYy5yYW5nZUhhc01hcmsoZnJvbSwgdG8sIHR5cGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFueU1hcmtBY3RpdmUoc3RhdGU6IEVkaXRvclN0YXRlLCB0eXBlczogTWFya1R5cGVbXSkge1xuXG4gICAgY29uc3Qge2Zyb20sICRmcm9tLCB0bywgZW1wdHl9ID0gc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgaWYgKGVtcHR5KSB7XG5cbiAgICAgICAgZm9yIChjb25zdCB0eXBlIG9mIHR5cGVzKSB7XG4gICAgICAgICAgICBpZiAodHlwZS5pc0luU2V0KHN0YXRlLnN0b3JlZE1hcmtzIHx8ICRmcm9tLm1hcmtzKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yIChjb25zdCB0eXBlIG9mIHR5cGVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZG9jLnJhbmdlSGFzTWFyayhmcm9tLCB0bywgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuIl19