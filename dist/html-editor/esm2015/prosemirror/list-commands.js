import * as baseCommand from "prosemirror-commands";
import { GapCursor } from "prosemirror-gapcursor";
import { Fragment, Slice } from "prosemirror-model";
import * as baseListCommand from "prosemirror-schema-list";
import { NodeSelection, TextSelection } from "prosemirror-state";
import { liftTarget, ReplaceAroundStep } from "prosemirror-transform";
import { findPositionOfNodeBefore, hasParentNodeOfType } from "prosemirror-utils";
import { filter } from "./commands/filter";
import { isEmptySelectionAtStart } from "./commands/is-empty-selection-at-start";
import { isFirstChildOfParent } from "./commands/is-first-child-of-parent";
import { hasVisibleContent, isNodeEmpty } from "./document-utils";
import { liftFollowingList } from "./list/transforms/lift-following-list";
import { liftSelectionList } from "./list/transforms/lift-selection-list";
import { sanitizeSelectionMarks } from "./mark-utils";
import { compose, isRangeOfType } from "./utils";
import { findCutBefore } from "./utils/find-cut-before";
const maxIndentation = 5;
const deletePreviousEmptyListItem = (state, dispatch) => {
    const { $from } = state.selection;
    const { listItem } = state.schema.nodes;
    const $cut = findCutBefore($from);
    if (!$cut || !$cut.nodeBefore || !($cut.nodeBefore.type === listItem)) {
        return false;
    }
    const previousListItemEmpty = $cut.nodeBefore.childCount === 1 && $cut.nodeBefore.firstChild && $cut.nodeBefore.firstChild.nodeSize <= 2;
    if (previousListItemEmpty) {
        const { tr } = state;
        if (dispatch) {
            dispatch(tr
                .delete($cut.pos - $cut.nodeBefore.nodeSize, $from.pos)
                .scrollIntoView());
        }
        return true;
    }
    return false;
};
const ɵ0 = deletePreviousEmptyListItem;
const joinToPreviousListItem = (state, dispatch) => {
    const { $from } = state.selection;
    const { paragraph, listItem, codeBlock, bulletList, orderedList, } = state.schema.nodes;
    const isGapCursorShown = state.selection instanceof GapCursor;
    const $cutPos = isGapCursorShown ? state.doc.resolve($from.pos + 1) : $from;
    const $cut = findCutBefore($cutPos);
    if (!$cut) {
        return false;
    }
    // see if the containing node is a list
    if ($cut.nodeBefore &&
        [bulletList, orderedList].indexOf($cut.nodeBefore.type) > -1) {
        // and the node after this is a paragraph or a codeBlock
        if ($cut.nodeAfter &&
            ($cut.nodeAfter.type === paragraph || $cut.nodeAfter.type === codeBlock)) {
            // find the nearest paragraph that precedes this node
            let $lastNode = $cut.doc.resolve($cut.pos - 1);
            while ($lastNode.parent.type !== paragraph) {
                $lastNode = state.doc.resolve($lastNode.pos - 1);
            }
            let { tr } = state;
            if (isGapCursorShown) {
                const nodeBeforePos = findPositionOfNodeBefore(tr.selection);
                if (typeof nodeBeforePos !== "number") {
                    return false;
                }
                // append the codeblock to the list node
                const list = $cut.nodeBefore.copy($cut.nodeBefore.content.append(Fragment.from(listItem.createChecked({}, $cut.nodeAfter))));
                tr.replaceWith(nodeBeforePos, $from.pos + $cut.nodeAfter.nodeSize, list);
            }
            else {
                // take the text content of the paragraph and insert after the paragraph up until before the the cut
                tr = state.tr.step(new ReplaceAroundStep($lastNode.pos, $cut.pos + $cut.nodeAfter.nodeSize, $cut.pos + 1, $cut.pos + $cut.nodeAfter.nodeSize - 1, state.tr.doc.slice($lastNode.pos, $cut.pos), 0, true));
            }
            // find out if there"s now another list following and join them
            // as in, [list, p, list] => [list with p, list], and we want [joined list]
            const $postCut = tr.doc.resolve(tr.mapping.map($cut.pos + $cut.nodeAfter.nodeSize));
            if ($postCut.nodeBefore &&
                $postCut.nodeAfter &&
                $postCut.nodeBefore.type === $postCut.nodeAfter.type &&
                [bulletList, orderedList].indexOf($postCut.nodeBefore.type) > -1) {
                tr = tr.join($postCut.pos);
            }
            if (dispatch) {
                dispatch(tr.scrollIntoView());
            }
            return true;
        }
    }
    return false;
};
const ɵ1 = joinToPreviousListItem;
const isInsideListItem = (state) => {
    const { $from } = state.selection;
    const { listItem, paragraph } = state.schema.nodes;
    if (state.selection instanceof GapCursor) {
        return $from.parent.type === listItem;
    }
    return (hasParentNodeOfType(listItem)(state.selection) &&
        $from.parent.type === paragraph);
};
const ɵ2 = isInsideListItem;
const canToJoinToPreviousListItem = (state) => {
    const { $from } = state.selection;
    const { bulletList, orderedList } = state.schema.nodes;
    const $before = state.doc.resolve($from.pos - 1);
    let nodeBefore = $before ? $before.nodeBefore : null;
    if (state.selection instanceof GapCursor) {
        nodeBefore = $from.nodeBefore;
    }
    return (!!nodeBefore && [bulletList, orderedList].indexOf(nodeBefore.type) > -1);
};
const ɵ3 = canToJoinToPreviousListItem;
const canOutdent = (state) => {
    const { parent } = state.selection.$from;
    const { listItem, paragraph } = state.schema.nodes;
    if (state.selection instanceof GapCursor) {
        return parent.type === listItem;
    }
    return (parent.type === paragraph && hasParentNodeOfType(listItem)(state.selection));
};
const ɵ4 = canOutdent;
export const enterKeyCommand = (state, dispatch) => {
    const { selection } = state;
    if (selection.empty) {
        const { $from } = selection;
        const { listItem, codeBlock } = state.schema.nodes;
        const node = $from.node($from.depth);
        const wrapper = $from.node($from.depth - 1);
        if (wrapper && wrapper.type === listItem) {
            /** Check if the wrapper has any visible content */
            const wrapperHasContent = hasVisibleContent(wrapper);
            if (isNodeEmpty(node) && !wrapperHasContent) {
                return outdentList()(state, dispatch);
            }
            else if (!hasParentNodeOfType(codeBlock)(selection)) {
                return splitListItem(listItem)(state, dispatch);
            }
        }
    }
    return false;
};
export const backspaceKeyCommand = baseCommand.chainCommands(
// if we"re at the start of a list item, we need to either backspace
// directly to an empty list item above, or outdent this node
filter([
    isEmptySelectionAtStart,
    // list items might have multiple paragraphs; only do this at the first one
    isFirstChildOfParent,
    canOutdent,
], baseCommand.chainCommands(deletePreviousEmptyListItem, outdentList())), 
// if we"re just inside a paragraph node (or gapcursor is shown) and backspace, then try to join
// the text to the previous list item, if one exists
filter([isEmptySelectionAtStart, canToJoinToPreviousListItem], joinToPreviousListItem));
/**
 * Implemetation taken and modified for our needs from PM
 * @param itemType Node
 * Splits the list items, specific implementation take from PM
 */
function splitListItem(itemType) {
    return function (state, dispatch) {
        const ref = state.selection;
        const $from = ref.$from;
        const $to = ref.$to;
        const node = ref.node;
        if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) {
            return false;
        }
        const grandParent = $from.node(-1);
        if (grandParent.type !== itemType) {
            return false;
        }
        /** --> The following line changed from the original PM implementation to allow list additions with multiple paragraphs */
        if (grandParent.content.content.length <= 1 &&
            $from.parent.content.size === 0 &&
            !(grandParent.content.size === 0)) {
            // In an empty block. If this is a nested list, the wrapping
            // list item should be split. Otherwise, bail out and let next
            // command handle lifting.
            if ($from.depth === 2 ||
                $from.node(-3).type !== itemType ||
                $from.index(-2) !== $from.node(-2).childCount - 1) {
                return false;
            }
            if (dispatch) {
                let wrap = Fragment.empty;
                const keepItem = $from.index(-1) > 0;
                // Build a fragment containing empty versions of the structure
                // from the outer list item to the parent node of the cursor
                for (let d = $from.depth - (keepItem ? 1 : 2); d >= $from.depth - 3; d--) {
                    wrap = Fragment.from($from.node(d).copy(wrap));
                }
                // Add a second list item with an empty default start node
                wrap = wrap.append(Fragment.from(itemType.createAndFill()));
                const tr$1 = state.tr.replace($from.before(keepItem ? undefined : -1), $from.after(-3), new Slice(wrap, keepItem ? 3 : 2, 2));
                tr$1.setSelection(state.selection.constructor.near(tr$1.doc.resolve($from.pos + (keepItem ? 3 : 2))));
                dispatch(tr$1.scrollIntoView());
            }
            return true;
        }
        const nextType = $to.pos === $from.end()
            ? grandParent.contentMatchAt(0).defaultType
            : undefined;
        const tr = state.tr.delete($from.pos, $to.pos);
        const types = nextType && [undefined, { type: nextType }];
        if (dispatch) {
            dispatch(tr.split($from.pos, 2, types).scrollIntoView());
        }
        return true;
    };
}
/**
 * Merge closest bullet list blocks into one
 */
