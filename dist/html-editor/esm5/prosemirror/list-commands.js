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
var maxIndentation = 5;
var deletePreviousEmptyListItem = function (state, dispatch) {
    var $from = state.selection.$from;
    var listItem = state.schema.nodes.listItem;
    var $cut = findCutBefore($from);
    if (!$cut || !$cut.nodeBefore || !($cut.nodeBefore.type === listItem)) {
        return false;
    }
    var previousListItemEmpty = $cut.nodeBefore.childCount === 1 && $cut.nodeBefore.firstChild && $cut.nodeBefore.firstChild.nodeSize <= 2;
    if (previousListItemEmpty) {
        var tr = state.tr;
        if (dispatch) {
            dispatch(tr
                .delete($cut.pos - $cut.nodeBefore.nodeSize, $from.pos)
                .scrollIntoView());
        }
        return true;
    }
    return false;
};
var ɵ0 = deletePreviousEmptyListItem;
var joinToPreviousListItem = function (state, dispatch) {
    var $from = state.selection.$from;
    var _a = state.schema.nodes, paragraph = _a.paragraph, listItem = _a.listItem, codeBlock = _a.codeBlock, bulletList = _a.bulletList, orderedList = _a.orderedList;
    var isGapCursorShown = state.selection instanceof GapCursor;
    var $cutPos = isGapCursorShown ? state.doc.resolve($from.pos + 1) : $from;
    var $cut = findCutBefore($cutPos);
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
            var $lastNode = $cut.doc.resolve($cut.pos - 1);
            while ($lastNode.parent.type !== paragraph) {
                $lastNode = state.doc.resolve($lastNode.pos - 1);
            }
            var tr = state.tr;
            if (isGapCursorShown) {
                var nodeBeforePos = findPositionOfNodeBefore(tr.selection);
                if (typeof nodeBeforePos !== "number") {
                    return false;
                }
                // append the codeblock to the list node
                var list = $cut.nodeBefore.copy($cut.nodeBefore.content.append(Fragment.from(listItem.createChecked({}, $cut.nodeAfter))));
                tr.replaceWith(nodeBeforePos, $from.pos + $cut.nodeAfter.nodeSize, list);
            }
            else {
                // take the text content of the paragraph and insert after the paragraph up until before the the cut
                tr = state.tr.step(new ReplaceAroundStep($lastNode.pos, $cut.pos + $cut.nodeAfter.nodeSize, $cut.pos + 1, $cut.pos + $cut.nodeAfter.nodeSize - 1, state.tr.doc.slice($lastNode.pos, $cut.pos), 0, true));
            }
            // find out if there"s now another list following and join them
            // as in, [list, p, list] => [list with p, list], and we want [joined list]
            var $postCut = tr.doc.resolve(tr.mapping.map($cut.pos + $cut.nodeAfter.nodeSize));
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
var ɵ1 = joinToPreviousListItem;
var isInsideListItem = function (state) {
    var $from = state.selection.$from;
    var _a = state.schema.nodes, listItem = _a.listItem, paragraph = _a.paragraph;
    if (state.selection instanceof GapCursor) {
        return $from.parent.type === listItem;
    }
    return (hasParentNodeOfType(listItem)(state.selection) &&
        $from.parent.type === paragraph);
};
var ɵ2 = isInsideListItem;
var canToJoinToPreviousListItem = function (state) {
    var $from = state.selection.$from;
    var _a = state.schema.nodes, bulletList = _a.bulletList, orderedList = _a.orderedList;
    var $before = state.doc.resolve($from.pos - 1);
    var nodeBefore = $before ? $before.nodeBefore : null;
    if (state.selection instanceof GapCursor) {
        nodeBefore = $from.nodeBefore;
    }
    return (!!nodeBefore && [bulletList, orderedList].indexOf(nodeBefore.type) > -1);
};
var ɵ3 = canToJoinToPreviousListItem;
var canOutdent = function (state) {
    var parent = state.selection.$from.parent;
    var _a = state.schema.nodes, listItem = _a.listItem, paragraph = _a.paragraph;
    if (state.selection instanceof GapCursor) {
        return parent.type === listItem;
    }
    return (parent.type === paragraph && hasParentNodeOfType(listItem)(state.selection));
};
var ɵ4 = canOutdent;
export var enterKeyCommand = function (state, dispatch) {
    var selection = state.selection;
    if (selection.empty) {
        var $from = selection.$from;
        var _a = state.schema.nodes, listItem = _a.listItem, codeBlock = _a.codeBlock;
        var node = $from.node($from.depth);
        var wrapper = $from.node($from.depth - 1);
        if (wrapper && wrapper.type === listItem) {
            /** Check if the wrapper has any visible content */
            var wrapperHasContent = hasVisibleContent(wrapper);
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
export var backspaceKeyCommand = baseCommand.chainCommands(
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
        var ref = state.selection;
        var $from = ref.$from;
        var $to = ref.$to;
        var node = ref.node;
        if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) {
            return false;
        }
        var grandParent = $from.node(-1);
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
                var wrap = Fragment.empty;
                var keepItem = $from.index(-1) > 0;
                // Build a fragment containing empty versions of the structure
                // from the outer list item to the parent node of the cursor
                for (var d = $from.depth - (keepItem ? 1 : 2); d >= $from.depth - 3; d--) {
                    wrap = Fragment.from($from.node(d).copy(wrap));
                }
                // Add a second list item with an empty default start node
                wrap = wrap.append(Fragment.from(itemType.createAndFill()));
                var tr$1 = state.tr.replace($from.before(keepItem ? undefined : -1), $from.after(-3), new Slice(wrap, keepItem ? 3 : 2, 2));
                tr$1.setSelection(state.selection.constructor.near(tr$1.doc.resolve($from.pos + (keepItem ? 3 : 2))));
                dispatch(tr$1.scrollIntoView());
            }
            return true;
        }
        var nextType = $to.pos === $from.end()
            ? grandParent.contentMatchAt(0).defaultType
            : undefined;
        var tr = state.tr.delete($from.pos, $to.pos);
        var types = nextType && [undefined, { type: nextType }];
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
    return function (command) {
        return function (state, dispatch) {
            return command(state, function (tr) {
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
                var $start = state.doc.resolve(range.start);
                var $end = state.doc.resolve(range.end);
                var $join = tr.doc.resolve(tr.mapping.map(range.end - 1));
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
    };
}
export function outdentList() {
    return function (state, dispatch) {
        var listItem = state.schema.nodes.listItem;
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        if (isInsideListItem(state)) {
            // if we"re backspacing at the start of a list item, unindent it
            // take the the range of nodes we might be lifting
            // the predicate is for when you"re backspacing a top level list item:
            // we don"t want to go up past the doc node, otherwise the range
            // to clear will include everything
            var range = $from.blockRange($to, function (node) { return node.childCount > 0 && node.firstChild && node.firstChild.type === listItem; });
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
    var currentIndentationLevel;
    var currentPos = state.tr.selection.$to.pos;
    do {
        var resolvedPos = state.doc.resolve(currentPos);
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
        var listItem = state.schema.nodes.listItem;
        if (isInsideListItem(state)) {
            // Record initial list indentation
            var initialIndentationLevel = numberNestedLists(state.selection.$from, state.schema.nodes);
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
        var tr = state.tr;
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        tr.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
            // Following condition will ensure that block types paragraph, heading, codeBlock, blockquote, panel are lifted.
            // isTextblock is true for paragraph, heading, codeBlock.
            if (node.isTextblock ||
                node.type.name === "blockquote" ||
                node.type.name === "panel") {
                var sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
                var range = sel.$from.blockRange(sel.$to);
                if (!range || sel.$from.parent.type !== state.schema.nodes.listItem) {
                    return false;
                }
                var target = range && liftTarget(range);
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
    var $from = selection.$from, $to = selection.$to;
    var isSameLine = $from.pos === $to.pos;
    var startPos = $from.pos;
    var endPos = $to.pos;
    if (isSameLine && startPos === doc.nodeSize - 3) {
        // Line is empty, don"t do anything
        return selection;
    }
    // Selection started at the very beginning of a line and therefor points to the previous line.
    if ($from.nodeBefore && !isSameLine) {
        startPos++;
        var node = doc.nodeAt(startPos);
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
export var rootListDepth = function (pos, nodes) {
    var bulletList = nodes.bulletList, orderedList = nodes.orderedList, listItem = nodes.listItem;
    var depth;
    for (var i = pos.depth - 1; i > 0; i--) {
        var node = pos.node(i);
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
export var numberNestedLists = function (resolvedPos, nodes) {
    var bulletList = nodes.bulletList, orderedList = nodes.orderedList;
    var count = 0;
    for (var i = resolvedPos.depth - 1; i > 0; i--) {
        var node = resolvedPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            count += 1;
        }
    }
    return count;
};
export var toggleList = function (state, dispatch, view, listType) {
    var selection = state.selection;
    var fromNode = selection.$from.node(selection.$from.depth - 2);
    var endNode = selection.$to.node(selection.$to.depth - 2);
    if (!fromNode ||
        fromNode.type.name !== listType ||
        (!endNode || endNode.type.name !== listType)) {
        return toggleListCommand(listType)(state, dispatch, view);
    }
    else {
        var depth = rootListDepth(selection.$to, state.schema.nodes);
        var tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth || 0, state.tr);
        tr = liftSelectionList(state, tr);
        dispatch(tr);
        return true;
    }
};
/**
 * Check of is selection is inside a list of the specified type
 */
export function isInsideList(state, listType) {
    var $from = state.selection.$from;
    var parent = $from.node(-2);
    var grandgrandParent = $from.node(-3);
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
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var isRangeOfSingleType = isRangeOfType(state.doc, $from, $to, state.schema.nodes[listType]);
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
            var tr = sanitizeSelectionMarks(state);
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
    return baseCommand.autoJoin(baseListCommand.wrapInList(nodeType), function (before, after) { return before.type === after.type && before.type === nodeType; });
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jb21tYW5kcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsicHJvc2VtaXJyb3IvbGlzdC1jb21tYW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsUUFBUSxFQUEwQyxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRixPQUFPLEtBQUssZUFBZSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBYyxhQUFhLEVBQUUsYUFBYSxFQUFjLE1BQU0sbUJBQW1CLENBQUM7QUFDekYsT0FBTyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR2hGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMs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UUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQWdCO0lBQzdDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFnQjtJQUM5QyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLFFBQWtCO0lBQ3pDLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FDdkIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDcEMsVUFBQyxNQUFNLEVBQUUsS0FBSyxJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUF0RCxDQUFzRCxDQUM1RSxDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGJhc2VDb21tYW5kIGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtHYXBDdXJzb3J9IGZyb20gXCJwcm9zZW1pcnJvci1nYXBjdXJzb3JcIjtcbmltcG9ydCB7RnJhZ21lbnQsIE5vZGUsIE5vZGVSYW5nZSwgTm9kZVR5cGUsIFJlc29sdmVkUG9zLCBTbGljZX0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5pbXBvcnQgKiBhcyBiYXNlTGlzdENvbW1hbmQgZnJvbSBcInByb3NlbWlycm9yLXNjaGVtYS1saXN0XCI7XG5pbXBvcnQge0VkaXRvclN0YXRlLCBOb2RlU2VsZWN0aW9uLCBUZXh0U2VsZWN0aW9uLCBUcmFuc2FjdGlvbn0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XG5pbXBvcnQge2xpZnRUYXJnZXQsIFJlcGxhY2VBcm91bmRTdGVwfSBmcm9tIFwicHJvc2VtaXJyb3ItdHJhbnNmb3JtXCI7XG5pbXBvcnQge2ZpbmRQb3NpdGlvbk9mTm9kZUJlZm9yZSwgaGFzUGFyZW50Tm9kZU9mVHlwZX0gZnJvbSBcInByb3NlbWlycm9yLXV0aWxzXCI7XG5pbXBvcnQge0VkaXRvclZpZXd9IGZyb20gXCJwcm9zZW1pcnJvci12aWV3XCI7XG5pbXBvcnQge0NvbW1hbmR9IGZyb20gXCIuL2NvbW1hbmRcIjtcbmltcG9ydCB7ZmlsdGVyfSBmcm9tIFwiLi9jb21tYW5kcy9maWx0ZXJcIjtcbmltcG9ydCB7aXNFbXB0eVNlbGVjdGlvbkF0U3RhcnR9IGZyb20gXCIuL2NvbW1hbmRzL2lzLWVtcHR5LXNlbGVjdGlvbi1hdC1zdGFydFwiO1xuaW1wb3J0IHtpc0ZpcnN0Q2hpbGRPZlBhcmVudH0gZnJvbSBcIi4vY29tbWFuZHMvaXMtZmlyc3QtY2hpbGQtb2YtcGFyZW50XCI7XG5pbXBvcnQge2hhc1Zpc2libGVDb250ZW50LCBpc05vZGVFbXB0eX0gZnJvbSBcIi4vZG9jdW1lbnQtdXRpbHNcIjtcbmltcG9ydCB7bGlmdEZvbGxvd2luZ0xpc3R9IGZyb20gXCIuL2xpc3QvdHJhbnNmb3Jtcy9saWZ0LWZvbGxvd2luZy1saXN0XCI7XG5pbXBvcnQge2xpZnRTZWxlY3Rpb25MaXN0fSBmcm9tIFwiLi9saXN0L3RyYW5zZm9ybXMvbGlmdC1zZWxlY3Rpb24tbGlzdFwiO1xuaW1wb3J0IHtzYW5pdGl6ZVNlbGVjdGlvbk1hcmtzfSBmcm9tIFwiLi9tYXJrLXV0aWxzXCI7XG5pbXBvcnQge2NvbXBvc2UsIGlzUmFuZ2VPZlR5cGV9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge2ZpbmRDdXRCZWZvcmV9IGZyb20gXCIuL3V0aWxzL2ZpbmQtY3V0LWJlZm9yZVwiO1xuXG5jb25zdCBtYXhJbmRlbnRhdGlvbiA9IDU7XG5cbmNvbnN0IGRlbGV0ZVByZXZpb3VzRW1wdHlMaXN0SXRlbTogQ29tbWFuZCA9IChzdGF0ZSwgZGlzcGF0Y2gpID0+IHtcbiAgICBjb25zdCB7ICRmcm9tIH0gPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgY29uc3QgeyBsaXN0SXRlbSB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuXG4gICAgY29uc3QgJGN1dCA9IGZpbmRDdXRCZWZvcmUoJGZyb20pO1xuICAgIGlmICghJGN1dCB8fCAhJGN1dC5ub2RlQmVmb3JlIHx8ICEoJGN1dC5ub2RlQmVmb3JlLnR5cGUgPT09IGxpc3RJdGVtKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNMaXN0SXRlbUVtcHR5ID0gJGN1dC5ub2RlQmVmb3JlLmNoaWxkQ291bnQgPT09IDEgJiYgJGN1dC5ub2RlQmVmb3JlLmZpcnN0Q2hpbGQgJiYgJGN1dC5ub2RlQmVmb3JlLmZpcnN0Q2hpbGQubm9kZVNpemUgPD0gMjtcblxuICAgIGlmIChwcmV2aW91c0xpc3RJdGVtRW1wdHkpIHtcbiAgICAgICAgY29uc3QgeyB0ciB9ID0gc3RhdGU7XG5cbiAgICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChcbiAgICAgICAgICAgICAgICB0clxuICAgICAgICAgICAgICAgICAgICAuZGVsZXRlKCRjdXQucG9zIC0gJGN1dC5ub2RlQmVmb3JlLm5vZGVTaXplLCAkZnJvbS5wb3MpXG4gICAgICAgICAgICAgICAgICAgIC5zY3JvbGxJbnRvVmlldygpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBqb2luVG9QcmV2aW91c0xpc3RJdGVtOiBDb21tYW5kID0gKHN0YXRlLCBkaXNwYXRjaCkgPT4ge1xuICAgIGNvbnN0IHsgJGZyb20gfSA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICBjb25zdCB7XG4gICAgICAgIHBhcmFncmFwaCxcbiAgICAgICAgbGlzdEl0ZW0sXG4gICAgICAgIGNvZGVCbG9jayxcbiAgICAgICAgYnVsbGV0TGlzdCxcbiAgICAgICAgb3JkZXJlZExpc3QsXG4gICAgfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcbiAgICBjb25zdCBpc0dhcEN1cnNvclNob3duID0gc3RhdGUuc2VsZWN0aW9uIGluc3RhbmNlb2YgR2FwQ3Vyc29yO1xuICAgIGNvbnN0ICRjdXRQb3MgPSBpc0dhcEN1cnNvclNob3duID8gc3RhdGUuZG9jLnJlc29sdmUoJGZyb20ucG9zICsgMSkgOiAkZnJvbTtcbiAgICBjb25zdCAkY3V0ID0gZmluZEN1dEJlZm9yZSgkY3V0UG9zKTtcbiAgICBpZiAoISRjdXQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHNlZSBpZiB0aGUgY29udGFpbmluZyBub2RlIGlzIGEgbGlzdFxuICAgIGlmIChcbiAgICAgICAgJGN1dC5ub2RlQmVmb3JlICYmXG4gICAgICAgIFtidWxsZXRMaXN0LCBvcmRlcmVkTGlzdF0uaW5kZXhPZigkY3V0Lm5vZGVCZWZvcmUudHlwZSkgPiAtMVxuICAgICkge1xuICAgICAgICAvLyBhbmQgdGhlIG5vZGUgYWZ0ZXIgdGhpcyBpcyBhIHBhcmFncmFwaCBvciBhIGNvZGVCbG9ja1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAkY3V0Lm5vZGVBZnRlciAmJlxuICAgICAgICAgICAgKCRjdXQubm9kZUFmdGVyLnR5cGUgPT09IHBhcmFncmFwaCB8fCAkY3V0Lm5vZGVBZnRlci50eXBlID09PSBjb2RlQmxvY2spXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gZmluZCB0aGUgbmVhcmVzdCBwYXJhZ3JhcGggdGhhdCBwcmVjZWRlcyB0aGlzIG5vZGVcbiAgICAgICAgICAgIGxldCAkbGFzdE5vZGUgPSAkY3V0LmRvYy5yZXNvbHZlKCRjdXQucG9zIC0gMSk7XG5cbiAgICAgICAgICAgIHdoaWxlICgkbGFzdE5vZGUucGFyZW50LnR5cGUgIT09IHBhcmFncmFwaCkge1xuICAgICAgICAgICAgICAgICRsYXN0Tm9kZSA9IHN0YXRlLmRvYy5yZXNvbHZlKCRsYXN0Tm9kZS5wb3MgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHsgdHIgfSA9IHN0YXRlO1xuICAgICAgICAgICAgaWYgKGlzR2FwQ3Vyc29yU2hvd24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlQmVmb3JlUG9zID0gZmluZFBvc2l0aW9uT2ZOb2RlQmVmb3JlKHRyLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlQmVmb3JlUG9zICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIHRoZSBjb2RlYmxvY2sgdG8gdGhlIGxpc3Qgbm9kZVxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSAkY3V0Lm5vZGVCZWZvcmUuY29weShcbiAgICAgICAgICAgICAgICAgICAgJGN1dC5ub2RlQmVmb3JlLmNvbnRlbnQuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgRnJhZ21lbnQuZnJvbShsaXN0SXRlbS5jcmVhdGVDaGVja2VkKHt9LCAkY3V0Lm5vZGVBZnRlcikpLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdHIucmVwbGFjZVdpdGgoXG4gICAgICAgICAgICAgICAgICAgIG5vZGVCZWZvcmVQb3MsXG4gICAgICAgICAgICAgICAgICAgICRmcm9tLnBvcyArICRjdXQubm9kZUFmdGVyLm5vZGVTaXplLFxuICAgICAgICAgICAgICAgICAgICBsaXN0LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHRha2UgdGhlIHRleHQgY29udGVudCBvZiB0aGUgcGFyYWdyYXBoIGFuZCBpbnNlcnQgYWZ0ZXIgdGhlIHBhcmFncmFwaCB1cCB1bnRpbCBiZWZvcmUgdGhlIHRoZSBjdXRcbiAgICAgICAgICAgICAgICB0ciA9IHN0YXRlLnRyLnN0ZXAoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZXBsYWNlQXJvdW5kU3RlcChcbiAgICAgICAgICAgICAgICAgICAgICAgICRsYXN0Tm9kZS5wb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3V0LnBvcyArICRjdXQubm9kZUFmdGVyLm5vZGVTaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgJGN1dC5wb3MgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgJGN1dC5wb3MgKyAkY3V0Lm5vZGVBZnRlci5ub2RlU2l6ZSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS50ci5kb2Muc2xpY2UoJGxhc3ROb2RlLnBvcywgJGN1dC5wb3MpLFxuICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZmluZCBvdXQgaWYgdGhlcmVcInMgbm93IGFub3RoZXIgbGlzdCBmb2xsb3dpbmcgYW5kIGpvaW4gdGhlbVxuICAgICAgICAgICAgLy8gYXMgaW4sIFtsaXN0LCBwLCBsaXN0XSA9PiBbbGlzdCB3aXRoIHAsIGxpc3RdLCBhbmQgd2Ugd2FudCBbam9pbmVkIGxpc3RdXG4gICAgICAgICAgICBjb25zdCAkcG9zdEN1dCA9IHRyLmRvYy5yZXNvbHZlKFxuICAgICAgICAgICAgICAgIHRyLm1hcHBpbmcubWFwKCRjdXQucG9zICsgJGN1dC5ub2RlQWZ0ZXIubm9kZVNpemUpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkcG9zdEN1dC5ub2RlQmVmb3JlICYmXG4gICAgICAgICAgICAgICAgJHBvc3RDdXQubm9kZUFmdGVyICYmXG4gICAgICAgICAgICAgICAgJHBvc3RDdXQubm9kZUJlZm9yZS50eXBlID09PSAkcG9zdEN1dC5ub2RlQWZ0ZXIudHlwZSAmJlxuICAgICAgICAgICAgICAgIFtidWxsZXRMaXN0LCBvcmRlcmVkTGlzdF0uaW5kZXhPZigkcG9zdEN1dC5ub2RlQmVmb3JlLnR5cGUpID4gLTFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRyID0gdHIuam9pbigkcG9zdEN1dC5wb3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh0ci5zY3JvbGxJbnRvVmlldygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgaXNJbnNpZGVMaXN0SXRlbSA9IChzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7ICRmcm9tIH0gPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgY29uc3QgeyBsaXN0SXRlbSwgcGFyYWdyYXBoIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG5cbiAgICBpZiAoc3RhdGUuc2VsZWN0aW9uIGluc3RhbmNlb2YgR2FwQ3Vyc29yKSB7XG4gICAgICAgIHJldHVybiAkZnJvbS5wYXJlbnQudHlwZSA9PT0gbGlzdEl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgaGFzUGFyZW50Tm9kZU9mVHlwZShsaXN0SXRlbSkoc3RhdGUuc2VsZWN0aW9uKSAmJlxuICAgICAgICAkZnJvbS5wYXJlbnQudHlwZSA9PT0gcGFyYWdyYXBoXG4gICAgKTtcbn07XG5cbmNvbnN0IGNhblRvSm9pblRvUHJldmlvdXNMaXN0SXRlbSA9IChzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7ICRmcm9tIH0gPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgY29uc3QgeyBidWxsZXRMaXN0LCBvcmRlcmVkTGlzdCB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuXG4gICAgY29uc3QgJGJlZm9yZSA9IHN0YXRlLmRvYy5yZXNvbHZlKCRmcm9tLnBvcyAtIDEpO1xuICAgIGxldCBub2RlQmVmb3JlID0gJGJlZm9yZSA/ICRiZWZvcmUubm9kZUJlZm9yZSA6IG51bGw7XG5cbiAgICBpZiAoc3RhdGUuc2VsZWN0aW9uIGluc3RhbmNlb2YgR2FwQ3Vyc29yKSB7XG4gICAgICAgIG5vZGVCZWZvcmUgPSAkZnJvbS5ub2RlQmVmb3JlO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgICEhbm9kZUJlZm9yZSAmJiBbYnVsbGV0TGlzdCwgb3JkZXJlZExpc3RdLmluZGV4T2Yobm9kZUJlZm9yZS50eXBlKSA+IC0xXG4gICAgKTtcbn07XG5cbmNvbnN0IGNhbk91dGRlbnQgPSAoc3RhdGU6IEVkaXRvclN0YXRlKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBwYXJlbnQgfSA9IHN0YXRlLnNlbGVjdGlvbi4kZnJvbTtcbiAgICBjb25zdCB7IGxpc3RJdGVtLCBwYXJhZ3JhcGggfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcblxuICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBHYXBDdXJzb3IpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudC50eXBlID09PSBsaXN0SXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBwYXJlbnQudHlwZSA9PT0gcGFyYWdyYXBoICYmIGhhc1BhcmVudE5vZGVPZlR5cGUobGlzdEl0ZW0pKHN0YXRlLnNlbGVjdGlvbilcbiAgICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudGVyS2V5Q29tbWFuZDogQ29tbWFuZCA9IChzdGF0ZSwgZGlzcGF0Y2gpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGlvbiB9ID0gc3RhdGU7XG4gICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuICAgICAgICBjb25zdCB7ICRmcm9tIH0gPSBzZWxlY3Rpb247XG4gICAgICAgIGNvbnN0IHsgbGlzdEl0ZW0sIGNvZGVCbG9jayB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuICAgICAgICBjb25zdCBub2RlID0gJGZyb20ubm9kZSgkZnJvbS5kZXB0aCk7XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSAkZnJvbS5ub2RlKCRmcm9tLmRlcHRoIC0gMSk7XG5cbiAgICAgICAgaWYgKHdyYXBwZXIgJiYgd3JhcHBlci50eXBlID09PSBsaXN0SXRlbSkge1xuICAgICAgICAgICAgLyoqIENoZWNrIGlmIHRoZSB3cmFwcGVyIGhhcyBhbnkgdmlzaWJsZSBjb250ZW50ICovXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVySGFzQ29udGVudCA9IGhhc1Zpc2libGVDb250ZW50KHdyYXBwZXIpO1xuICAgICAgICAgICAgaWYgKGlzTm9kZUVtcHR5KG5vZGUpICYmICF3cmFwcGVySGFzQ29udGVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvdXRkZW50TGlzdCgpKHN0YXRlLCBkaXNwYXRjaCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFoYXNQYXJlbnROb2RlT2ZUeXBlKGNvZGVCbG9jaykoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGxpdExpc3RJdGVtKGxpc3RJdGVtKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBiYWNrc3BhY2VLZXlDb21tYW5kID0gYmFzZUNvbW1hbmQuY2hhaW5Db21tYW5kcyhcbiAgICAvLyBpZiB3ZVwicmUgYXQgdGhlIHN0YXJ0IG9mIGEgbGlzdCBpdGVtLCB3ZSBuZWVkIHRvIGVpdGhlciBiYWNrc3BhY2VcbiAgICAvLyBkaXJlY3RseSB0byBhbiBlbXB0eSBsaXN0IGl0ZW0gYWJvdmUsIG9yIG91dGRlbnQgdGhpcyBub2RlXG4gICAgZmlsdGVyKFxuICAgICAgICBbXG4gICAgICAgICAgICBpc0VtcHR5U2VsZWN0aW9uQXRTdGFydCxcblxuICAgICAgICAgICAgLy8gbGlzdCBpdGVtcyBtaWdodCBoYXZlIG11bHRpcGxlIHBhcmFncmFwaHM7IG9ubHkgZG8gdGhpcyBhdCB0aGUgZmlyc3Qgb25lXG4gICAgICAgICAgICBpc0ZpcnN0Q2hpbGRPZlBhcmVudCxcbiAgICAgICAgICAgIGNhbk91dGRlbnQsXG4gICAgICAgIF0sXG4gICAgICAgIGJhc2VDb21tYW5kLmNoYWluQ29tbWFuZHMoZGVsZXRlUHJldmlvdXNFbXB0eUxpc3RJdGVtLCBvdXRkZW50TGlzdCgpKSxcbiAgICApLFxuXG4gICAgLy8gaWYgd2VcInJlIGp1c3QgaW5zaWRlIGEgcGFyYWdyYXBoIG5vZGUgKG9yIGdhcGN1cnNvciBpcyBzaG93bikgYW5kIGJhY2tzcGFjZSwgdGhlbiB0cnkgdG8gam9pblxuICAgIC8vIHRoZSB0ZXh0IHRvIHRoZSBwcmV2aW91cyBsaXN0IGl0ZW0sIGlmIG9uZSBleGlzdHNcbiAgICBmaWx0ZXIoXG4gICAgICAgIFtpc0VtcHR5U2VsZWN0aW9uQXRTdGFydCwgY2FuVG9Kb2luVG9QcmV2aW91c0xpc3RJdGVtXSxcbiAgICAgICAgam9pblRvUHJldmlvdXNMaXN0SXRlbSxcbiAgICApLFxuKTtcblxuLyoqXG4gKiBJbXBsZW1ldGF0aW9uIHRha2VuIGFuZCBtb2RpZmllZCBmb3Igb3VyIG5lZWRzIGZyb20gUE1cbiAqIEBwYXJhbSBpdGVtVHlwZSBOb2RlXG4gKiBTcGxpdHMgdGhlIGxpc3QgaXRlbXMsIHNwZWNpZmljIGltcGxlbWVudGF0aW9uIHRha2UgZnJvbSBQTVxuICovXG5mdW5jdGlvbiBzcGxpdExpc3RJdGVtKGl0ZW1UeXBlOiBOb2RlVHlwZSk6IENvbW1hbmQge1xuICAgIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgICAgICAgY29uc3QgcmVmID0gc3RhdGUuc2VsZWN0aW9uIGFzIE5vZGVTZWxlY3Rpb247XG4gICAgICAgIGNvbnN0ICRmcm9tID0gcmVmLiRmcm9tO1xuICAgICAgICBjb25zdCAkdG8gPSByZWYuJHRvO1xuICAgICAgICBjb25zdCBub2RlID0gcmVmLm5vZGU7XG4gICAgICAgIGlmICgobm9kZSAmJiBub2RlLmlzQmxvY2spIHx8ICRmcm9tLmRlcHRoIDwgMiB8fCAhJGZyb20uc2FtZVBhcmVudCgkdG8pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JhbmRQYXJlbnQgPSAkZnJvbS5ub2RlKC0xKTtcbiAgICAgICAgaWYgKGdyYW5kUGFyZW50LnR5cGUgIT09IGl0ZW1UeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqIC0tPiBUaGUgZm9sbG93aW5nIGxpbmUgY2hhbmdlZCBmcm9tIHRoZSBvcmlnaW5hbCBQTSBpbXBsZW1lbnRhdGlvbiB0byBhbGxvdyBsaXN0IGFkZGl0aW9ucyB3aXRoIG11bHRpcGxlIHBhcmFncmFwaHMgKi9cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGdyYW5kUGFyZW50LmNvbnRlbnQgYXMgYW55KS5jb250ZW50Lmxlbmd0aCA8PSAxICYmXG4gICAgICAgICAgICAkZnJvbS5wYXJlbnQuY29udGVudC5zaXplID09PSAwICYmXG4gICAgICAgICAgICAhKGdyYW5kUGFyZW50LmNvbnRlbnQuc2l6ZSA9PT0gMClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBJbiBhbiBlbXB0eSBibG9jay4gSWYgdGhpcyBpcyBhIG5lc3RlZCBsaXN0LCB0aGUgd3JhcHBpbmdcbiAgICAgICAgICAgIC8vIGxpc3QgaXRlbSBzaG91bGQgYmUgc3BsaXQuIE90aGVyd2lzZSwgYmFpbCBvdXQgYW5kIGxldCBuZXh0XG4gICAgICAgICAgICAvLyBjb21tYW5kIGhhbmRsZSBsaWZ0aW5nLlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICRmcm9tLmRlcHRoID09PSAyIHx8XG4gICAgICAgICAgICAgICAgJGZyb20ubm9kZSgtMykudHlwZSAhPT0gaXRlbVR5cGUgfHxcbiAgICAgICAgICAgICAgICAkZnJvbS5pbmRleCgtMikgIT09ICRmcm9tLm5vZGUoLTIpLmNoaWxkQ291bnQgLSAxXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgICAgICAgICBsZXQgd3JhcCA9IEZyYWdtZW50LmVtcHR5O1xuICAgICAgICAgICAgICAgIGNvbnN0IGtlZXBJdGVtID0gJGZyb20uaW5kZXgoLTEpID4gMDtcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBhIGZyYWdtZW50IGNvbnRhaW5pbmcgZW1wdHkgdmVyc2lvbnMgb2YgdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgIC8vIGZyb20gdGhlIG91dGVyIGxpc3QgaXRlbSB0byB0aGUgcGFyZW50IG5vZGUgb2YgdGhlIGN1cnNvclxuICAgICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgICAgIGxldCBkID0gJGZyb20uZGVwdGggLSAoa2VlcEl0ZW0gPyAxIDogMik7XG4gICAgICAgICAgICAgICAgICAgIGQgPj0gJGZyb20uZGVwdGggLSAzO1xuICAgICAgICAgICAgICAgICAgICBkLS1cbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcCA9IEZyYWdtZW50LmZyb20oJGZyb20ubm9kZShkKS5jb3B5KHdyYXApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgc2Vjb25kIGxpc3QgaXRlbSB3aXRoIGFuIGVtcHR5IGRlZmF1bHQgc3RhcnQgbm9kZVxuICAgICAgICAgICAgICAgIHdyYXAgPSB3cmFwLmFwcGVuZChGcmFnbWVudC5mcm9tKGl0ZW1UeXBlLmNyZWF0ZUFuZEZpbGwoKSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyJDEgPSBzdGF0ZS50ci5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAkZnJvbS5iZWZvcmUoa2VlcEl0ZW0gPyB1bmRlZmluZWQgOiAtMSksXG4gICAgICAgICAgICAgICAgICAgICRmcm9tLmFmdGVyKC0zKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNsaWNlKHdyYXAsIGtlZXBJdGVtID8gMyA6IDIsIDIpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdHIkMS5zZXRTZWxlY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZS5zZWxlY3Rpb24uY29uc3RydWN0b3IgYXMgYW55KS5uZWFyKFxuICAgICAgICAgICAgICAgICAgICAgICAgdHIkMS5kb2MucmVzb2x2ZSgkZnJvbS5wb3MgKyAoa2VlcEl0ZW0gPyAzIDogMikpLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2godHIkMS5zY3JvbGxJbnRvVmlldygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRUeXBlID1cbiAgICAgICAgICAgICR0by5wb3MgPT09ICRmcm9tLmVuZCgpXG4gICAgICAgICAgICAgICAgPyBncmFuZFBhcmVudC5jb250ZW50TWF0Y2hBdCgwKS5kZWZhdWx0VHlwZVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCB0ciA9IHN0YXRlLnRyLmRlbGV0ZSgkZnJvbS5wb3MsICR0by5wb3MpO1xuICAgICAgICBjb25zdCB0eXBlcyA9IG5leHRUeXBlICYmIFt1bmRlZmluZWQsIHsgdHlwZTogbmV4dFR5cGUgfV07XG5cbiAgICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgICAgICBkaXNwYXRjaCh0ci5zcGxpdCgkZnJvbS5wb3MsIDIsIHR5cGVzIGFzIGFueSkuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBjbG9zZXN0IGJ1bGxldCBsaXN0IGJsb2NrcyBpbnRvIG9uZVxuICovXG5mdW5jdGlvbiBtZXJnZUxpc3RzKGxpc3RJdGVtOiBOb2RlVHlwZSwgcmFuZ2U6IE5vZGVSYW5nZSkge1xuICAgIHJldHVybiAoY29tbWFuZDogQ29tbWFuZCk6IENvbW1hbmQgPT4ge1xuICAgICAgICByZXR1cm4gKHN0YXRlLCBkaXNwYXRjaCkgPT5cbiAgICAgICAgICAgIGNvbW1hbmQoc3RhdGUsIHRyID0+IHtcbiAgICAgICAgICAgICAgICAvKiB3ZSBub3cgbmVlZCB0byBoYW5kbGUgdGhlIGNhc2UgdGhhdCB3ZSBsaWZ0ZWQgYSBzdWJsaXN0IG91dCxcbiAgICAgICAgICAgICAgICAgKiBhbmQgYW55IGxpc3RJdGVtcyBhdCB0aGUgY3VycmVudCBsZXZlbCBnZXQgc2hpZnRlZCBvdXQgdG9cbiAgICAgICAgICAgICAgICAgKiB0aGVpciBvd24gbmV3IGxpc3Q7IGUuZy46XG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiB1bm9yZGVyZWRMaXN0XG4gICAgICAgICAgICAgICAgICogIGxpc3RJdGVtKEEpXG4gICAgICAgICAgICAgICAgICogIGxpc3RJdGVtXG4gICAgICAgICAgICAgICAgICogICAgdW5vcmRlcmVkTGlzdFxuICAgICAgICAgICAgICAgICAqICAgICAgbGlzdEl0ZW0oQilcbiAgICAgICAgICAgICAgICAgKiAgbGlzdEl0ZW0oQylcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIGJlY29tZXMsIGFmdGVyIHVuaW5kZW50aW5nIHRoZSBmaXJzdCwgdG9wIGxldmVsIGxpc3RJdGVtLCBBOlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogY29udGVudCBvZiBBXG4gICAgICAgICAgICAgICAgICogdW5vcmRlcmVkTGlzdFxuICAgICAgICAgICAgICAgICAqICBsaXN0SXRlbShCKVxuICAgICAgICAgICAgICAgICAqIHVub3JkZXJlZExpc3RcbiAgICAgICAgICAgICAgICAgKiAgbGlzdEl0ZW0oQylcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIHNvLCB3ZSB0cnkgdG8gbWVyZ2UgdGhlc2UgdHdvIGxpc3RzIGlmIHRoZXlcInJlIG9mIHRoZSBzYW1lIHR5cGUsIHRvIGdpdmU6XG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBjb250ZW50IG9mIEFcbiAgICAgICAgICAgICAgICAgKiB1bm9yZGVyZWRMaXN0XG4gICAgICAgICAgICAgICAgICogIGxpc3RJdGVtKEIpXG4gICAgICAgICAgICAgICAgICogIGxpc3RJdGVtKEMpXG4gICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBjb25zdCAkc3RhcnQ6IFJlc29sdmVkUG9zID0gc3RhdGUuZG9jLnJlc29sdmUocmFuZ2Uuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0ICRlbmQ6IFJlc29sdmVkUG9zID0gc3RhdGUuZG9jLnJlc29sdmUocmFuZ2UuZW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCAkam9pbiA9IHRyLmRvYy5yZXNvbHZlKHRyLm1hcHBpbmcubWFwKHJhbmdlLmVuZCAtIDEpKTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgJGpvaW4ubm9kZUJlZm9yZSAmJlxuICAgICAgICAgICAgICAgICAgICAkam9pbi5ub2RlQWZ0ZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgJGpvaW4ubm9kZUJlZm9yZS50eXBlID09PSAkam9pbi5ub2RlQWZ0ZXIudHlwZVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAkZW5kLm5vZGVBZnRlciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgJGVuZC5ub2RlQWZ0ZXIudHlwZSA9PT0gbGlzdEl0ZW0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbmQucGFyZW50LnR5cGUgPT09ICRzdGFydC5wYXJlbnQudHlwZVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLmpvaW4oJGpvaW4ucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh0ci5zY3JvbGxJbnRvVmlldygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3V0ZGVudExpc3QoKTogQ29tbWFuZCB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBkaXNwYXRjaCkge1xuICAgICAgICBjb25zdCB7IGxpc3RJdGVtIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG4gICAgICAgIGNvbnN0IHsgJGZyb20sICR0byB9ID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgICAgICBpZiAoaXNJbnNpZGVMaXN0SXRlbShzdGF0ZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlXCJyZSBiYWNrc3BhY2luZyBhdCB0aGUgc3RhcnQgb2YgYSBsaXN0IGl0ZW0sIHVuaW5kZW50IGl0XG4gICAgICAgICAgICAvLyB0YWtlIHRoZSB0aGUgcmFuZ2Ugb2Ygbm9kZXMgd2UgbWlnaHQgYmUgbGlmdGluZ1xuXG4gICAgICAgICAgICAvLyB0aGUgcHJlZGljYXRlIGlzIGZvciB3aGVuIHlvdVwicmUgYmFja3NwYWNpbmcgYSB0b3AgbGV2ZWwgbGlzdCBpdGVtOlxuICAgICAgICAgICAgLy8gd2UgZG9uXCJ0IHdhbnQgdG8gZ28gdXAgcGFzdCB0aGUgZG9jIG5vZGUsIG90aGVyd2lzZSB0aGUgcmFuZ2VcbiAgICAgICAgICAgIC8vIHRvIGNsZWFyIHdpbGwgaW5jbHVkZSBldmVyeXRoaW5nXG4gICAgICAgICAgICBjb25zdCByYW5nZSA9ICRmcm9tLmJsb2NrUmFuZ2UoXG4gICAgICAgICAgICAgICAgJHRvLFxuICAgICAgICAgICAgICAgIG5vZGUgPT4gbm9kZS5jaGlsZENvdW50ID4gMCAmJiBub2RlLmZpcnN0Q2hpbGQgJiYgbm9kZS5maXJzdENoaWxkLnR5cGUgPT09IGxpc3RJdGVtLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCFyYW5nZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wb3NlKFxuICAgICAgICAgICAgICAgIG1lcmdlTGlzdHMobGlzdEl0ZW0sIHJhbmdlKSwgLy8gMi4gQ2hlY2sgaWYgSSBuZWVkIHRvIG1lcmdlIG5lYXJlc3QgbGlzdFxuICAgICAgICAgICAgICAgIGJhc2VMaXN0Q29tbWFuZC5saWZ0TGlzdEl0ZW0sIC8vIDEuIEZpcnN0IGxpZnQgbGlzdCBpdGVtXG4gICAgICAgICAgICApKGxpc3RJdGVtKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgY2FuIHNpbmsgdGhlIGxpc3QuXG4gKlxuICogQHJldHVybnMgdHJ1ZSBpZiB3ZSBjYW4gc2luayB0aGUgbGlzdCwgZmFsc2UgaWYgd2UgcmVhY2ggdGhlIG1heCBpbmRlbnRhdGlvbiBsZXZlbFxuICovXG5mdW5jdGlvbiBjYW5TaW5rKGluaXRpYWxJbmRlbnRhdGlvbkxldmVsOiBudW1iZXIsIHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIC8qXG4gICAgICAgIC0gS2VlcCBnb2luZyBmb3J3YXJkIGluIGRvY3VtZW50IHVudGlsIGluZGVudGF0aW9uIG9mIHRoZSBub2RlIGlzIDwgdGhhbiB0aGUgaW5pdGlhbFxuICAgICAgICAtIElmIGluZGVudGF0aW9uIGlzIEVWRVIgPiBtYXggaW5kZW50YXRpb24sIHJldHVybiB0cnVlIGFuZCBkb25cInQgc2luayB0aGUgbGlzdFxuICAgICAgICAqL1xuICAgIGxldCBjdXJyZW50SW5kZW50YXRpb25MZXZlbDogbnVtYmVyO1xuICAgIGxldCBjdXJyZW50UG9zID0gc3RhdGUudHIuc2VsZWN0aW9uLiR0by5wb3M7XG4gICAgZG8ge1xuICAgICAgICBjb25zdCByZXNvbHZlZFBvcyA9IHN0YXRlLmRvYy5yZXNvbHZlKGN1cnJlbnRQb3MpO1xuICAgICAgICBjdXJyZW50SW5kZW50YXRpb25MZXZlbCA9IG51bWJlck5lc3RlZExpc3RzKFxuICAgICAgICAgICAgcmVzb2x2ZWRQb3MsXG4gICAgICAgICAgICBzdGF0ZS5zY2hlbWEubm9kZXMsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZW50YXRpb25MZXZlbCA+IG1heEluZGVudGF0aW9uKSB7XG4gICAgICAgICAgICAvLyBDYW5jZWwgc2luayBsaXN0LlxuICAgICAgICAgICAgLy8gSWYgY3VycmVudCBpbmRlbnRhdGlvbiBsZXNzIHRoYW4gdGhlIGluaXRpYWwsIGl0IHdvblwidCBiZVxuICAgICAgICAgICAgLy8gbGFyZ2VyIHRoYW4gdGhlIG1heCwgYW5kIHRoZSBsb29wIHdpbGwgdGVybWluYXRlIGF0IGVuZCBvZiB0aGlzIGl0ZXJhdGlvblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQb3MrKztcbiAgICB9IHdoaWxlIChjdXJyZW50SW5kZW50YXRpb25MZXZlbCA+PSBpbml0aWFsSW5kZW50YXRpb25MZXZlbCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGVudExpc3QoKTogQ29tbWFuZCB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBkaXNwYXRjaCkge1xuICAgICAgICBjb25zdCB7IGxpc3RJdGVtIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG4gICAgICAgIGlmIChpc0luc2lkZUxpc3RJdGVtKHN0YXRlKSkge1xuICAgICAgICAgICAgLy8gUmVjb3JkIGluaXRpYWwgbGlzdCBpbmRlbnRhdGlvblxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbEluZGVudGF0aW9uTGV2ZWwgPSBudW1iZXJOZXN0ZWRMaXN0cyhcbiAgICAgICAgICAgICAgICBzdGF0ZS5zZWxlY3Rpb24uJGZyb20sXG4gICAgICAgICAgICAgICAgc3RhdGUuc2NoZW1hLm5vZGVzLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGNhblNpbmsoaW5pdGlhbEluZGVudGF0aW9uTGV2ZWwsIHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2UoXG4gICAgICAgICAgICAgICAgICAgIGJhc2VMaXN0Q29tbWFuZC5zaW5rTGlzdEl0ZW0sXG4gICAgICAgICAgICAgICAgKShsaXN0SXRlbSkoc3RhdGUsIGRpc3BhdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlmdExpc3RJdGVtcygpOiBDb21tYW5kIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGRpc3BhdGNoKSB7XG4gICAgICAgIGNvbnN0IHsgdHIgfSA9IHN0YXRlO1xuICAgICAgICBjb25zdCB7ICRmcm9tLCAkdG8gfSA9IHN0YXRlLnNlbGVjdGlvbjtcblxuICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKCRmcm9tLnBvcywgJHRvLnBvcywgKG5vZGUsIHBvcykgPT4ge1xuICAgICAgICAgICAgLy8gRm9sbG93aW5nIGNvbmRpdGlvbiB3aWxsIGVuc3VyZSB0aGF0IGJsb2NrIHR5cGVzIHBhcmFncmFwaCwgaGVhZGluZywgY29kZUJsb2NrLCBibG9ja3F1b3RlLCBwYW5lbCBhcmUgbGlmdGVkLlxuICAgICAgICAgICAgLy8gaXNUZXh0YmxvY2sgaXMgdHJ1ZSBmb3IgcGFyYWdyYXBoLCBoZWFkaW5nLCBjb2RlQmxvY2suXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbm9kZS5pc1RleHRibG9jayB8fFxuICAgICAgICAgICAgICAgIG5vZGUudHlwZS5uYW1lID09PSBcImJsb2NrcXVvdGVcIiB8fFxuICAgICAgICAgICAgICAgIG5vZGUudHlwZS5uYW1lID09PSBcInBhbmVsXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbCA9IG5ldyBOb2RlU2VsZWN0aW9uKHRyLmRvYy5yZXNvbHZlKHRyLm1hcHBpbmcubWFwKHBvcykpKTtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IHNlbC4kZnJvbS5ibG9ja1JhbmdlKHNlbC4kdG8pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyYW5nZSB8fCBzZWwuJGZyb20ucGFyZW50LnR5cGUgIT09IHN0YXRlLnNjaGVtYS5ub2Rlcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gcmFuZ2UgJiYgbGlmdFRhcmdldChyYW5nZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0ci5saWZ0KHJhbmdlLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHRyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG59XG5cbi8qKlxuICogU29tZXRpbWVzIGEgc2VsZWN0aW9uIGluIHRoZSBlZGl0b3IgY2FuIGJlIHNsaWdodGx5IG9mZnNldCwgZm9yIGV4YW1wbGU6XG4gKiBpdFwicyBwb3NzaWJsZSBmb3IgYSBzZWxlY3Rpb24gdG8gc3RhcnQgb3IgZW5kIGF0IGFuIGVtcHR5IG5vZGUgYXQgdGhlIHZlcnkgZW5kIG9mXG4gKiBhIGxpbmUuIFRoaXMgaXNuXCJ0IG9idmlvdXMgYnkgbG9va2luZyBhdCB0aGUgZWRpdG9yIGFuZCBpdFwicyBsaWtlbHkgbm90IHdoYXQgdGhlXG4gKiB1c2VyIGludGVuZGVkIC0gc28gd2UgbmVlZCB0byBhZGp1c3QgdGhlIHNlbGVjdGlvbiBhIGJpdCBpbiBzY2VuYXJpb3MgbGlrZSB0aGF0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0U2VsZWN0aW9uSW5MaXN0KFxuICAgIGRvYzogTm9kZSxcbiAgICBzZWxlY3Rpb246IFRleHRTZWxlY3Rpb24sXG4pOiBUZXh0U2VsZWN0aW9uIHtcbiAgICBjb25zdCB7ICRmcm9tLCAkdG8gfSA9IHNlbGVjdGlvbjtcblxuICAgIGNvbnN0IGlzU2FtZUxpbmUgPSAkZnJvbS5wb3MgPT09ICR0by5wb3M7XG5cbiAgICBsZXQgc3RhcnRQb3MgPSAkZnJvbS5wb3M7XG4gICAgY29uc3QgZW5kUG9zID0gJHRvLnBvcztcblxuICAgIGlmIChpc1NhbWVMaW5lICYmIHN0YXJ0UG9zID09PSBkb2Mubm9kZVNpemUgLSAzKSB7XG4gICAgICAgIC8vIExpbmUgaXMgZW1wdHksIGRvblwidCBkbyBhbnl0aGluZ1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdGlvbiBzdGFydGVkIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvZiBhIGxpbmUgYW5kIHRoZXJlZm9yIHBvaW50cyB0byB0aGUgcHJldmlvdXMgbGluZS5cbiAgICBpZiAoJGZyb20ubm9kZUJlZm9yZSAmJiAhaXNTYW1lTGluZSkge1xuICAgICAgICBzdGFydFBvcysrO1xuICAgICAgICBsZXQgbm9kZSA9IGRvYy5ub2RlQXQoc3RhcnRQb3MpO1xuICAgICAgICB3aGlsZSAoIW5vZGUgfHwgKG5vZGUgJiYgIW5vZGUuaXNUZXh0KSkge1xuICAgICAgICAgICAgc3RhcnRQb3MrKztcbiAgICAgICAgICAgIG5vZGUgPSBkb2Mubm9kZUF0KHN0YXJ0UG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbmRQb3MgPT09IHN0YXJ0UG9zKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGV4dFNlbGVjdGlvbihkb2MucmVzb2x2ZShzdGFydFBvcykpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVGV4dFNlbGVjdGlvbihkb2MucmVzb2x2ZShzdGFydFBvcyksIGRvYy5yZXNvbHZlKGVuZFBvcykpO1xufVxuXG4vLyBHZXQgdGhlIGRlcHRoIG9mIHRoZSBuZWFyZXN0IGFuY2VzdG9yIGxpc3RcbmV4cG9ydCBjb25zdCByb290TGlzdERlcHRoID0gKFxuICAgIHBvczogUmVzb2x2ZWRQb3MsXG4gICAgbm9kZXM6IFJlY29yZDxzdHJpbmcsIE5vZGVUeXBlPixcbikgPT4ge1xuICAgIGNvbnN0IHsgYnVsbGV0TGlzdCwgb3JkZXJlZExpc3QsIGxpc3RJdGVtIH0gPSBub2RlcztcbiAgICBsZXQgZGVwdGg7XG4gICAgZm9yIChsZXQgaSA9IHBvcy5kZXB0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHBvcy5ub2RlKGkpO1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSBidWxsZXRMaXN0IHx8IG5vZGUudHlwZSA9PT0gb3JkZXJlZExpc3QpIHtcbiAgICAgICAgICAgIGRlcHRoID0gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBub2RlLnR5cGUgIT09IGJ1bGxldExpc3QgJiZcbiAgICAgICAgICAgIG5vZGUudHlwZSAhPT0gb3JkZXJlZExpc3QgJiZcbiAgICAgICAgICAgIG5vZGUudHlwZSAhPT0gbGlzdEl0ZW1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVwdGg7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbmVzdGVkIGxpc3RzIHRoYXQgYXJlIGFuY2VzdG9ycyBvZiB0aGUgZ2l2ZW4gc2VsZWN0aW9uXG5leHBvcnQgY29uc3QgbnVtYmVyTmVzdGVkTGlzdHMgPSAoXG4gICAgcmVzb2x2ZWRQb3M6IFJlc29sdmVkUG9zLFxuICAgIG5vZGVzOiBSZWNvcmQ8c3RyaW5nLCBOb2RlVHlwZT4sXG4pID0+IHtcbiAgICBjb25zdCB7IGJ1bGxldExpc3QsIG9yZGVyZWRMaXN0IH0gPSBub2RlcztcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSByZXNvbHZlZFBvcy5kZXB0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHJlc29sdmVkUG9zLm5vZGUoaSk7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IGJ1bGxldExpc3QgfHwgbm9kZS50eXBlID09PSBvcmRlcmVkTGlzdCkge1xuICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlTGlzdCA9IChcbiAgICBzdGF0ZTogRWRpdG9yU3RhdGUsXG4gICAgZGlzcGF0Y2g6ICh0cjogVHJhbnNhY3Rpb24pID0+IHZvaWQsXG4gICAgdmlldzogRWRpdG9yVmlldyxcbiAgICBsaXN0VHlwZTogXCJidWxsZXRMaXN0XCIgfCBcIm9yZGVyZWRMaXN0XCIsXG4pOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGlvbiB9ID0gc3RhdGU7XG4gICAgY29uc3QgZnJvbU5vZGUgPSBzZWxlY3Rpb24uJGZyb20ubm9kZShzZWxlY3Rpb24uJGZyb20uZGVwdGggLSAyKTtcbiAgICBjb25zdCBlbmROb2RlID0gc2VsZWN0aW9uLiR0by5ub2RlKHNlbGVjdGlvbi4kdG8uZGVwdGggLSAyKTtcbiAgICBpZiAoXG4gICAgICAgICFmcm9tTm9kZSB8fFxuICAgICAgICBmcm9tTm9kZS50eXBlLm5hbWUgIT09IGxpc3RUeXBlIHx8XG4gICAgICAgICghZW5kTm9kZSB8fCBlbmROb2RlLnR5cGUubmFtZSAhPT0gbGlzdFR5cGUpXG4gICAgKSB7XG4gICAgICAgIHJldHVybiB0b2dnbGVMaXN0Q29tbWFuZChsaXN0VHlwZSkoc3RhdGUsIGRpc3BhdGNoLCB2aWV3KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZXB0aCA9IHJvb3RMaXN0RGVwdGgoc2VsZWN0aW9uLiR0bywgc3RhdGUuc2NoZW1hLm5vZGVzKTtcbiAgICAgICAgbGV0IHRyID0gbGlmdEZvbGxvd2luZ0xpc3QoXG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgIHNlbGVjdGlvbi4kdG8ucG9zLFxuICAgICAgICAgICAgc2VsZWN0aW9uLiR0by5lbmQoZGVwdGgpLFxuICAgICAgICAgICAgZGVwdGggfHwgMCxcbiAgICAgICAgICAgIHN0YXRlLnRyLFxuICAgICAgICApO1xuICAgICAgICB0ciA9IGxpZnRTZWxlY3Rpb25MaXN0KHN0YXRlLCB0cik7XG4gICAgICAgIGRpc3BhdGNoKHRyKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcblxuLyoqXG4gKiBDaGVjayBvZiBpcyBzZWxlY3Rpb24gaXMgaW5zaWRlIGEgbGlzdCBvZiB0aGUgc3BlY2lmaWVkIHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5zaWRlTGlzdChcbiAgICBzdGF0ZTogRWRpdG9yU3RhdGUsXG4gICAgbGlzdFR5cGU6IFwiYnVsbGV0TGlzdFwiIHwgXCJvcmRlcmVkTGlzdFwiLFxuKSB7XG4gICAgY29uc3QgeyAkZnJvbSB9ID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgIGNvbnN0IHBhcmVudCA9ICRmcm9tLm5vZGUoLTIpO1xuICAgIGNvbnN0IGdyYW5kZ3JhbmRQYXJlbnQgPSAkZnJvbS5ub2RlKC0zKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIChwYXJlbnQgJiYgcGFyZW50LnR5cGUgPT09IHN0YXRlLnNjaGVtYS5ub2Rlc1tsaXN0VHlwZV0pIHx8XG4gICAgICAgIChncmFuZGdyYW5kUGFyZW50ICYmIGdyYW5kZ3JhbmRQYXJlbnQudHlwZSA9PT0gc3RhdGUuc2NoZW1hLm5vZGVzW2xpc3RUeXBlXSlcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTGlzdENvbW1hbmQoXG4gICAgbGlzdFR5cGU6IFwiYnVsbGV0TGlzdFwiIHwgXCJvcmRlcmVkTGlzdFwiLFxuKTogQ29tbWFuZCB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBkaXNwYXRjaCwgdmlldykge1xuICAgICAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIHN0YXRlLnRyLnNldFNlbGVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgYWRqdXN0U2VsZWN0aW9uSW5MaXN0KHN0YXRlLmRvYywgc3RhdGUuc2VsZWN0aW9uIGFzIFRleHRTZWxlY3Rpb24pLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IHZpZXcuc3RhdGU7XG5cbiAgICAgICAgY29uc3QgeyAkZnJvbSwgJHRvIH0gPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgICAgIGNvbnN0IGlzUmFuZ2VPZlNpbmdsZVR5cGUgPSBpc1JhbmdlT2ZUeXBlKFxuICAgICAgICAgICAgc3RhdGUuZG9jLFxuICAgICAgICAgICAgJGZyb20sXG4gICAgICAgICAgICAkdG8sXG4gICAgICAgICAgICBzdGF0ZS5zY2hlbWEubm9kZXNbbGlzdFR5cGVdLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0luc2lkZUxpc3Qoc3RhdGUsIGxpc3RUeXBlKSAmJiBpc1JhbmdlT2ZTaW5nbGVUeXBlKSB7XG4gICAgICAgICAgICAvLyBVbnRvZ2dsZXMgbGlzdFxuICAgICAgICAgICAgcmV0dXJuIGxpZnRMaXN0SXRlbXMoKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ29udmVydHMgbGlzdCB0eXBlIGUuZy4gYnVsbGV0X2xpc3QgLT4gb3JkZXJlZF9saXN0IGlmIG5lZWRlZFxuICAgICAgICAgICAgaWYgKCFpc1JhbmdlT2ZTaW5nbGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgbGlmdExpc3RJdGVtcygpKHN0YXRlLCBkaXNwYXRjaCk7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSB2aWV3LnN0YXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZW1vdmUgYW55IGludmFsaWQgbWFya3MgdGhhdCBhcmUgbm90IHN1cHBvcnRlZFxuICAgICAgICAgICAgY29uc3QgdHIgPSBzYW5pdGl6ZVNlbGVjdGlvbk1hcmtzKHN0YXRlKTtcbiAgICAgICAgICAgIGlmICh0cikge1xuICAgICAgICAgICAgICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh0cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXRlID0gdmlldy5zdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdyYXBzIHNlbGVjdGlvbiBpbiBsaXN0XG4gICAgICAgICAgICByZXR1cm4gd3JhcEluTGlzdChzdGF0ZS5zY2hlbWEubm9kZXNbbGlzdFR5cGVdKShzdGF0ZSwgZGlzcGF0Y2gpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUJ1bGxldExpc3QodmlldzogRWRpdG9yVmlldykge1xuICAgIHJldHVybiB0b2dnbGVMaXN0KHZpZXcuc3RhdGUsIHZpZXcuZGlzcGF0Y2gsIHZpZXcsIFwiYnVsbGV0TGlzdFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU9yZGVyZWRMaXN0KHZpZXc6IEVkaXRvclZpZXcpIHtcbiAgICByZXR1cm4gdG9nZ2xlTGlzdCh2aWV3LnN0YXRlLCB2aWV3LmRpc3BhdGNoLCB2aWV3LCBcIm9yZGVyZWRMaXN0XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcEluTGlzdChub2RlVHlwZTogTm9kZVR5cGUpOiBDb21tYW5kIHtcbiAgICByZXR1cm4gYmFzZUNvbW1hbmQuYXV0b0pvaW4oXG4gICAgICAgIGJhc2VMaXN0Q29tbWFuZC53cmFwSW5MaXN0KG5vZGVUeXBlKSxcbiAgICAgICAgKGJlZm9yZSwgYWZ0ZXIpID0+IGJlZm9yZS50eXBlID09PSBhZnRlci50eXBlICYmIGJlZm9yZS50eXBlID09PSBub2RlVHlwZSxcbiAgICApO1xufVxuIl19