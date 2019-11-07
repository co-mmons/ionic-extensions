import * as tslib_1 from "tslib";
export function findBlockMarks(state, markType) {
    var marks = [];
    var _a = state.selection, from = _a.from, to = _a.to;
    state.doc.nodesBetween(from, to, function (node, pos, parent) {
        var e_1, _a;
        if (!node.type.isBlock) {
            return false;
        }
        try {
            for (var _b = tslib_1.__values(node.marks), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                if (mark.type === markType) {
                    marks.push(mark);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    return marks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1ibG9jay1tYXJrcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsicHJvc2VtaXJyb3IvdXRpbHMvc2VsZWN0aW9uL2ZpbmQtYmxvY2stbWFya3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBa0IsRUFBRSxRQUFrQjtJQUVqRSxJQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7SUFFbkIsSUFBQSxvQkFBNEIsRUFBM0IsY0FBSSxFQUFFLFVBQXFCLENBQUM7SUFFbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTTs7UUFFL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCOztZQUVELEtBQW1CLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFBLGdCQUFBLDRCQUFFO2dCQUExQixJQUFNLElBQUksV0FBQTtnQkFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQjthQUNKOzs7Ozs7Ozs7SUFFTCxDQUFDLENBQUMsQ0FBQztJQUdILE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01hcmssIE1hcmtUeXBlfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcbmltcG9ydCB7RWRpdG9yU3RhdGV9IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZEJsb2NrTWFya3Moc3RhdGU6IEVkaXRvclN0YXRlLCBtYXJrVHlwZTogTWFya1R5cGUpIHtcblxuICAgIGNvbnN0IG1hcmtzOiBNYXJrW10gPSBbXTtcblxuICAgIGNvbnN0IHtmcm9tLCB0b30gPSBzdGF0ZS5zZWxlY3Rpb247XG5cbiAgICBzdGF0ZS5kb2Mubm9kZXNCZXR3ZWVuKGZyb20sIHRvLCAobm9kZSwgcG9zLCBwYXJlbnQpID0+IHtcblxuICAgICAgICBpZiAoIW5vZGUudHlwZS5pc0Jsb2NrKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IG1hcmsgb2Ygbm9kZS5tYXJrcykge1xuICAgICAgICAgICAgaWYgKG1hcmsudHlwZSA9PT0gbWFya1R5cGUpIHtcbiAgICAgICAgICAgICAgICBtYXJrcy5wdXNoKG1hcmspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG1hcmtzO1xufVxuIl19