function mergeLists(listItem, range) {
    return (command) => {
        return (state, dispatch) => command(state, tr => {
            /* we now need to handle the case that we lifted a sublist out,
             * and any listItems at the current level get shifted out to
             * their own new list; e.g.:
             *
             * unorderedList
             *  listItem(A)
             *  listItem
             *    unorderedList
             *      listItem(B)
             *  listItem(C)
             *
             * becomes, after unindenting the first, top level listItem, A:
             *
             * content of A
             * unorderedList
             *  listItem(B)
             * unorderedList
             *  listItem(C)
             *
             * so, we try to merge these two lists if they"re of the same type, to give:
             *
             * content of A
             * unorderedList
             *  listItem(B)
             *  listItem(C)
             */
            const $start = state.doc.resolve(range.start);
            const $end = state.doc.resolve(range.end);
            const $join = tr.doc.resolve(tr.mapping.map(range.end - 1));
            if ($join.nodeBefore &&
                $join.nodeAfter &&
                $join.nodeBefore.type === $join.nodeAfter.type) {
                if ($end.nodeAfter &&
                    $end.nodeAfter.type === listItem &&
                    $end.parent.type === $start.parent.type) {
                    tr.join($join.pos);
                }
            }
            if (dispatch) {
                dispatch(tr.scrollIntoView());
            }
        });
    };
}
export function outdentList() {
    return function (state, dispatch) {
        const { listItem } = state.schema.nodes;
        const { $from, $to } = state.selection;
        if (isInsideListItem(state)) {
            // if we"re backspacing at the start of a list item, unindent it
            // take the the range of nodes we might be lifting
            // the predicate is for when you"re backspacing a top level list item:
            // we don"t want to go up past the doc node, otherwise the range
            // to clear will include everything
            const range = $from.blockRange($to, node => node.childCount > 0 && node.firstChild && node.firstChild.type === listItem);
            if (!range) {
                return false;
            }
            return compose(mergeLists(listItem, range), // 2. Check if I need to merge nearest list
            baseListCommand.liftListItem)(listItem)(state, dispatch);
        }
        return false;
    };
}
/**
 * Check if we can sink the list.
 *
 * @returns true if we can sink the list, false if we reach the max indentation level
 */
function canSink(initialIndentationLevel, state) {
    /*
        - Keep going forward in document until indentation of the node is < than the initial
        - If indentation is EVER > max indentation, return true and don"t sink the list
        */
    let currentIndentationLevel;
    let currentPos = state.tr.selection.$to.pos;
    do {
        const resolvedPos = state.doc.resolve(currentPos);
        currentIndentationLevel = numberNestedLists(resolvedPos, state.schema.nodes);
        if (currentIndentationLevel > maxIndentation) {
            // Cancel sink list.
            // If current indentation less than the initial, it won"t be
            // larger than the max, and the loop will terminate at end of this iteration
            return false;
        }
        currentPos++;
    } while (currentIndentationLevel >= initialIndentationLevel);
    return true;
}
export function indentList() {
    return function (state, dispatch) {
        const { listItem } = state.schema.nodes;
        if (isInsideListItem(state)) {
            // Record initial list indentation
            const initialIndentationLevel = numberNestedLists(state.selection.$from, state.schema.nodes);
            if (canSink(initialIndentationLevel, state)) {
                compose(baseListCommand.sinkListItem)(listItem)(state, dispatch);
            }
            return true;
        }
        return false;
    };
}
export function liftListItems() {
    return function (state, dispatch) {
        const { tr } = state;
        const { $from, $to } = state.selection;
        tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            // Following condition will ensure that block types paragraph, heading, codeBlock, blockquote, panel are lifted.
            // isTextblock is true for paragraph, heading, codeBlock.
            if (node.isTextblock ||
                node.type.name === "blockquote" ||
                node.type.name === "panel") {
                const sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
                const range = sel.$from.blockRange(sel.$to);
                if (!range || sel.$from.parent.type !== state.schema.nodes.listItem) {
                    return false;
                }
                const target = range && liftTarget(range);
                if (target === undefined || target === null) {
                    return false;
                }
                tr.lift(range, target);
            }
            return;
        });
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it"s possible for a selection to start or end at an empty node at the very end of
 * a line. This isn"t obvious by looking at the editor and it"s likely not what the
 * user intended - so we need to adjust the selection a bit in scenarios like that.
 */
export function adjustSelectionInList(doc, selection) {
    const { $from, $to } = selection;
    const isSameLine = $from.pos === $to.pos;
    let startPos = $from.pos;
    const endPos = $to.pos;
    if (isSameLine && startPos === doc.nodeSize - 3) {
        // Line is empty, don"t do anything
        return selection;
    }
    // Selection started at the very beginning of a line and therefor points to the previous line.
    if ($from.nodeBefore && !isSameLine) {
        startPos++;
        let node = doc.nodeAt(startPos);
        while (!node || (node && !node.isText)) {
            startPos++;
            node = doc.nodeAt(startPos);
        }
    }
    if (endPos === startPos) {
        return new TextSelection(doc.resolve(startPos));
    }
    return new TextSelection(doc.resolve(startPos), doc.resolve(endPos));
}
// Get the depth of the nearest ancestor list
export const rootListDepth = (pos, nodes) => {
    const { bulletList, orderedList, listItem } = nodes;
    let depth;
    for (let i = pos.depth - 1; i > 0; i--) {
        const node = pos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            depth = i;
        }
        if (node.type !== bulletList &&
            node.type !== orderedList &&
            node.type !== listItem) {
            break;
        }
    }
    return depth;
};
// Returns the number of nested lists that are ancestors of the given selection
export const numberNestedLists = (resolvedPos, nodes) => {
    const { bulletList, orderedList } = nodes;
    let count = 0;
    for (let i = resolvedPos.depth - 1; i > 0; i--) {
        const node = resolvedPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            count += 1;
        }
    }
    return count;
};
export const toggleList = (state, dispatch, view, listType) => {
    const { selection } = state;
    const fromNode = selection.$from.node(selection.$from.depth - 2);
    const endNode = selection.$to.node(selection.$to.depth - 2);
    if (!fromNode ||
        fromNode.type.name !== listType ||
        (!endNode || endNode.type.name !== listType)) {
        return toggleListCommand(listType)(state, dispatch, view);
    }
    else {
        const depth = rootListDepth(selection.$to, state.schema.nodes);
        let tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth || 0, state.tr);
        tr = liftSelectionList(state, tr);
        dispatch(tr);
        return true;
    }
};
/**
 * Check of is selection is inside a list of the specified type
 */
