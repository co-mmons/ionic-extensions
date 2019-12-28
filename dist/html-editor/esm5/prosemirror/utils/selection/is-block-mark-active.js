import { __values } from "tslib";
export function isBlockMarkActive(state, type) {
    var e_1, _a;
    var _b = state.selection, from = _b.from, $from = _b.$from, to = _b.to, empty = _b.empty;
    if (empty) {
        try {
            for (var _c = __values($from.parent.marks), _d = _c.next(); !_d.done; _d = _c.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYmxvY2stbWFyay1hY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbInByb3NlbWlycm9yL3V0aWxzL3NlbGVjdGlvbi9pcy1ibG9jay1tYXJrLWFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQWtCLEVBQUUsSUFBYzs7SUFDMUQsSUFBQSxvQkFBMEMsRUFBekMsY0FBSSxFQUFFLGdCQUFLLEVBQUUsVUFBRSxFQUFFLGdCQUF3QixDQUFDO0lBRWpELElBQUksS0FBSyxFQUFFOztZQUVQLEtBQW1CLElBQUEsS0FBQSxTQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLGdCQUFBLDRCQUFFO2dCQUFsQyxJQUFNLElBQUksV0FBQTtnQkFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO29CQUNwQixPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKOzs7Ozs7Ozs7S0FDSjtTQUFNO1FBQ0gsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2pEO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFya1R5cGV9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xuaW1wb3J0IHtFZGl0b3JTdGF0ZX0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jsb2NrTWFya0FjdGl2ZShzdGF0ZTogRWRpdG9yU3RhdGUsIHR5cGU6IE1hcmtUeXBlKSB7XG4gICAgY29uc3Qge2Zyb20sICRmcm9tLCB0bywgZW1wdHl9ID0gc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgaWYgKGVtcHR5KSB7XG5cbiAgICAgICAgZm9yIChjb25zdCBtYXJrIG9mICRmcm9tLnBhcmVudC5tYXJrcykge1xuICAgICAgICAgICAgaWYgKG1hcmsudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmRvYy5yYW5nZUhhc01hcmsoZnJvbSwgdG8sIHR5cGUpO1xuICAgIH1cbn1cbiJdfQ==