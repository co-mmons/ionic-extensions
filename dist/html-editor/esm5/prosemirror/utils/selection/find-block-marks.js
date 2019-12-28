import { __values } from "tslib";
export function findBlockMarks(state, markType) {
    var marks = [];
    var _a = state.selection, from = _a.from, to = _a.to;
    state.doc.nodesBetween(from, to, function (node, pos, parent) {
        var e_1, _a;
        if (!node.type.isBlock) {
            return false;
        }
        try {
            for (var _b = __values(node.marks), _c = _b.next(); !_c.done; _c = _b.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1ibG9jay1tYXJrcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsicHJvc2VtaXJyb3IvdXRpbHMvc2VsZWN0aW9uL2ZpbmQtYmxvY2stbWFya3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBa0IsRUFBRSxRQUFrQjtJQUVqRSxJQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7SUFFbkIsSUFBQSxvQkFBNEIsRUFBM0IsY0FBSSxFQUFFLFVBQXFCLENBQUM7SUFFbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTTs7UUFFL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCOztZQUVELEtBQW1CLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxLQUFLLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTFCLElBQU0sSUFBSSxXQUFBO2dCQUNYLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3BCO2FBQ0o7Ozs7Ozs7OztJQUVMLENBQUMsQ0FBQyxDQUFDO0lBR0gsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWFyaywgTWFya1R5cGV9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xuaW1wb3J0IHtFZGl0b3JTdGF0ZX0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQmxvY2tNYXJrcyhzdGF0ZTogRWRpdG9yU3RhdGUsIG1hcmtUeXBlOiBNYXJrVHlwZSkge1xuXG4gICAgY29uc3QgbWFya3M6IE1hcmtbXSA9IFtdO1xuXG4gICAgY29uc3Qge2Zyb20sIHRvfSA9IHN0YXRlLnNlbGVjdGlvbjtcblxuICAgIHN0YXRlLmRvYy5ub2Rlc0JldHdlZW4oZnJvbSwgdG8sIChub2RlLCBwb3MsIHBhcmVudCkgPT4ge1xuXG4gICAgICAgIGlmICghbm9kZS50eXBlLmlzQmxvY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgbWFyayBvZiBub2RlLm1hcmtzKSB7XG4gICAgICAgICAgICBpZiAobWFyay50eXBlID09PSBtYXJrVHlwZSkge1xuICAgICAgICAgICAgICAgIG1hcmtzLnB1c2gobWFyayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gbWFya3M7XG59XG4iXX0=