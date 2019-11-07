import * as tslib_1 from "tslib";
export function isBlockMarkActive(state, type) {
    var e_1, _a;
    var _b = state.selection, from = _b.from, $from = _b.$from, to = _b.to, empty = _b.empty;
    if (empty) {
        try {
            for (var _c = tslib_1.__values($from.parent.marks), _d = _c.next(); !_d.done; _d = _c.next()) {
                var mark = _d.value;
                if (mark.type === type) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYmxvY2stbWFyay1hY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbInByb3NlbWlycm9yL3V0aWxzL3NlbGVjdGlvbi9pcy1ibG9jay1tYXJrLWFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQWtCLEVBQUUsSUFBYzs7SUFDMUQsSUFBQSxvQkFBMEMsRUFBekMsY0FBSSxFQUFFLGdCQUFLLEVBQUUsVUFBRSxFQUFFLGdCQUF3QixDQUFDO0lBRWpELElBQUksS0FBSyxFQUFFOztZQUVQLEtBQW1CLElBQUEsS0FBQSxpQkFBQSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtnQkFBbEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDcEIsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjs7Ozs7Ozs7O0tBQ0o7U0FBTTtRQUNILE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqRDtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcmtUeXBlfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcbmltcG9ydCB7RWRpdG9yU3RhdGV9IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCbG9ja01hcmtBY3RpdmUoc3RhdGU6IEVkaXRvclN0YXRlLCB0eXBlOiBNYXJrVHlwZSkge1xuICAgIGNvbnN0IHtmcm9tLCAkZnJvbSwgdG8sIGVtcHR5fSA9IHN0YXRlLnNlbGVjdGlvbjtcblxuICAgIGlmIChlbXB0eSkge1xuXG4gICAgICAgIGZvciAoY29uc3QgbWFyayBvZiAkZnJvbS5wYXJlbnQubWFya3MpIHtcbiAgICAgICAgICAgIGlmIChtYXJrLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5kb2MucmFuZ2VIYXNNYXJrKGZyb20sIHRvLCB0eXBlKTtcbiAgICB9XG59XG4iXX0=