export function isInsideList(state, listType) {
    const { $from } = state.selection;
    const parent = $from.node(-2);
    const grandgrandParent = $from.node(-3);
    return ((parent && parent.type === state.schema.nodes[listType]) ||
        (grandgrandParent && grandgrandParent.type === state.schema.nodes[listType]));
}
export function toggleListCommand(listType) {
    return function (state, dispatch, view) {
        if (dispatch) {
            dispatch(state.tr.setSelection(adjustSelectionInList(state.doc, state.selection)));
        }
        if (!view) {
            return false;
        }
        state = view.state;
        const { $from, $to } = state.selection;
        const isRangeOfSingleType = isRangeOfType(state.doc, $from, $to, state.schema.nodes[listType]);
        if (isInsideList(state, listType) && isRangeOfSingleType) {
            // Untoggles list
            return liftListItems()(state, dispatch);
        }
        else {
            // Converts list type e.g. bullet_list -> ordered_list if needed
            if (!isRangeOfSingleType) {
                liftListItems()(state, dispatch);
                state = view.state;
            }
            // Remove any invalid marks that are not supported
            const tr = sanitizeSelectionMarks(state);
            if (tr) {
                if (dispatch) {
                    dispatch(tr);
                }
                state = view.state;
            }
            // Wraps selection in list
            return wrapInList(state.schema.nodes[listType])(state, dispatch);
        }
    };
}
export function toggleBulletList(view) {
    return toggleList(view.state, view.dispatch, view, "bulletList");
}
export function toggleOrderedList(view) {
    return toggleList(view.state, view.dispatch, view, "orderedList");
}
export function wrapInList(nodeType) {
    return baseCommand.autoJoin(baseListCommand.wrapInList(nodeType), (before, after) => before.type === after.type && before.type === nodeType);
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jb21tYW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsicHJvc2VtaXJyb3IvbGlzdC1jb21tYW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsUUFBUSxFQUEwQyxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRixPQUFPLEtBQUssZUFBZSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBYyxhQUFhLEVBQUUsYUFBYSxFQUFjLE1BQU0sbUJBQW1CLENBQUM7QUFDekYsT0FBTyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR2hGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMs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LENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQWdCO0lBQzlDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsUUFBa0I7SUFDekMsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUN2QixlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUNwQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FDNUUsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlQ29tbWFuZCBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7R2FwQ3Vyc29yfSBmcm9tIFwicHJvc2VtaXJyb3ItZ2FwY3Vyc29yXCI7XG5pbXBvcnQge0ZyYWdtZW50LCBOb2RlLCBOb2RlUmFuZ2UsIE5vZGVUeXBlLCBSZXNvbHZlZFBvcywgU2xpY2V9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xuaW1wb3J0ICogYXMgYmFzZUxpc3RDb21tYW5kIGZyb20gXCJwcm9zZW1pcnJvci1zY2hlbWEtbGlzdFwiO1xuaW1wb3J0IHtFZGl0b3JTdGF0ZSwgTm9kZVNlbGVjdGlvbiwgVGV4dFNlbGVjdGlvbiwgVHJhbnNhY3Rpb259IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xuaW1wb3J0IHtsaWZ0VGFyZ2V0LCBSZXBsYWNlQXJvdW5kU3RlcH0gZnJvbSBcInByb3NlbWlycm9yLXRyYW5zZm9ybVwiO1xuaW1wb3J0IHtmaW5kUG9zaXRpb25PZk5vZGVCZWZvcmUsIGhhc1BhcmVudE5vZGVPZlR5cGV9IGZyb20gXCJwcm9zZW1pcnJvci11dGlsc1wiO1xuaW1wb3J0IHtFZGl0b3JWaWV3fSBmcm9tIFwicHJvc2VtaXJyb3Itdmlld1wiO1xuaW1wb3J0IHtDb21tYW5kfSBmcm9tIFwiLi9jb21tYW5kXCI7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSBcIi4vY29tbWFuZHMvZmlsdGVyXCI7XG5pbXBvcnQge2lzRW1wdHlTZWxlY3Rpb25BdFN0YXJ0fSBmcm9tIFwiLi9jb21tYW5kcy9pcy1lbXB0eS1zZWxlY3Rpb24tYXQtc3RhcnRcIjtcbmltcG9ydCB7aXNGaXJzdENoaWxkT2ZQYXJlbnR9IGZyb20gXCIuL2NvbW1hbmRzL2lzLWZpcnN0LWNoaWxkLW9mLXBhcmVudFwiO1xuaW1wb3J0IHtoYXNWaXNpYmxlQ29udGVudCwgaXNOb2RlRW1wdHl9IGZyb20gXCIuL2RvY3VtZW50LXV0aWxzXCI7XG5pbXBvcnQge2xpZnRGb2xsb3dpbmdMaXN0fSBmcm9tIFwiLi9saXN0L3RyYW5zZm9ybXMvbGlmdC1mb2xsb3dpbmctbGlzdFwiO1xuaW1wb3J0IHtsaWZ0U2VsZWN0aW9uTGlzdH0gZnJvbSBcIi4vbGlzdC90cmFuc2Zvcm1zL2xpZnQtc2VsZWN0aW9uLWxpc3RcIjtcbmltcG9ydCB7c2FuaXRpemVTZWxlY3Rpb25NYXJrc30gZnJvbSBcIi4vbWFyay11dGlsc1wiO1xuaW1wb3J0IHtjb21wb3NlLCBpc1JhbmdlT2ZUeXBlfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHtmaW5kQ3V0QmVmb3JlfSBmcm9tIFwiLi91dGlscy9maW5kLWN1dC1iZWZvcmVcIjtcblxuY29uc3QgbWF4SW5kZW50YXRpb24gPSA1O1xuXG5jb25zdCBkZWxldGVQcmV2aW91c0VtcHR5TGlzdEl0ZW06IENvbW1hbmQgPSAoc3RhdGUsIGRpc3BhdGNoKSA9PiB7XG4gICAgY29uc3QgeyAkZnJvbSB9ID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgIGNvbnN0IHsgbGlzdEl0ZW0gfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcblxuICAgIGNvbnN0ICRjdXQgPSBmaW5kQ3V0QmVmb3JlKCRmcm9tKTtcbiAgICBpZiAoISRjdXQgfHwgISRjdXQubm9kZUJlZm9yZSB8fCAhKCRjdXQubm9kZUJlZm9yZS50eXBlID09PSBsaXN0SXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpb3VzTGlzdEl0ZW1FbXB0eSA9ICRjdXQubm9kZUJlZm9yZS5jaGlsZENvdW50ID09PSAxICYmICRjdXQubm9kZUJlZm9yZS5maXJzdENoaWxkICYmICRjdXQubm9kZUJlZm9yZS5maXJzdENoaWxkLm5vZGVTaXplIDw9IDI7XG5cbiAgICBpZiAocHJldmlvdXNMaXN0SXRlbUVtcHR5KSB7XG4gICAgICAgIGNvbnN0IHsgdHIgfSA9IHN0YXRlO1xuXG4gICAgICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgdHJcbiAgICAgICAgICAgICAgICAgICAgLmRlbGV0ZSgkY3V0LnBvcyAtICRjdXQubm9kZUJlZm9yZS5ub2RlU2l6ZSwgJGZyb20ucG9zKVxuICAgICAgICAgICAgICAgICAgICAuc2Nyb2xsSW50b1ZpZXcoKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3Qgam9pblRvUHJldmlvdXNMaXN0SXRlbTogQ29tbWFuZCA9IChzdGF0ZSwgZGlzcGF0Y2gpID0+IHtcbiAgICBjb25zdCB7ICRmcm9tIH0gPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgY29uc3Qge1xuICAgICAgICBwYXJhZ3JhcGgsXG4gICAgICAgIGxpc3RJdGVtLFxuICAgICAgICBjb2RlQmxvY2ssXG4gICAgICAgIGJ1bGxldExpc3QsXG4gICAgICAgIG9yZGVyZWRMaXN0LFxuICAgIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG4gICAgY29uc3QgaXNHYXBDdXJzb3JTaG93biA9IHN0YXRlLnNlbGVjdGlvbiBpbnN0YW5jZW9mIEdhcEN1cnNvcjtcbiAgICBjb25zdCAkY3V0UG9zID0gaXNHYXBDdXJzb3JTaG93biA/IHN0YXRlLmRvYy5yZXNvbHZlKCRmcm9tLnBvcyArIDEpIDogJGZyb207XG4gICAgY29uc3QgJGN1dCA9IGZpbmRDdXRCZWZvcmUoJGN1dFBvcyk7XG4gICAgaWYgKCEkY3V0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzZWUgaWYgdGhlIGNvbnRhaW5pbmcgbm9kZSBpcyBhIGxpc3RcbiAgICBpZiAoXG4gICAgICAgICRjdXQubm9kZUJlZm9yZSAmJlxuICAgICAgICBbYnVsbGV0TGlzdCwgb3JkZXJlZExpc3RdLmluZGV4T2YoJGN1dC5ub2RlQmVmb3JlLnR5cGUpID4gLTFcbiAgICApIHtcbiAgICAgICAgLy8gYW5kIHRoZSBub2RlIGFmdGVyIHRoaXMgaXMgYSBwYXJhZ3JhcGggb3IgYSBjb2RlQmxvY2tcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgJGN1dC5ub2RlQWZ0ZXIgJiZcbiAgICAgICAgICAgICgkY3V0Lm5vZGVBZnRlci50eXBlID09PSBwYXJhZ3JhcGggfHwgJGN1dC5ub2RlQWZ0ZXIudHlwZSA9PT0gY29kZUJsb2NrKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIG5lYXJlc3QgcGFyYWdyYXBoIHRoYXQgcHJlY2VkZXMgdGhpcyBub2RlXG4gICAgICAgICAgICBsZXQgJGxhc3ROb2RlID0gJGN1dC5kb2MucmVzb2x2ZSgkY3V0LnBvcyAtIDEpO1xuXG4gICAgICAgICAgICB3aGlsZSAoJGxhc3ROb2RlLnBhcmVudC50eXBlICE9PSBwYXJhZ3JhcGgpIHtcbiAgICAgICAgICAgICAgICAkbGFzdE5vZGUgPSBzdGF0ZS5kb2MucmVzb2x2ZSgkbGFzdE5vZGUucG9zIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB7IHRyIH0gPSBzdGF0ZTtcbiAgICAgICAgICAgIGlmIChpc0dhcEN1cnNvclNob3duKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZUJlZm9yZVBvcyA9IGZpbmRQb3NpdGlvbk9mTm9kZUJlZm9yZSh0ci5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZUJlZm9yZVBvcyAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgY29kZWJsb2NrIHRvIHRoZSBsaXN0IG5vZGVcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gJGN1dC5ub2RlQmVmb3JlLmNvcHkoXG4gICAgICAgICAgICAgICAgICAgICRjdXQubm9kZUJlZm9yZS5jb250ZW50LmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgIEZyYWdtZW50LmZyb20obGlzdEl0ZW0uY3JlYXRlQ2hlY2tlZCh7fSwgJGN1dC5ub2RlQWZ0ZXIpKSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRyLnJlcGxhY2VXaXRoKFxuICAgICAgICAgICAgICAgICAgICBub2RlQmVmb3JlUG9zLFxuICAgICAgICAgICAgICAgICAgICAkZnJvbS5wb3MgKyAkY3V0Lm5vZGVBZnRlci5ub2RlU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0YWtlIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIHBhcmFncmFwaCBhbmQgaW5zZXJ0IGFmdGVyIHRoZSBwYXJhZ3JhcGggdXAgdW50aWwgYmVmb3JlIHRoZSB0aGUgY3V0XG4gICAgICAgICAgICAgICAgdHIgPSBzdGF0ZS50ci5zdGVwKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVwbGFjZUFyb3VuZFN0ZXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkbGFzdE5vZGUucG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgJGN1dC5wb3MgKyAkY3V0Lm5vZGVBZnRlci5ub2RlU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdXQucG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdXQucG9zICsgJGN1dC5ub2RlQWZ0ZXIubm9kZVNpemUgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudHIuZG9jLnNsaWNlKCRsYXN0Tm9kZS5wb3MsICRjdXQucG9zKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3V0IGlmIHRoZXJlXCJzIG5vdyBhbm90aGVyIGxpc3QgZm9sbG93aW5nIGFuZCBqb2luIHRoZW1cbiAgICAgICAgICAgIC8vIGFzIGluLCBbbGlzdCwgcCwgbGlzdF0gPT4gW2xpc3Qgd2l0aCBwLCBsaXN0XSwgYW5kIHdlIHdhbnQgW2pvaW5lZCBsaXN0XVxuICAgICAgICAgICAgY29uc3QgJHBvc3RDdXQgPSB0ci5kb2MucmVzb2x2ZShcbiAgICAgICAgICAgICAgICB0ci5tYXBwaW5nLm1hcCgkY3V0LnBvcyArICRjdXQubm9kZUFmdGVyLm5vZGVTaXplKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJHBvc3RDdXQubm9kZUJlZm9yZSAmJlxuICAgICAgICAgICAgICAgICRwb3N0Q3V0Lm5vZGVBZnRlciAmJlxuICAgICAgICAgICAgICAgICRwb3N0Q3V0Lm5vZGVCZWZvcmUudHlwZSA9PT0gJHBvc3RDdXQubm9kZUFmdGVyLnR5cGUgJiZcbiAgICAgICAgICAgICAgICBbYnVsbGV0TGlzdCwgb3JkZXJlZExpc3RdLmluZGV4T2YoJHBvc3RDdXQubm9kZUJlZm9yZS50eXBlKSA+IC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0ciA9IHRyLmpvaW4oJHBvc3RDdXQucG9zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2godHIuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGlzSW5zaWRlTGlzdEl0ZW0gPSAoc3RhdGU6IEVkaXRvclN0YXRlKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyAkZnJvbSB9ID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgIGNvbnN0IHsgbGlzdEl0ZW0sIHBhcmFncmFwaCB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuXG4gICAgaWYgKHN0YXRlLnNlbGVjdGlvbiBpbnN0YW5jZW9mIEdhcEN1cnNvcikge1xuICAgICAgICByZXR1cm4gJGZyb20ucGFyZW50LnR5cGUgPT09IGxpc3RJdGVtO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIGhhc1BhcmVudE5vZGVPZlR5cGUobGlzdEl0ZW0pKHN0YXRlLnNlbGVjdGlvbikgJiZcbiAgICAgICAgJGZyb20ucGFyZW50LnR5cGUgPT09IHBhcmFncmFwaFxuICAgICk7XG59O1xuXG5jb25zdCBjYW5Ub0pvaW5Ub1ByZXZpb3VzTGlzdEl0ZW0gPSAoc3RhdGU6IEVkaXRvclN0YXRlKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyAkZnJvbSB9ID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgIGNvbnN0IHsgYnVsbGV0TGlzdCwgb3JkZXJlZExpc3QgfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcblxuICAgIGNvbnN0ICRiZWZvcmUgPSBzdGF0ZS5kb2MucmVzb2x2ZSgkZnJvbS5wb3MgLSAxKTtcbiAgICBsZXQgbm9kZUJlZm9yZSA9ICRiZWZvcmUgPyAkYmVmb3JlLm5vZGVCZWZvcmUgOiBudWxsO1xuXG4gICAgaWYgKHN0YXRlLnNlbGVjdGlvbiBpbnN0YW5jZW9mIEdhcEN1cnNvcikge1xuICAgICAgICBub2RlQmVmb3JlID0gJGZyb20ubm9kZUJlZm9yZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICAhIW5vZGVCZWZvcmUgJiYgW2J1bGxldExpc3QsIG9yZGVyZWRMaXN0XS5pbmRleE9mKG5vZGVCZWZvcmUudHlwZSkgPiAtMVxuICAgICk7XG59O1xuXG5jb25zdCBjYW5PdXRkZW50ID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IHsgcGFyZW50IH0gPSBzdGF0ZS5zZWxlY3Rpb24uJGZyb207XG4gICAgY29uc3QgeyBsaXN0SXRlbSwgcGFyYWdyYXBoIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG5cbiAgICBpZiAoc3RhdGUuc2VsZWN0aW9uIGluc3RhbmNlb2YgR2FwQ3Vyc29yKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnQudHlwZSA9PT0gbGlzdEl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgcGFyZW50LnR5cGUgPT09IHBhcmFncmFwaCAmJiBoYXNQYXJlbnROb2RlT2ZUeXBlKGxpc3RJdGVtKShzdGF0ZS5zZWxlY3Rpb24pXG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnRlcktleUNvbW1hbmQ6IENvbW1hbmQgPSAoc3RhdGUsIGRpc3BhdGNoKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3Rpb24gfSA9IHN0YXRlO1xuICAgIGlmIChzZWxlY3Rpb24uZW1wdHkpIHtcbiAgICAgICAgY29uc3QgeyAkZnJvbSB9ID0gc2VsZWN0aW9uO1xuICAgICAgICBjb25zdCB7IGxpc3RJdGVtLCBjb2RlQmxvY2sgfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcbiAgICAgICAgY29uc3Qgbm9kZSA9ICRmcm9tLm5vZGUoJGZyb20uZGVwdGgpO1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gJGZyb20ubm9kZSgkZnJvbS5kZXB0aCAtIDEpO1xuXG4gICAgICAgIGlmICh3cmFwcGVyICYmIHdyYXBwZXIudHlwZSA9PT0gbGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIC8qKiBDaGVjayBpZiB0aGUgd3JhcHBlciBoYXMgYW55IHZpc2libGUgY29udGVudCAqL1xuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckhhc0NvbnRlbnQgPSBoYXNWaXNpYmxlQ29udGVudCh3cmFwcGVyKTtcbiAgICAgICAgICAgIGlmIChpc05vZGVFbXB0eShub2RlKSAmJiAhd3JhcHBlckhhc0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0ZGVudExpc3QoKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaGFzUGFyZW50Tm9kZU9mVHlwZShjb2RlQmxvY2spKHNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BsaXRMaXN0SXRlbShsaXN0SXRlbSkoc3RhdGUsIGRpc3BhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgYmFja3NwYWNlS2V5Q29tbWFuZCA9IGJhc2VDb21tYW5kLmNoYWluQ29tbWFuZHMoXG4gICAgLy8gaWYgd2VcInJlIGF0IHRoZSBzdGFydCBvZiBhIGxpc3QgaXRlbSwgd2UgbmVlZCB0byBlaXRoZXIgYmFja3NwYWNlXG4gICAgLy8gZGlyZWN0bHkgdG8gYW4gZW1wdHkgbGlzdCBpdGVtIGFib3ZlLCBvciBvdXRkZW50IHRoaXMgbm9kZVxuICAgIGZpbHRlcihcbiAgICAgICAgW1xuICAgICAgICAgICAgaXNFbXB0eVNlbGVjdGlvbkF0U3RhcnQsXG5cbiAgICAgICAgICAgIC8vIGxpc3QgaXRlbXMgbWlnaHQgaGF2ZSBtdWx0aXBsZSBwYXJhZ3JhcGhzOyBvbmx5IGRvIHRoaXMgYXQgdGhlIGZpcnN0IG9uZVxuICAgICAgICAgICAgaXNGaXJzdENoaWxkT2ZQYXJlbnQsXG4gICAgICAgICAgICBjYW5PdXRkZW50LFxuICAgICAgICBdLFxuICAgICAgICBiYXNlQ29tbWFuZC5jaGFpbkNvbW1hbmRzKGRlbGV0ZVByZXZpb3VzRW1wdHlMaXN0SXRlbSwgb3V0ZGVudExpc3QoKSksXG4gICAgKSxcblxuICAgIC8vIGlmIHdlXCJyZSBqdXN0IGluc2lkZSBhIHBhcmFncmFwaCBub2RlIChvciBnYXBjdXJzb3IgaXMgc2hvd24pIGFuZCBiYWNrc3BhY2UsIHRoZW4gdHJ5IHRvIGpvaW5cbiAgICAvLyB0aGUgdGV4dCB0byB0aGUgcHJldmlvdXMgbGlzdCBpdGVtLCBpZiBvbmUgZXhpc3RzXG4gICAgZmlsdGVyKFxuICAgICAgICBbaXNFbXB0eVNlbGVjdGlvbkF0U3RhcnQsIGNhblRvSm9pblRvUHJldmlvdXNMaXN0SXRlbV0sXG4gICAgICAgIGpvaW5Ub1ByZXZpb3VzTGlzdEl0ZW0sXG4gICAgKSxcbik7XG5cbi8qKlxuICogSW1wbGVtZXRhdGlvbiB0YWtlbiBhbmQgbW9kaWZpZWQgZm9yIG91ciBuZWVkcyBmcm9tIFBNXG4gKiBAcGFyYW0gaXRlbVR5cGUgTm9kZVxuICogU3BsaXRzIHRoZSBsaXN0IGl0ZW1zLCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbiB0YWtlIGZyb20gUE1cbiAqL1xuZnVuY3Rpb24gc3BsaXRMaXN0SXRlbShpdGVtVHlwZTogTm9kZVR5cGUpOiBDb21tYW5kIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGRpc3BhdGNoKSB7XG4gICAgICAgIGNvbnN0IHJlZiA9IHN0YXRlLnNlbGVjdGlvbiBhcyBOb2RlU2VsZWN0aW9uO1xuICAgICAgICBjb25zdCAkZnJvbSA9IHJlZi4kZnJvbTtcbiAgICAgICAgY29uc3QgJHRvID0gcmVmLiR0bztcbiAgICAgICAgY29uc3Qgbm9kZSA9IHJlZi5ub2RlO1xuICAgICAgICBpZiAoKG5vZGUgJiYgbm9kZS5pc0Jsb2NrKSB8fCAkZnJvbS5kZXB0aCA8IDIgfHwgISRmcm9tLnNhbWVQYXJlbnQoJHRvKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyYW5kUGFyZW50ID0gJGZyb20ubm9kZSgtMSk7XG4gICAgICAgIGlmIChncmFuZFBhcmVudC50eXBlICE9PSBpdGVtVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKiAtLT4gVGhlIGZvbGxvd2luZyBsaW5lIGNoYW5nZWQgZnJvbSB0aGUgb3JpZ2luYWwgUE0gaW1wbGVtZW50YXRpb24gdG8gYWxsb3cgbGlzdCBhZGRpdGlvbnMgd2l0aCBtdWx0aXBsZSBwYXJhZ3JhcGhzICovXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChncmFuZFBhcmVudC5jb250ZW50IGFzIGFueSkuY29udGVudC5sZW5ndGggPD0gMSAmJlxuICAgICAgICAgICAgJGZyb20ucGFyZW50LmNvbnRlbnQuc2l6ZSA9PT0gMCAmJlxuICAgICAgICAgICAgIShncmFuZFBhcmVudC5jb250ZW50LnNpemUgPT09IDApXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gSW4gYW4gZW1wdHkgYmxvY2suIElmIHRoaXMgaXMgYSBuZXN0ZWQgbGlzdCwgdGhlIHdyYXBwaW5nXG4gICAgICAgICAgICAvLyBsaXN0IGl0ZW0gc2hvdWxkIGJlIHNwbGl0LiBPdGhlcndpc2UsIGJhaWwgb3V0IGFuZCBsZXQgbmV4dFxuICAgICAgICAgICAgLy8gY29tbWFuZCBoYW5kbGUgbGlmdGluZy5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkZnJvbS5kZXB0aCA9PT0gMiB8fFxuICAgICAgICAgICAgICAgICRmcm9tLm5vZGUoLTMpLnR5cGUgIT09IGl0ZW1UeXBlIHx8XG4gICAgICAgICAgICAgICAgJGZyb20uaW5kZXgoLTIpICE9PSAkZnJvbS5ub2RlKC0yKS5jaGlsZENvdW50IC0gMVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdyYXAgPSBGcmFnbWVudC5lbXB0eTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZWVwSXRlbSA9ICRmcm9tLmluZGV4KC0xKSA+IDA7XG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgYSBmcmFnbWVudCBjb250YWluaW5nIGVtcHR5IHZlcnNpb25zIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAvLyBmcm9tIHRoZSBvdXRlciBsaXN0IGl0ZW0gdG8gdGhlIHBhcmVudCBub2RlIG9mIHRoZSBjdXJzb3JcbiAgICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICRmcm9tLmRlcHRoIC0gKGtlZXBJdGVtID8gMSA6IDIpO1xuICAgICAgICAgICAgICAgICAgICBkID49ICRmcm9tLmRlcHRoIC0gMztcbiAgICAgICAgICAgICAgICAgICAgZC0tXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXAgPSBGcmFnbWVudC5mcm9tKCRmcm9tLm5vZGUoZCkuY29weSh3cmFwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEFkZCBhIHNlY29uZCBsaXN0IGl0ZW0gd2l0aCBhbiBlbXB0eSBkZWZhdWx0IHN0YXJ0IG5vZGVcbiAgICAgICAgICAgICAgICB3cmFwID0gd3JhcC5hcHBlbmQoRnJhZ21lbnQuZnJvbShpdGVtVHlwZS5jcmVhdGVBbmRGaWxsKCkpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ciQxID0gc3RhdGUudHIucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgJGZyb20uYmVmb3JlKGtlZXBJdGVtID8gdW5kZWZpbmVkIDogLTEpLFxuICAgICAgICAgICAgICAgICAgICAkZnJvbS5hZnRlcigtMyksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTbGljZSh3cmFwLCBrZWVwSXRlbSA/IDMgOiAyLCAyKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRyJDEuc2V0U2VsZWN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAoc3RhdGUuc2VsZWN0aW9uLmNvbnN0cnVjdG9yIGFzIGFueSkubmVhcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyJDEuZG9jLnJlc29sdmUoJGZyb20ucG9zICsgKGtlZXBJdGVtID8gMyA6IDIpKSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHRyJDEuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0VHlwZSA9XG4gICAgICAgICAgICAkdG8ucG9zID09PSAkZnJvbS5lbmQoKVxuICAgICAgICAgICAgICAgID8gZ3JhbmRQYXJlbnQuY29udGVudE1hdGNoQXQoMCkuZGVmYXVsdFR5cGVcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgdHIgPSBzdGF0ZS50ci5kZWxldGUoJGZyb20ucG9zLCAkdG8ucG9zKTtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBuZXh0VHlwZSAmJiBbdW5kZWZpbmVkLCB7IHR5cGU6IG5leHRUeXBlIH1dO1xuXG4gICAgICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgICAgICAgZGlzcGF0Y2godHIuc3BsaXQoJGZyb20ucG9zLCAyLCB0eXBlcyBhcyBhbnkpLnNjcm9sbEludG9WaWV3KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG59XG5cbi8qKlxuICogTWVyZ2UgY2xvc2VzdCBidWxsZXQgbGlzdCBibG9ja3MgaW50byBvbmVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VMaXN0cyhsaXN0SXRlbTogTm9kZVR5cGUsIHJhbmdlOiBOb2RlUmFuZ2UpIHtcbiAgICByZXR1cm4gKGNvbW1hbmQ6IENvbW1hbmQpOiBDb21tYW5kID0+IHtcbiAgICAgICAgcmV0dXJuIChzdGF0ZSwgZGlzcGF0Y2gpID0+XG4gICAgICAgICAgICBjb21tYW5kKHN0YXRlLCB0ciA9PiB7XG4gICAgICAgICAgICAgICAgLyogd2Ugbm93IG5lZWQgdG8gaGFuZGxlIHRoZSBjYXNlIHRoYXQgd2UgbGlmdGVkIGEgc3VibGlzdCBvdXQsXG4gICAgICAgICAgICAgICAgICogYW5kIGFueSBsaXN0SXRlbXMgYXQgdGhlIGN1cnJlbnQgbGV2ZWwgZ2V0IHNoaWZ0ZWQgb3V0IHRvXG4gICAgICAgICAgICAgICAgICogdGhlaXIgb3duIG5ldyBsaXN0OyBlLmcuOlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogdW5vcmRlcmVkTGlzdFxuICAgICAgICAgICAgICAgICAqICBsaXN0SXRlbShBKVxuICAgICAgICAgICAgICAgICAqICBsaXN0SXRlbVxuICAgICAgICAgICAgICAgICAqICAgIHVub3JkZXJlZExpc3RcbiAgICAgICAgICAgICAgICAgKiAgICAgIGxpc3RJdGVtKEIpXG4gICAgICAgICAgICAgICAgICogIGxpc3RJdGVtKEMpXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBiZWNvbWVzLCBhZnRlciB1bmluZGVudGluZyB0aGUgZmlyc3QsIHRvcCBsZXZlbCBsaXN0SXRlbSwgQTpcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIGNvbnRlbnQgb2YgQVxuICAgICAgICAgICAgICAgICAqIHVub3JkZXJlZExpc3RcbiAgICAgICAgICAgICAgICAgKiAgbGlzdEl0ZW0oQilcbiAgICAgICAgICAgICAgICAgKiB1bm9yZGVyZWRMaXN0XG4gICAgICAgICAgICAgICAgICogIGxpc3RJdGVtKEMpXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBzbywgd2UgdHJ5IHRvIG1lcmdlIHRoZXNlIHR3byBsaXN0cyBpZiB0aGV5XCJyZSBvZiB0aGUgc2FtZSB0eXBlLCB0byBnaXZlOlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogY29udGVudCBvZiBBXG4gICAgICAgICAgICAgICAgICogdW5vcmRlcmVkTGlzdFxuICAgICAgICAgICAgICAgICAqICBsaXN0SXRlbShCKVxuICAgICAgICAgICAgICAgICAqICBsaXN0SXRlbShDKVxuICAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgY29uc3QgJHN0YXJ0OiBSZXNvbHZlZFBvcyA9IHN0YXRlLmRvYy5yZXNvbHZlKHJhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCAkZW5kOiBSZXNvbHZlZFBvcyA9IHN0YXRlLmRvYy5yZXNvbHZlKHJhbmdlLmVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgJGpvaW4gPSB0ci5kb2MucmVzb2x2ZSh0ci5tYXBwaW5nLm1hcChyYW5nZS5lbmQgLSAxKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICRqb2luLm5vZGVCZWZvcmUgJiZcbiAgICAgICAgICAgICAgICAgICAgJGpvaW4ubm9kZUFmdGVyICYmXG4gICAgICAgICAgICAgICAgICAgICRqb2luLm5vZGVCZWZvcmUudHlwZSA9PT0gJGpvaW4ubm9kZUFmdGVyLnR5cGVcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgJGVuZC5ub2RlQWZ0ZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbmQubm9kZUFmdGVyLnR5cGUgPT09IGxpc3RJdGVtICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAkZW5kLnBhcmVudC50eXBlID09PSAkc3RhcnQucGFyZW50LnR5cGVcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5qb2luKCRqb2luLnBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2godHIuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGRlbnRMaXN0KCk6IENvbW1hbmQge1xuICAgIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgICAgICAgY29uc3QgeyBsaXN0SXRlbSB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuICAgICAgICBjb25zdCB7ICRmcm9tLCAkdG8gfSA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICAgICAgaWYgKGlzSW5zaWRlTGlzdEl0ZW0oc3RhdGUpKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZVwicmUgYmFja3NwYWNpbmcgYXQgdGhlIHN0YXJ0IG9mIGEgbGlzdCBpdGVtLCB1bmluZGVudCBpdFxuICAgICAgICAgICAgLy8gdGFrZSB0aGUgdGhlIHJhbmdlIG9mIG5vZGVzIHdlIG1pZ2h0IGJlIGxpZnRpbmdcblxuICAgICAgICAgICAgLy8gdGhlIHByZWRpY2F0ZSBpcyBmb3Igd2hlbiB5b3VcInJlIGJhY2tzcGFjaW5nIGEgdG9wIGxldmVsIGxpc3QgaXRlbTpcbiAgICAgICAgICAgIC8vIHdlIGRvblwidCB3YW50IHRvIGdvIHVwIHBhc3QgdGhlIGRvYyBub2RlLCBvdGhlcndpc2UgdGhlIHJhbmdlXG4gICAgICAgICAgICAvLyB0byBjbGVhciB3aWxsIGluY2x1ZGUgZXZlcnl0aGluZ1xuICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSAkZnJvbS5ibG9ja1JhbmdlKFxuICAgICAgICAgICAgICAgICR0byxcbiAgICAgICAgICAgICAgICBub2RlID0+IG5vZGUuY2hpbGRDb3VudCA+IDAgJiYgbm9kZS5maXJzdENoaWxkICYmIG5vZGUuZmlyc3RDaGlsZC50eXBlID09PSBsaXN0SXRlbSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcG9zZShcbiAgICAgICAgICAgICAgICBtZXJnZUxpc3RzKGxpc3RJdGVtLCByYW5nZSksIC8vIDIuIENoZWNrIGlmIEkgbmVlZCB0byBtZXJnZSBuZWFyZXN0IGxpc3RcbiAgICAgICAgICAgICAgICBiYXNlTGlzdENvbW1hbmQubGlmdExpc3RJdGVtLCAvLyAxLiBGaXJzdCBsaWZ0IGxpc3QgaXRlbVxuICAgICAgICAgICAgKShsaXN0SXRlbSkoc3RhdGUsIGRpc3BhdGNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHdlIGNhbiBzaW5rIHRoZSBsaXN0LlxuICpcbiAqIEByZXR1cm5zIHRydWUgaWYgd2UgY2FuIHNpbmsgdGhlIGxpc3QsIGZhbHNlIGlmIHdlIHJlYWNoIHRoZSBtYXggaW5kZW50YXRpb24gbGV2ZWxcbiAqL1xuZnVuY3Rpb24gY2FuU2luayhpbml0aWFsSW5kZW50YXRpb25MZXZlbDogbnVtYmVyLCBzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuIHtcbiAgICAvKlxuICAgICAgICAtIEtlZXAgZ29pbmcgZm9yd2FyZCBpbiBkb2N1bWVudCB1bnRpbCBpbmRlbnRhdGlvbiBvZiB0aGUgbm9kZSBpcyA8IHRoYW4gdGhlIGluaXRpYWxcbiAgICAgICAgLSBJZiBpbmRlbnRhdGlvbiBpcyBFVkVSID4gbWF4IGluZGVudGF0aW9uLCByZXR1cm4gdHJ1ZSBhbmQgZG9uXCJ0IHNpbmsgdGhlIGxpc3RcbiAgICAgICAgKi9cbiAgICBsZXQgY3VycmVudEluZGVudGF0aW9uTGV2ZWw6IG51bWJlcjtcbiAgICBsZXQgY3VycmVudFBvcyA9IHN0YXRlLnRyLnNlbGVjdGlvbi4kdG8ucG9zO1xuICAgIGRvIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRQb3MgPSBzdGF0ZS5kb2MucmVzb2x2ZShjdXJyZW50UG9zKTtcbiAgICAgICAgY3VycmVudEluZGVudGF0aW9uTGV2ZWwgPSBudW1iZXJOZXN0ZWRMaXN0cyhcbiAgICAgICAgICAgIHJlc29sdmVkUG9zLFxuICAgICAgICAgICAgc3RhdGUuc2NoZW1hLm5vZGVzLFxuICAgICAgICApO1xuICAgICAgICBpZiAoY3VycmVudEluZGVudGF0aW9uTGV2ZWwgPiBtYXhJbmRlbnRhdGlvbikge1xuICAgICAgICAgICAgLy8gQ2FuY2VsIHNpbmsgbGlzdC5cbiAgICAgICAgICAgIC8vIElmIGN1cnJlbnQgaW5kZW50YXRpb24gbGVzcyB0aGFuIHRoZSBpbml0aWFsLCBpdCB3b25cInQgYmVcbiAgICAgICAgICAgIC8vIGxhcmdlciB0aGFuIHRoZSBtYXgsIGFuZCB0aGUgbG9vcCB3aWxsIHRlcm1pbmF0ZSBhdCBlbmQgb2YgdGhpcyBpdGVyYXRpb25cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UG9zKys7XG4gICAgfSB3aGlsZSAoY3VycmVudEluZGVudGF0aW9uTGV2ZWwgPj0gaW5pdGlhbEluZGVudGF0aW9uTGV2ZWwpO1xuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRlbnRMaXN0KCk6IENvbW1hbmQge1xuICAgIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgICAgICAgY29uc3QgeyBsaXN0SXRlbSB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuICAgICAgICBpZiAoaXNJbnNpZGVMaXN0SXRlbShzdGF0ZSkpIHtcbiAgICAgICAgICAgIC8vIFJlY29yZCBpbml0aWFsIGxpc3QgaW5kZW50YXRpb25cbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxJbmRlbnRhdGlvbkxldmVsID0gbnVtYmVyTmVzdGVkTGlzdHMoXG4gICAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0aW9uLiRmcm9tLFxuICAgICAgICAgICAgICAgIHN0YXRlLnNjaGVtYS5ub2RlcyxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChjYW5TaW5rKGluaXRpYWxJbmRlbnRhdGlvbkxldmVsLCBzdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjb21wb3NlKFxuICAgICAgICAgICAgICAgICAgICBiYXNlTGlzdENvbW1hbmQuc2lua0xpc3RJdGVtLFxuICAgICAgICAgICAgICAgICkobGlzdEl0ZW0pKHN0YXRlLCBkaXNwYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpZnRMaXN0SXRlbXMoKTogQ29tbWFuZCB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBkaXNwYXRjaCkge1xuICAgICAgICBjb25zdCB7IHRyIH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3QgeyAkZnJvbSwgJHRvIH0gPSBzdGF0ZS5zZWxlY3Rpb247XG5cbiAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbigkZnJvbS5wb3MsICR0by5wb3MsIChub2RlLCBwb3MpID0+IHtcbiAgICAgICAgICAgIC8vIEZvbGxvd2luZyBjb25kaXRpb24gd2lsbCBlbnN1cmUgdGhhdCBibG9jayB0eXBlcyBwYXJhZ3JhcGgsIGhlYWRpbmcsIGNvZGVCbG9jaywgYmxvY2txdW90ZSwgcGFuZWwgYXJlIGxpZnRlZC5cbiAgICAgICAgICAgIC8vIGlzVGV4dGJsb2NrIGlzIHRydWUgZm9yIHBhcmFncmFwaCwgaGVhZGluZywgY29kZUJsb2NrLlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG5vZGUuaXNUZXh0YmxvY2sgfHxcbiAgICAgICAgICAgICAgICBub2RlLnR5cGUubmFtZSA9PT0gXCJibG9ja3F1b3RlXCIgfHxcbiAgICAgICAgICAgICAgICBub2RlLnR5cGUubmFtZSA9PT0gXCJwYW5lbFwiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWwgPSBuZXcgTm9kZVNlbGVjdGlvbih0ci5kb2MucmVzb2x2ZSh0ci5tYXBwaW5nLm1hcChwb3MpKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWwuJGZyb20uYmxvY2tSYW5nZShzZWwuJHRvKTtcblxuICAgICAgICAgICAgICAgIGlmICghcmFuZ2UgfHwgc2VsLiRmcm9tLnBhcmVudC50eXBlICE9PSBzdGF0ZS5zY2hlbWEubm9kZXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHJhbmdlICYmIGxpZnRUYXJnZXQocmFuZ2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHIubGlmdChyYW5nZSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgICAgICBkaXNwYXRjaCh0cik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xufVxuXG4vKipcbiAqIFNvbWV0aW1lcyBhIHNlbGVjdGlvbiBpbiB0aGUgZWRpdG9yIGNhbiBiZSBzbGlnaHRseSBvZmZzZXQsIGZvciBleGFtcGxlOlxuICogaXRcInMgcG9zc2libGUgZm9yIGEgc2VsZWN0aW9uIHRvIHN0YXJ0IG9yIGVuZCBhdCBhbiBlbXB0eSBub2RlIGF0IHRoZSB2ZXJ5IGVuZCBvZlxuICogYSBsaW5lLiBUaGlzIGlzblwidCBvYnZpb3VzIGJ5IGxvb2tpbmcgYXQgdGhlIGVkaXRvciBhbmQgaXRcInMgbGlrZWx5IG5vdCB3aGF0IHRoZVxuICogdXNlciBpbnRlbmRlZCAtIHNvIHdlIG5lZWQgdG8gYWRqdXN0IHRoZSBzZWxlY3Rpb24gYSBiaXQgaW4gc2NlbmFyaW9zIGxpa2UgdGhhdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkanVzdFNlbGVjdGlvbkluTGlzdChcbiAgICBkb2M6IE5vZGUsXG4gICAgc2VsZWN0aW9uOiBUZXh0U2VsZWN0aW9uLFxuKTogVGV4dFNlbGVjdGlvbiB7XG4gICAgY29uc3QgeyAkZnJvbSwgJHRvIH0gPSBzZWxlY3Rpb247XG5cbiAgICBjb25zdCBpc1NhbWVMaW5lID0gJGZyb20ucG9zID09PSAkdG8ucG9zO1xuXG4gICAgbGV0IHN0YXJ0UG9zID0gJGZyb20ucG9zO1xuICAgIGNvbnN0IGVuZFBvcyA9ICR0by5wb3M7XG5cbiAgICBpZiAoaXNTYW1lTGluZSAmJiBzdGFydFBvcyA9PT0gZG9jLm5vZGVTaXplIC0gMykge1xuICAgICAgICAvLyBMaW5lIGlzIGVtcHR5LCBkb25cInQgZG8gYW55dGhpbmdcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICAvLyBTZWxlY3Rpb24gc3RhcnRlZCBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb2YgYSBsaW5lIGFuZCB0aGVyZWZvciBwb2ludHMgdG8gdGhlIHByZXZpb3VzIGxpbmUuXG4gICAgaWYgKCRmcm9tLm5vZGVCZWZvcmUgJiYgIWlzU2FtZUxpbmUpIHtcbiAgICAgICAgc3RhcnRQb3MrKztcbiAgICAgICAgbGV0IG5vZGUgPSBkb2Mubm9kZUF0KHN0YXJ0UG9zKTtcbiAgICAgICAgd2hpbGUgKCFub2RlIHx8IChub2RlICYmICFub2RlLmlzVGV4dCkpIHtcbiAgICAgICAgICAgIHN0YXJ0UG9zKys7XG4gICAgICAgICAgICBub2RlID0gZG9jLm5vZGVBdChzdGFydFBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW5kUG9zID09PSBzdGFydFBvcykge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRTZWxlY3Rpb24oZG9jLnJlc29sdmUoc3RhcnRQb3MpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRleHRTZWxlY3Rpb24oZG9jLnJlc29sdmUoc3RhcnRQb3MpLCBkb2MucmVzb2x2ZShlbmRQb3MpKTtcbn1cblxuLy8gR2V0IHRoZSBkZXB0aCBvZiB0aGUgbmVhcmVzdCBhbmNlc3RvciBsaXN0XG5leHBvcnQgY29uc3Qgcm9vdExpc3REZXB0aCA9IChcbiAgICBwb3M6IFJlc29sdmVkUG9zLFxuICAgIG5vZGVzOiBSZWNvcmQ8c3RyaW5nLCBOb2RlVHlwZT4sXG4pID0+IHtcbiAgICBjb25zdCB7IGJ1bGxldExpc3QsIG9yZGVyZWRMaXN0LCBsaXN0SXRlbSB9ID0gbm9kZXM7XG4gICAgbGV0IGRlcHRoO1xuICAgIGZvciAobGV0IGkgPSBwb3MuZGVwdGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBwb3Mubm9kZShpKTtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gYnVsbGV0TGlzdCB8fCBub2RlLnR5cGUgPT09IG9yZGVyZWRMaXN0KSB7XG4gICAgICAgICAgICBkZXB0aCA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbm9kZS50eXBlICE9PSBidWxsZXRMaXN0ICYmXG4gICAgICAgICAgICBub2RlLnR5cGUgIT09IG9yZGVyZWRMaXN0ICYmXG4gICAgICAgICAgICBub2RlLnR5cGUgIT09IGxpc3RJdGVtXG4gICAgICAgICkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlcHRoO1xufTtcblxuLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIG5lc3RlZCBsaXN0cyB0aGF0IGFyZSBhbmNlc3RvcnMgb2YgdGhlIGdpdmVuIHNlbGVjdGlvblxuZXhwb3J0IGNvbnN0IG51bWJlck5lc3RlZExpc3RzID0gKFxuICAgIHJlc29sdmVkUG9zOiBSZXNvbHZlZFBvcyxcbiAgICBub2RlczogUmVjb3JkPHN0cmluZywgTm9kZVR5cGU+LFxuKSA9PiB7XG4gICAgY29uc3QgeyBidWxsZXRMaXN0LCBvcmRlcmVkTGlzdCB9ID0gbm9kZXM7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gcmVzb2x2ZWRQb3MuZGVwdGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSByZXNvbHZlZFBvcy5ub2RlKGkpO1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSBidWxsZXRMaXN0IHx8IG5vZGUudHlwZSA9PT0gb3JkZXJlZExpc3QpIHtcbiAgICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUxpc3QgPSAoXG4gICAgc3RhdGU6IEVkaXRvclN0YXRlLFxuICAgIGRpc3BhdGNoOiAodHI6IFRyYW5zYWN0aW9uKSA9PiB2b2lkLFxuICAgIHZpZXc6IEVkaXRvclZpZXcsXG4gICAgbGlzdFR5cGU6IFwiYnVsbGV0TGlzdFwiIHwgXCJvcmRlcmVkTGlzdFwiLFxuKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3Rpb24gfSA9IHN0YXRlO1xuICAgIGNvbnN0IGZyb21Ob2RlID0gc2VsZWN0aW9uLiRmcm9tLm5vZGUoc2VsZWN0aW9uLiRmcm9tLmRlcHRoIC0gMik7XG4gICAgY29uc3QgZW5kTm9kZSA9IHNlbGVjdGlvbi4kdG8ubm9kZShzZWxlY3Rpb24uJHRvLmRlcHRoIC0gMik7XG4gICAgaWYgKFxuICAgICAgICAhZnJvbU5vZGUgfHxcbiAgICAgICAgZnJvbU5vZGUudHlwZS5uYW1lICE9PSBsaXN0VHlwZSB8fFxuICAgICAgICAoIWVuZE5vZGUgfHwgZW5kTm9kZS50eXBlLm5hbWUgIT09IGxpc3RUeXBlKVxuICAgICkge1xuICAgICAgICByZXR1cm4gdG9nZ2xlTGlzdENvbW1hbmQobGlzdFR5cGUpKHN0YXRlLCBkaXNwYXRjaCwgdmlldyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVwdGggPSByb290TGlzdERlcHRoKHNlbGVjdGlvbi4kdG8sIHN0YXRlLnNjaGVtYS5ub2Rlcyk7XG4gICAgICAgIGxldCB0ciA9IGxpZnRGb2xsb3dpbmdMaXN0KFxuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICBzZWxlY3Rpb24uJHRvLnBvcyxcbiAgICAgICAgICAgIHNlbGVjdGlvbi4kdG8uZW5kKGRlcHRoKSxcbiAgICAgICAgICAgIGRlcHRoIHx8IDAsXG4gICAgICAgICAgICBzdGF0ZS50cixcbiAgICAgICAgKTtcbiAgICAgICAgdHIgPSBsaWZ0U2VsZWN0aW9uTGlzdChzdGF0ZSwgdHIpO1xuICAgICAgICBkaXNwYXRjaCh0cik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgb2YgaXMgc2VsZWN0aW9uIGlzIGluc2lkZSBhIGxpc3Qgb2YgdGhlIHNwZWNpZmllZCB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luc2lkZUxpc3QoXG4gICAgc3RhdGU6IEVkaXRvclN0YXRlLFxuICAgIGxpc3RUeXBlOiBcImJ1bGxldExpc3RcIiB8IFwib3JkZXJlZExpc3RcIixcbikge1xuICAgIGNvbnN0IHsgJGZyb20gfSA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICBjb25zdCBwYXJlbnQgPSAkZnJvbS5ub2RlKC0yKTtcbiAgICBjb25zdCBncmFuZGdyYW5kUGFyZW50ID0gJGZyb20ubm9kZSgtMyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICAocGFyZW50ICYmIHBhcmVudC50eXBlID09PSBzdGF0ZS5zY2hlbWEubm9kZXNbbGlzdFR5cGVdKSB8fFxuICAgICAgICAoZ3JhbmRncmFuZFBhcmVudCAmJiBncmFuZGdyYW5kUGFyZW50LnR5cGUgPT09IHN0YXRlLnNjaGVtYS5ub2Rlc1tsaXN0VHlwZV0pXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUxpc3RDb21tYW5kKFxuICAgIGxpc3RUeXBlOiBcImJ1bGxldExpc3RcIiB8IFwib3JkZXJlZExpc3RcIixcbik6IENvbW1hbmQge1xuICAgIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgZGlzcGF0Y2gsIHZpZXcpIHtcbiAgICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChcbiAgICAgICAgICAgICAgICBzdGF0ZS50ci5zZXRTZWxlY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgIGFkanVzdFNlbGVjdGlvbkluTGlzdChzdGF0ZS5kb2MsIHN0YXRlLnNlbGVjdGlvbiBhcyBUZXh0U2VsZWN0aW9uKSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmlldykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSB2aWV3LnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHsgJGZyb20sICR0byB9ID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgICAgICBjb25zdCBpc1JhbmdlT2ZTaW5nbGVUeXBlID0gaXNSYW5nZU9mVHlwZShcbiAgICAgICAgICAgIHN0YXRlLmRvYyxcbiAgICAgICAgICAgICRmcm9tLFxuICAgICAgICAgICAgJHRvLFxuICAgICAgICAgICAgc3RhdGUuc2NoZW1hLm5vZGVzW2xpc3RUeXBlXSxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoaXNJbnNpZGVMaXN0KHN0YXRlLCBsaXN0VHlwZSkgJiYgaXNSYW5nZU9mU2luZ2xlVHlwZSkge1xuICAgICAgICAgICAgLy8gVW50b2dnbGVzIGxpc3RcbiAgICAgICAgICAgIHJldHVybiBsaWZ0TGlzdEl0ZW1zKCkoc3RhdGUsIGRpc3BhdGNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIENvbnZlcnRzIGxpc3QgdHlwZSBlLmcuIGJ1bGxldF9saXN0IC0+IG9yZGVyZWRfbGlzdCBpZiBuZWVkZWRcbiAgICAgICAgICAgIGlmICghaXNSYW5nZU9mU2luZ2xlVHlwZSkge1xuICAgICAgICAgICAgICAgIGxpZnRMaXN0SXRlbXMoKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gdmlldy5zdGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVtb3ZlIGFueSBpbnZhbGlkIG1hcmtzIHRoYXQgYXJlIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgICAgIGNvbnN0IHRyID0gc2FuaXRpemVTZWxlY3Rpb25NYXJrcyhzdGF0ZSk7XG4gICAgICAgICAgICBpZiAodHIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2godHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHZpZXcuc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXcmFwcyBzZWxlY3Rpb24gaW4gbGlzdFxuICAgICAgICAgICAgcmV0dXJuIHdyYXBJbkxpc3Qoc3RhdGUuc2NoZW1hLm5vZGVzW2xpc3RUeXBlXSkoc3RhdGUsIGRpc3BhdGNoKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVCdWxsZXRMaXN0KHZpZXc6IEVkaXRvclZpZXcpIHtcbiAgICByZXR1cm4gdG9nZ2xlTGlzdCh2aWV3LnN0YXRlLCB2aWV3LmRpc3BhdGNoLCB2aWV3LCBcImJ1bGxldExpc3RcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVPcmRlcmVkTGlzdCh2aWV3OiBFZGl0b3JWaWV3KSB7XG4gICAgcmV0dXJuIHRvZ2dsZUxpc3Qodmlldy5zdGF0ZSwgdmlldy5kaXNwYXRjaCwgdmlldywgXCJvcmRlcmVkTGlzdFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBJbkxpc3Qobm9kZVR5cGU6IE5vZGVUeXBlKTogQ29tbWFuZCB7XG4gICAgcmV0dXJuIGJhc2VDb21tYW5kLmF1dG9Kb2luKFxuICAgICAgICBiYXNlTGlzdENvbW1hbmQud3JhcEluTGlzdChub2RlVHlwZSksXG4gICAgICAgIChiZWZvcmUsIGFmdGVyKSA9PiBiZWZvcmUudHlwZSA9PT0gYWZ0ZXIudHlwZSAmJiBiZWZvcmUudHlwZSA9PT0gbm9kZVR5cGUsXG4gICAgKTtcbn1cbiJdfQ==