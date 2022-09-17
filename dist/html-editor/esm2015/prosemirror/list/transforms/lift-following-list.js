import { Fragment, NodeRange, Slice } from "prosemirror-model";
import { TextSelection, } from "prosemirror-state";
import { liftTarget, ReplaceAroundStep } from "prosemirror-transform";
function liftListItem(state, selection, tr) {
    const { $from, $to } = selection;
    const nodeType = state.schema.nodes.listItem;
    let range = $from.blockRange($to, node => !!node.childCount &&
        !!node.firstChild &&
        node.firstChild.type === nodeType);
    if (!range ||
        range.depth < 2 ||
        $from.node(range.depth - 1).type !== nodeType) {
        return tr;
    }
    const end = range.end;
    const endOfList = $to.end(range.depth);
    if (end < endOfList) {
        tr.step(new ReplaceAroundStep(end - 1, endOfList, end, endOfList, new Slice(Fragment.from(nodeType.create(undefined, range.parent.copy())), 1, 0), 1, true));
        range = new NodeRange(tr.doc.resolve($from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    return tr.lift(range, liftTarget(range)).scrollIntoView();
}
export function liftFollowingList(state, from, to, rootListDepth, tr) {
    const { listItem } = state.schema.nodes;
    let lifted = false;
    tr.doc.nodesBetween(from, to, (node, pos) => {
        if (!lifted && node.type === listItem && pos > from) {
            lifted = true;
            let listDepth = rootListDepth + 3;
            while (listDepth > rootListDepth + 2) {
                const start = tr.doc.resolve(tr.mapping.map(pos));
                listDepth = start.depth;
                const end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
                const sel = new TextSelection(start, end);
                tr = liftListItem(state, sel, tr);
            }
        }
    });
    return tr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmdC1mb2xsb3dpbmctbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9odG1sLWVkaXRvci9wcm9zZW1pcnJvci9saXN0L3RyYW5zZm9ybXMvbGlmdC1mb2xsb3dpbmctbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQXlCLGFBQWEsR0FBZSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVwRSxTQUFTLFlBQVksQ0FDakIsS0FBa0IsRUFDbEIsU0FBb0IsRUFDcEIsRUFBZTtJQUVmLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQ2pDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUM3QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUN4QixHQUFHLEVBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FDSCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7UUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FDeEMsQ0FBQztJQUNGLElBQ0ksQ0FBQyxLQUFLO1FBQ04sS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDO1FBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQy9DO1FBQ0UsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDdEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsSUFBSSxHQUFHLEdBQUcsU0FBUyxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyxJQUFJLENBQ0gsSUFBSSxpQkFBaUIsQ0FDakIsR0FBRyxHQUFHLENBQUMsRUFDUCxTQUFTLEVBQ1QsR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEtBQUssQ0FDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUM5RCxDQUFDLEVBQ0QsQ0FBQyxDQUNKLEVBQ0QsQ0FBQyxFQUNELElBQUksQ0FDUCxDQUNKLENBQUM7UUFFRixLQUFLLEdBQUcsSUFBSSxTQUFTLENBQ2pCLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDekIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQ3pCLEtBQUssQ0FBQyxLQUFLLENBQ2QsQ0FBQztLQUNMO0lBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFXLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUM3QixLQUFrQixFQUNsQixJQUFZLEVBQ1osRUFBVSxFQUNWLGFBQXFCLEVBQ3JCLEVBQWU7SUFFZixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDeEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO1lBQ2pELE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDZCxJQUFJLFNBQVMsR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sU0FBUyxHQUFHLGFBQWEsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUN4QixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDdEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQ2hELENBQUM7Z0JBQ0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxFQUFFLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDckM7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGcmFnbWVudCwgTm9kZVJhbmdlLCBTbGljZX0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5pbXBvcnQge0VkaXRvclN0YXRlLCBTZWxlY3Rpb24sIFRleHRTZWxlY3Rpb24sIFRyYW5zYWN0aW9uLH0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XG5pbXBvcnQge2xpZnRUYXJnZXQsIFJlcGxhY2VBcm91bmRTdGVwfSBmcm9tIFwicHJvc2VtaXJyb3ItdHJhbnNmb3JtXCI7XG5cbmZ1bmN0aW9uIGxpZnRMaXN0SXRlbShcbiAgICBzdGF0ZTogRWRpdG9yU3RhdGUsXG4gICAgc2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4gICAgdHI6IFRyYW5zYWN0aW9uLFxuKTogVHJhbnNhY3Rpb24ge1xuICAgIGNvbnN0IHsgJGZyb20sICR0byB9ID0gc2VsZWN0aW9uO1xuICAgIGNvbnN0IG5vZGVUeXBlID0gc3RhdGUuc2NoZW1hLm5vZGVzLmxpc3RJdGVtO1xuICAgIGxldCByYW5nZSA9ICRmcm9tLmJsb2NrUmFuZ2UoXG4gICAgICAgICR0byxcbiAgICAgICAgbm9kZSA9PlxuICAgICAgICAgICAgISFub2RlLmNoaWxkQ291bnQgJiZcbiAgICAgICAgICAgICEhbm9kZS5maXJzdENoaWxkICYmXG4gICAgICAgICAgICBub2RlLmZpcnN0Q2hpbGQudHlwZSA9PT0gbm9kZVR5cGUsXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICAgICFyYW5nZSB8fFxuICAgICAgICByYW5nZS5kZXB0aCA8IDIgfHxcbiAgICAgICAgJGZyb20ubm9kZShyYW5nZS5kZXB0aCAtIDEpLnR5cGUgIT09IG5vZGVUeXBlXG4gICAgKSB7XG4gICAgICAgIHJldHVybiB0cjtcbiAgICB9XG4gICAgY29uc3QgZW5kID0gcmFuZ2UuZW5kO1xuICAgIGNvbnN0IGVuZE9mTGlzdCA9ICR0by5lbmQocmFuZ2UuZGVwdGgpO1xuICAgIGlmIChlbmQgPCBlbmRPZkxpc3QpIHtcbiAgICAgICAgdHIuc3RlcChcbiAgICAgICAgICAgIG5ldyBSZXBsYWNlQXJvdW5kU3RlcChcbiAgICAgICAgICAgICAgICBlbmQgLSAxLFxuICAgICAgICAgICAgICAgIGVuZE9mTGlzdCxcbiAgICAgICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICAgICAgZW5kT2ZMaXN0LFxuICAgICAgICAgICAgICAgIG5ldyBTbGljZShcbiAgICAgICAgICAgICAgICAgICAgRnJhZ21lbnQuZnJvbShub2RlVHlwZS5jcmVhdGUodW5kZWZpbmVkLCByYW5nZS5wYXJlbnQuY29weSgpKSksXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuXG4gICAgICAgIHJhbmdlID0gbmV3IE5vZGVSYW5nZShcbiAgICAgICAgICAgIHRyLmRvYy5yZXNvbHZlKCRmcm9tLnBvcyksXG4gICAgICAgICAgICB0ci5kb2MucmVzb2x2ZShlbmRPZkxpc3QpLFxuICAgICAgICAgICAgcmFuZ2UuZGVwdGgsXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0ci5saWZ0KHJhbmdlLCBsaWZ0VGFyZ2V0KHJhbmdlKSBhcyBudW1iZXIpLnNjcm9sbEludG9WaWV3KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaWZ0Rm9sbG93aW5nTGlzdChcbiAgICBzdGF0ZTogRWRpdG9yU3RhdGUsXG4gICAgZnJvbTogbnVtYmVyLFxuICAgIHRvOiBudW1iZXIsXG4gICAgcm9vdExpc3REZXB0aDogbnVtYmVyLFxuICAgIHRyOiBUcmFuc2FjdGlvbixcbik6IFRyYW5zYWN0aW9uIHtcbiAgICBjb25zdCB7IGxpc3RJdGVtIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG4gICAgbGV0IGxpZnRlZCA9IGZhbHNlO1xuICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oZnJvbSwgdG8sIChub2RlLCBwb3MpID0+IHtcbiAgICAgICAgaWYgKCFsaWZ0ZWQgJiYgbm9kZS50eXBlID09PSBsaXN0SXRlbSAmJiBwb3MgPiBmcm9tKSB7XG4gICAgICAgICAgICBsaWZ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGxpc3REZXB0aCA9IHJvb3RMaXN0RGVwdGggKyAzO1xuICAgICAgICAgICAgd2hpbGUgKGxpc3REZXB0aCA+IHJvb3RMaXN0RGVwdGggKyAyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB0ci5kb2MucmVzb2x2ZSh0ci5tYXBwaW5nLm1hcChwb3MpKTtcbiAgICAgICAgICAgICAgICBsaXN0RGVwdGggPSBzdGFydC5kZXB0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSB0ci5kb2MucmVzb2x2ZShcbiAgICAgICAgICAgICAgICAgICAgdHIubWFwcGluZy5tYXAocG9zICsgbm9kZS50ZXh0Q29udGVudC5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gbmV3IFRleHRTZWxlY3Rpb24oc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICAgICAgdHIgPSBsaWZ0TGlzdEl0ZW0oc3RhdGUsIHNlbCwgdHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRyO1xufVxuIl19