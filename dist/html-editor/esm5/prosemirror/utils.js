import * as tslib_1 from "tslib";
import { toggleMark } from "prosemirror-commands";
import { GapCursor } from "prosemirror-gapcursor";
import { Fragment, Slice, } from "prosemirror-model";
import { NodeSelection, TextSelection, } from "prosemirror-state";
import { liftTarget, findWrapping } from "prosemirror-transform";
import { hasParentNodeOfType } from "prosemirror-utils";
import { isNodeEmpty } from "./document-utils";
export { isEmptyParagraph, hasVisibleContent, isNodeEmpty, isEmptyDocument, getStepRange, findFarthestParentNode, isSelectionEndOfParagraph, nodesBetweenChanged, } from "./document-utils";
export var ZeroWidthSpace = "\u200b";
function validateNode(_node) {
    return false;
}
function isMarkTypeCompatibleWithMark(markType, mark) {
    return !mark.type.excludes(markType) && !markType.excludes(mark.type);
}
function isMarkTypeAllowedInNode(markType, state) {
    return toggleMark(markType)(state);
}
function closest(node, s) {
    var el = node;
    if (!el) {
        return null;
    }
    if (!document.documentElement || !document.documentElement.contains(el)) {
        return null;
    }
    var matches = el.matches ? "matches" : "msMatchesSelector";
    do {
        // @ts-ignore
        if (el[matches] && el[matches](s)) {
            return el;
        }
        el = (el.parentElement || el.parentNode);
    } while (el !== null && el.nodeType === 1);
    return null;
}
export var isImage = function (fileType) {
    return (!!fileType &&
        (fileType.indexOf("image/") > -1 || fileType.indexOf("video/") > -1));
};
export function canMoveUp(state) {
    var selection = state.selection, doc = state.doc;
    /**
     * If there"s a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof NodeSelection) {
        if (selection.node.type.name === "media") {
            /** Weird way of checking if the previous element is a paragraph */
            var mediaAncestorNode = doc.nodeAt(selection.anchor - 3);
            return !!(mediaAncestorNode && mediaAncestorNode.type.name === "paragraph");
        }
        else if (selection.node.type.name === "mediaGroup") {
            var mediaGroupAncestorNode = selection.$anchor.nodeBefore;
            return !!(mediaGroupAncestorNode &&
                mediaGroupAncestorNode.type.name === "paragraph");
        }
    }
    if (selection instanceof TextSelection) {
        if (!selection.empty) {
            return true;
        }
    }
    return !atTheBeginningOfDoc(state);
}
export function canMoveDown(state) {
    var selection = state.selection, doc = state.doc;
    /**
     * If there"s a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof NodeSelection) {
        if (selection.node.type.name === "media") {
            var nodeAfter = doc.nodeAt(selection.$head.after());
            return !!(nodeAfter && nodeAfter.type.name === "paragraph");
        }
        else if (selection.node.type.name === "mediaGroup") {
            return !(selection.$head.parentOffset === selection.$anchor.parent.content.size);
        }
    }
    if (selection instanceof TextSelection) {
        if (!selection.empty) {
            return true;
        }
    }
    return !atTheEndOfDoc(state);
}
export function isSelectionInsideLastNodeInDocument(selection) {
    var docNode = selection.$anchor.node(0);
    var rootNode = selection.$anchor.node(1);
    return docNode.lastChild === rootNode;
}
export function atTheEndOfDoc(state) {
    var selection = state.selection, doc = state.doc;
    return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}
export function atTheBeginningOfDoc(state) {
    var selection = state.selection;
    return selection.$from.pos === selection.$from.depth;
}
export function atTheEndOfBlock(state) {
    var selection = state.selection;
    var $to = selection.$to;
    if (selection instanceof GapCursor) {
        return false;
    }
    if (selection instanceof NodeSelection && selection.node.isBlock) {
        return true;
    }
    return endPositionOfParent($to) === $to.pos + 1;
}
export function atTheBeginningOfBlock(state) {
    var selection = state.selection;
    var $from = selection.$from;
    if (selection instanceof GapCursor) {
        return false;
    }
    if (selection instanceof NodeSelection && selection.node.isBlock) {
        return true;
    }
    return startPositionOfParent($from) === $from.pos;
}
export function startPositionOfParent(resolvedPos) {
    return resolvedPos.start(resolvedPos.depth);
}
export function endPositionOfParent(resolvedPos) {
    return resolvedPos.end(resolvedPos.depth) + 1;
}
export function getCursor(selection) {
    return selection.$cursor || undefined;
}
/**
 * Check if a mark is allowed at the current selection / cursor based on a given state.
 * This method looks at both the currently active marks on the transaction, as well as
 * the node and marks at the current selection to determine if the given mark type is
 * allowed.
 */
export function isMarkTypeAllowedInCurrentSelection(markType, state) {
    if (!isMarkTypeAllowedInNode(markType, state)) {
        return false;
    }
    var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor, ranges = _a.ranges;
    if (empty && !$cursor) {
        return false;
    }
    var isCompatibleMarkType = function (mark) {
        return isMarkTypeCompatibleWithMark(markType, mark);
    };
    // Handle any new marks in the current transaction
    if (state.tr.storedMarks &&
        !state.tr.storedMarks.every(isCompatibleMarkType)) {
        return false;
    }
    if ($cursor) {
        return $cursor.marks().every(isCompatibleMarkType);
    }
    // Check every node in a selection - ensuring that it is compatible with the current mark type
    return ranges.every(function (_a) {
        var $from = _a.$from, $to = _a.$to;
        var allowedInActiveMarks = $from.depth === 0 ? state.doc.marks.every(isCompatibleMarkType) : true;
        state.doc.nodesBetween($from.pos, $to.pos, function (node) {
            allowedInActiveMarks =
                allowedInActiveMarks && node.marks.every(isCompatibleMarkType);
        });
        return allowedInActiveMarks;
    });
}
/**
 * Step through block-nodes between $from and $to and returns false if a node is
 * found that isn"t of the specified type
 */
export function isRangeOfType(doc, $from, $to, nodeType) {
    return (getAncestorNodesBetween(doc, $from, $to).filter(function (node) { return node.type !== nodeType; }).length === 0);
}
export function createSliceWithContent(content, state) {
    return new Slice(Fragment.from(state.schema.text(content)), 0, 0);
}
/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */
export function canJoinDown(selection, doc, nodeType) {
    return checkNodeDown(selection, doc, function (node) { return node.type === nodeType; });
}
export function checkNodeDown(selection, doc, filter) {
    var res = doc.resolve(selection.$to.after(findAncestorPosition(doc, selection.$to).depth));
    return res.nodeAfter ? filter(res.nodeAfter) : false;
}
export var setNodeSelection = function (view, pos) {
    var state = view.state, dispatch = view.dispatch;
    if (!isFinite(pos)) {
        return;
    }
    var tr = state.tr.setSelection(NodeSelection.create(state.doc, pos));
    dispatch(tr);
};
export function setTextSelection(view, anchor, head) {
    var state = view.state;
    var tr = state.tr.setSelection(TextSelection.create(state.doc, anchor, head));
    view.dispatch(tr);
}
/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */
export function canJoinUp(selection, doc, nodeType) {
    var res = doc.resolve(selection.$from.before(findAncestorPosition(doc, selection.$from).depth));
    return res.nodeBefore && res.nodeBefore.type === nodeType;
}
/**
 * Returns all top-level ancestor-nodes between $from and $to
 */
export function getAncestorNodesBetween(doc, $from, $to) {
    var nodes = Array();
    var maxDepth = findAncestorPosition(doc, $from).depth;
    var current = doc.resolve($from.start(maxDepth));
    while (current.pos <= $to.start($to.depth)) {
        var depth = Math.min(current.depth, maxDepth);
        var node = current.node(depth);
        if (node) {
            nodes.push(node);
        }
        if (depth === 0) {
            break;
        }
        var next = doc.resolve(current.after(depth));
        if (next.start(depth) >= doc.nodeSize - 2) {
            break;
        }
        if (next.depth !== current.depth) {
            next = doc.resolve(next.pos + 2);
        }
        if (next.depth) {
            current = doc.resolve(next.start(next.depth));
        }
        else {
            current = doc.resolve(next.end(next.depth));
        }
    }
    return nodes;
}
/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 *
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 *
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */
export function getGroupsInRange(doc, $from, $to, isNodeValid) {
    if (isNodeValid === void 0) { isNodeValid = validateNode; }
    var groups = Array();
    var commonAncestor = hasCommonAncestor(doc, $from, $to);
    var fromAncestor = findAncestorPosition(doc, $from);
    if (commonAncestor ||
        (fromAncestor.depth === 1 && isNodeValid($from.node(1)))) {
        groups.push({ $from: $from, $to: $to });
    }
    else {
        var current = $from;
        while (current.pos < $to.pos) {
            var ancestorPos = findAncestorPosition(doc, current);
            while (ancestorPos.depth > 1) {
                ancestorPos = findAncestorPosition(doc, ancestorPos);
            }
            var endPos = doc.resolve(Math.min(
            // should not be smaller then start position in case of an empty paragraph for example.
            Math.max(ancestorPos.start(ancestorPos.depth), ancestorPos.end(ancestorPos.depth) - 3), $to.pos));
            groups.push({
                $from: current,
                $to: endPos,
            });
            current = doc.resolve(Math.min(endPos.after(1) + 1, doc.nodeSize - 2));
        }
    }
    return groups;
}
/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */
export function findAncestorPosition(doc, pos) {
    var nestableBlocks = ["blockquote", "bulletList", "orderedList"];
    if (pos.depth === 1) {
        return pos;
    }
    var node = pos.node(pos.depth);
    var newPos = pos;
    while (pos.depth >= 1) {
        pos = doc.resolve(pos.before(pos.depth));
        node = pos.node(pos.depth);
        if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
            newPos = pos;
        }
    }
    return newPos;
}
/**
 * Determine if two positions have a common ancestor.
 */
export function hasCommonAncestor(doc, $from, $to) {
    var current;
    var target;
    if ($from.depth > $to.depth) {
        current = findAncestorPosition(doc, $from);
        target = findAncestorPosition(doc, $to);
    }
    else {
        current = findAncestorPosition(doc, $to);
        target = findAncestorPosition(doc, $from);
    }
    while (current.depth > target.depth && current.depth > 1) {
        current = findAncestorPosition(doc, current);
    }
    return current.node(current.depth) === target.node(target.depth);
}
/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */
export function liftSelection(tr, doc, $from, $to) {
    var startPos = $from.start($from.depth);
    var endPos = $to.end($to.depth);
    var target = Math.max(0, findAncestorPosition(doc, $from).depth - 1);
    tr.doc.nodesBetween(startPos, endPos, function (node, pos) {
        if (node.isText || // Text node
            (node.isTextblock && !node.textContent) // Empty paragraph
        ) {
            var res = tr.doc.resolve(tr.mapping.map(pos));
            var sel = new NodeSelection(res);
            var range = sel.$from.blockRange(sel.$to);
            if (liftTarget(range) !== undefined) {
                tr.lift(range, target);
            }
        }
    });
    startPos = tr.mapping.map(startPos);
    endPos = tr.mapping.map(endPos);
    endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node
    tr.setSelection(new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));
    return {
        tr: tr,
        $from: tr.doc.resolve(startPos),
        $to: tr.doc.resolve(endPos),
    };
}
/**
 * Lift nodes in block to one level above.
 */
export function liftSiblingNodes(view) {
    var tr = view.state.tr;
    var _a = view.state.selection, $from = _a.$from, $to = _a.$to;
    var blockStart = tr.doc.resolve($from.start($from.depth - 1));
    var blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    var range = blockStart.blockRange(blockEnd);
    view.dispatch(tr.lift(range, blockStart.depth - 1));
}
/**
 * Lift sibling nodes to document-level and select them.
 */
export function liftAndSelectSiblingNodes(view) {
    var tr = view.state.tr;
    var _a = view.state.selection, $from = _a.$from, $to = _a.$to;
    var blockStart = tr.doc.resolve($from.start($from.depth - 1));
    var blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    // TODO: [ts30] handle void and null properly
    var range = blockStart.blockRange(blockEnd);
    tr.setSelection(new TextSelection(blockStart, blockEnd));
    tr.lift(range, blockStart.depth - 1);
    return tr;
}
export function wrapIn(nodeType, tr, $from, $to) {
    var range = $from.blockRange($to);
    var wrapping = range && findWrapping(range, nodeType);
    if (wrapping) {
        tr = tr.wrap(range, wrapping).scrollIntoView();
    }
    return tr;
}
/**
 * Repeating string for multiple times
 */
export function stringRepeat(text, length) {
    var result = "";
    for (var x = 0; x < length; x++) {
        result += text;
    }
    return result;
}
/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */
export function arrayFrom(obj) {
    return Array.prototype.slice.call(obj);
}
/**
 * Replacement for Element.closest, until it becomes widely implemented
 * Returns the ancestor element of a particular type if exists or null
 */
export function closestElement(node, s) {
    return closest(node, s);
}
/*
 * From Modernizr
 * Returns the kind of transitionevent available for the element
 */
export function whichTransitionEvent() {
    var el = document.createElement("fakeelement");
    var transitions = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
    };
    for (var t in transitions) {
        if (el.style[t] !== undefined) {
            // Use a generic as the return type because TypeScript doesnt know
            // about cross browser features, so we cast here to align to the
            // standard Event spec and propagate the type properly to the callbacks
            // of `addEventListener` and `removeEventListener`.
            return transitions[t];
        }
    }
    return;
}
/**
 * Function will create a list of wrapper blocks present in a selection.
 */
function getSelectedWrapperNodes(state) {
    var nodes = [];
    if (state.selection) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var _b = state.schema.nodes, blockquote_1 = _b.blockquote, panel_1 = _b.panel, orderedList_1 = _b.orderedList, bulletList_1 = _b.bulletList, listItem_1 = _b.listItem, codeBlock_1 = _b.codeBlock;
        state.doc.nodesBetween($from.pos, $to.pos, function (node) {
            if ((node.isBlock &&
                [blockquote_1, panel_1, orderedList_1, bulletList_1, listItem_1].indexOf(node.type) >= 0) ||
                node.type === codeBlock_1) {
                nodes.push(node.type);
            }
        });
    }
    return nodes;
}
/**
 * Function will check if changing block types: Paragraph, Heading is enabled.
 */
export function areBlockTypesDisabled(state) {
    var nodesTypes = getSelectedWrapperNodes(state);
    var panel = state.schema.nodes.panel;
    return nodesTypes.filter(function (type) { return type !== panel; }).length > 0;
}
export var isTemporary = function (id) {
    return id.indexOf("temporary:") === 0;
};
export var isEmptyNode = function (schema) {
    var _a = schema.nodes, doc = _a.doc, paragraph = _a.paragraph, codeBlock = _a.codeBlock, blockquote = _a.blockquote, panel = _a.panel, heading = _a.heading, listItem = _a.listItem, bulletList = _a.bulletList, orderedList = _a.orderedList, taskList = _a.taskList, taskItem = _a.taskItem, decisionList = _a.decisionList, decisionItem = _a.decisionItem, media = _a.media, mediaGroup = _a.mediaGroup, mediaSingle = _a.mediaSingle;
    var innerIsEmptyNode = function (node) {
        switch (node.type) {
            case media:
            case mediaGroup:
            case mediaSingle:
                return false;
            case paragraph:
            case codeBlock:
            case heading:
            case taskItem:
            case decisionItem:
                return node.content.size === 0;
            case blockquote:
            case panel:
            case listItem:
                return (node.content.size === 2 && innerIsEmptyNode(node.content.firstChild));
            case bulletList:
            case orderedList:
                return (node.content.size === 4 && innerIsEmptyNode(node.content.firstChild));
            case taskList:
            case decisionList:
                return (node.content.size === 2 && innerIsEmptyNode(node.content.firstChild));
            case doc:
                var isEmpty_1 = true;
                node.content.forEach(function (child) {
                    isEmpty_1 = isEmpty_1 && innerIsEmptyNode(child);
                });
                return isEmpty_1;
            default:
                return isNodeEmpty(node);
        }
    };
    return innerIsEmptyNode;
};
export var insideTable = function (state) {
    var _a = state.schema.nodes, table = _a.table, tableCell = _a.tableCell;
    return hasParentNodeOfType([table, tableCell])(state.selection);
};
export var insideTableCell = function (state) {
    var _a = state.schema.nodes, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
    return hasParentNodeOfType([tableCell, tableHeader])(state.selection);
};
export var isElementInTableCell = function (element) {
    return closest(element, "td") || closest(element, "th");
};
export var isLastItemMediaGroup = function (node) {
    var content = node.content;
    return !!content.lastChild && content.lastChild.type.name === "mediaGroup";
};
export var isInListItem = function (state) {
    return hasParentNodeOfType(state.schema.nodes.listItem)(state.selection);
};
export var hasOpenEnd = function (slice) {
    return slice.openStart > 0 || slice.openEnd > 0;
};
export function filterChildrenBetween(doc, from, to, predicate) {
    var results = [];
    doc.nodesBetween(from, to, function (node, pos, parent) {
        if (predicate(node, pos, parent)) {
            results.push({ node: node, pos: pos });
        }
    });
    return results;
}
export function dedupe(list, iteratee) {
    if (list === void 0) { list = []; }
    var transformed = iteratee ? list.map(iteratee) : list;
    return transformed
        .map(function (item, index, list) { return (list.indexOf(item) === index ? item : null); })
        .reduce(function (acc, item, index) { return (!!item ? acc.concat(list[index]) : acc); }, []);
}
export var isTextSelection = function (selection) { return selection instanceof TextSelection; };
/**
 * Compose 1 to n functions.
 * @param func first function
 * @param funcs additional functions
 */
export function compose(func) {
    var funcs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        funcs[_i - 1] = arguments[_i];
    }
    var allFuncs = tslib_1.__spread([func], funcs);
    return function composed(raw) {
        return allFuncs.reduceRight(function (memo, func) { return func(memo); }, raw);
    };
}
// rest
export function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    if (fns.length === 0) {
        return function (a) { return a; };
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return fns.reduce(function (prevFn, nextFn) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return nextFn(prevFn.apply(void 0, tslib_1.__spread(args)));
    }; });
}
export var normaliseNestedLayout = function (state, node) {
    if (state.selection.$from.depth > 1) {
        if (node.attrs.layout && node.attrs.layout !== "default") {
            return node.type.createChecked(tslib_1.__assign({}, node.attrs, { layout: "default" }), node.content, node.marks);
        }
        // If its a breakout layout, we can remove the mark
        // Since default isn"t a valid breakout mode.
        var breakoutMark = state.schema.marks.breakout;
        if (breakoutMark && breakoutMark.isInSet(node.marks)) {
            var newMarks = breakoutMark.removeFromSet(node.marks);
            return node.type.createChecked(node.attrs, node.content, newMarks);
        }
    }
    return node;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbInByb3NlbWlycm9yL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFDSCxRQUFRLEVBTVIsS0FBSyxHQUlSLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUVILGFBQWEsRUFFYixhQUFhLEdBRWhCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsT0FBTyxFQUNILGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLGVBQWUsRUFDZixZQUFZLEVBQ1osc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUN6QixtQkFBbUIsR0FDdEIsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixNQUFNLENBQUMsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDO0FBRXZDLFNBQVMsWUFBWSxDQUFDLEtBQVc7SUFDN0IsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsNEJBQTRCLENBQ2pDLFFBQWtCLEVBQ2xCLElBQVk7SUFFWixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FDNUIsUUFBa0IsRUFDbEIsS0FBa0I7SUFFbEIsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUNaLElBQW9DLEVBQ3BDLENBQVM7SUFFVCxJQUFJLEVBQUUsR0FBRyxJQUFtQixDQUFDO0lBQzdCLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDTCxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNyRSxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztJQUU3RCxHQUFHO1FBQ0MsYUFBYTtRQUNiLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFnQixDQUFDO0tBQzNELFFBQVEsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtJQUMzQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLFVBQUMsUUFBaUI7SUFDckMsT0FBTyxDQUNILENBQUMsQ0FBQyxRQUFRO1FBQ1YsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDdkUsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBa0I7SUFDaEMsSUFBQSwyQkFBUyxFQUFFLGVBQUcsQ0FBVztJQUVqQzs7OztPQUlHO0lBQ0gsSUFBSSxTQUFTLFlBQVksYUFBYSxFQUFFO1FBQ3BDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN0QyxtRUFBbUU7WUFDbkUsSUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0QsT0FBTyxDQUFDLENBQUMsQ0FDTCxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FDbkUsQ0FBQztTQUNMO2FBQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQ2xELElBQU0sc0JBQXNCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDNUQsT0FBTyxDQUFDLENBQUMsQ0FDTCxzQkFBc0I7Z0JBQ3RCLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUNuRCxDQUFDO1NBQ0w7S0FDSjtJQUVELElBQUksU0FBUyxZQUFZLGFBQWEsRUFBRTtRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFFRCxPQUFPLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBa0I7SUFDbEMsSUFBQSwyQkFBUyxFQUFFLGVBQUcsQ0FBVztJQUVqQzs7OztPQUlHO0lBQ0gsSUFBSSxTQUFTLFlBQVksYUFBYSxFQUFFO1FBQ3BDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN0QyxJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtZQUNsRCxPQUFPLENBQUMsQ0FDSixTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN6RSxDQUFDO1NBQ0w7S0FDSjtJQUNELElBQUksU0FBUyxZQUFZLGFBQWEsRUFBRTtRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFFRCxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFFRCxNQUFNLFVBQVUsbUNBQW1DLENBQy9DLFNBQW9CO0lBRXBCLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNDLE9BQU8sT0FBTyxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUM7QUFDMUMsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBa0I7SUFDcEMsSUFBQSwyQkFBUyxFQUFFLGVBQUcsQ0FBVztJQUNqQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ3hFLENBQUM7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsS0FBa0I7SUFDMUMsSUFBQSwyQkFBUyxDQUFXO0lBQzVCLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDekQsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBa0I7SUFDdEMsSUFBQSwyQkFBUyxDQUFXO0lBQ3BCLElBQUEsbUJBQUcsQ0FBZTtJQUMxQixJQUFJLFNBQVMsWUFBWSxTQUFTLEVBQUU7UUFDaEMsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxJQUFJLFNBQVMsWUFBWSxhQUFhLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDOUQsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU8sbUJBQW1CLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxLQUFrQjtJQUM1QyxJQUFBLDJCQUFTLENBQVc7SUFDcEIsSUFBQSx1QkFBSyxDQUFlO0lBQzVCLElBQUksU0FBUyxZQUFZLFNBQVMsRUFBRTtRQUNoQyxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksU0FBUyxZQUFZLGFBQWEsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUM5RCxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQ3RELENBQUM7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsV0FBd0I7SUFDMUQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFdBQXdCO0lBQ3hELE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLFNBQW9CO0lBQzFDLE9BQVEsU0FBMkIsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBQzdELENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxtQ0FBbUMsQ0FDL0MsUUFBa0IsRUFDbEIsS0FBa0I7SUFHbEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUMzQyxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVLLElBQUEsb0JBQTZELEVBQTNELGdCQUFLLEVBQUUsb0JBQU8sRUFBRSxrQkFBMkMsQ0FBQztJQUNwRSxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNuQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELElBQU0sb0JBQW9CLEdBQUcsVUFBQyxJQUFZO1FBQ3RDLE9BQUEsNEJBQTRCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztJQUE1QyxDQUE0QyxDQUFDO0lBRWpELGtEQUFrRDtJQUNsRCxJQUNJLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVztRQUNwQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUNuRDtRQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsSUFBSSxPQUFPLEVBQUU7UUFDVCxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN0RDtJQUVELDhGQUE4RjtJQUM5RixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBQyxFQUFjO1lBQVosZ0JBQUssRUFBRSxZQUFHO1FBQzdCLElBQUksb0JBQW9CLEdBQ3BCLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTNFLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFBLElBQUk7WUFDM0Msb0JBQW9CO2dCQUNoQixvQkFBb0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxvQkFBb0IsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUN6QixHQUFTLEVBQ1QsS0FBa0IsRUFDbEIsR0FBZ0IsRUFDaEIsUUFBa0I7SUFFbEIsT0FBTyxDQUNILHVCQUF1QixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUMzQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUF0QixDQUFzQixDQUNqQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQ2pCLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE9BQWUsRUFBRSxLQUFrQjtJQUN0RSxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQ3ZCLFNBQW9CLEVBQ3BCLEdBQVEsRUFDUixRQUFrQjtJQUVsQixPQUFPLGFBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQXRCLENBQXNCLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FDekIsU0FBb0IsRUFDcEIsR0FBUyxFQUNULE1BQStCO0lBRS9CLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQ25CLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQ3RFLENBQUM7SUFDRixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN6RCxDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxJQUFnQixFQUFFLEdBQVc7SUFDbEQsSUFBQSxrQkFBSyxFQUFFLHdCQUFRLENBQVU7SUFFakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNoQixPQUFPO0tBQ1Y7SUFFRCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2RSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLGdCQUFnQixDQUM1QixJQUFnQixFQUNoQixNQUFjLEVBQ2QsSUFBYTtJQUVMLElBQUEsa0JBQUssQ0FBVTtJQUN2QixJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FDNUIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FDaEQsQ0FBQztJQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQ3JCLFNBQW9CLEVBQ3BCLEdBQVEsRUFDUixRQUFrQjtJQUVsQixJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUNuQixTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUMzRSxDQUFDO0lBQ0YsT0FBTyxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztBQUM5RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQ25DLEdBQVMsRUFDVCxLQUFrQixFQUNsQixHQUFnQjtJQUVoQixJQUFNLEtBQUssR0FBRyxLQUFLLEVBQVEsQ0FBQztJQUM1QixJQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3hELElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRWpELE9BQU8sT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxJQUFJLElBQUksRUFBRTtZQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7UUFFRCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDYixNQUFNO1NBQ1Q7UUFFRCxJQUFJLElBQUksR0FBZ0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLE1BQU07U0FDVDtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQzlCLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0tBQ0o7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUM1QixHQUFTLEVBQ1QsS0FBa0IsRUFDbEIsR0FBZ0IsRUFDaEIsV0FBbUQ7SUFBbkQsNEJBQUEsRUFBQSwwQkFBbUQ7SUFFbkQsSUFBTSxNQUFNLEdBQUcsS0FBSyxFQUE0QyxDQUFDO0lBQ2pFLElBQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUQsSUFBTSxZQUFZLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXRELElBQ0ksY0FBYztRQUNkLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMxRDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUM7S0FDL0I7U0FBTTtRQUNILElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVwQixPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUMxQixJQUFJLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckQsT0FBTyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDMUIsV0FBVyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUN4RDtZQUVELElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQ3RCLElBQUksQ0FBQyxHQUFHO1lBQ0osdUZBQXVGO1lBQ3ZGLElBQUksQ0FBQyxHQUFHLENBQ0osV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQ3BDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDekMsRUFDRCxHQUFHLENBQUMsR0FBRyxDQUNWLENBQ0osQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsR0FBRyxFQUFFLE1BQU07YUFDZCxDQUFDLENBQUM7WUFFSCxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRTtLQUNKO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEdBQVMsRUFBRSxHQUFRO0lBQ3BELElBQU0sY0FBYyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUVuRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sR0FBRyxDQUFDO0tBQ2Q7SUFFRCxJQUFJLElBQUksR0FBcUIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLE9BQU8sR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsSUFBSSxJQUFJLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDaEI7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FDN0IsR0FBUyxFQUNULEtBQWtCLEVBQ2xCLEdBQWdCO0lBRWhCLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxNQUFNLENBQUM7SUFFWCxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRTtRQUN6QixPQUFPLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDM0M7U0FBTTtRQUNILE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3QztJQUVELE9BQU8sT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQ3RELE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDaEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQ3pCLEVBQWUsRUFDZixHQUFTLEVBQ1QsS0FBa0IsRUFDbEIsR0FBZ0I7SUFFaEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV2RSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQUMsSUFBSSxFQUFFLEdBQUc7UUFDNUMsSUFDSSxJQUFJLENBQUMsTUFBTSxJQUFJLFlBQVk7WUFDM0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGtCQUFrQjtVQUM1RDtZQUNFLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTVDLElBQUksVUFBVSxDQUFDLEtBQWtCLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzlDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLG9DQUFvQztJQUV2RyxFQUFFLENBQUMsWUFBWSxDQUNYLElBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ3RFLENBQUM7SUFFRixPQUFPO1FBQ0gsRUFBRSxFQUFFLEVBQUU7UUFDTixLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQy9CLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7S0FDOUIsQ0FBQztBQUNOLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFnQjtJQUNyQyxJQUFBLGtCQUFFLENBQWdCO0lBQ3BCLElBQUEseUJBQXFDLEVBQW5DLGdCQUFLLEVBQUUsWUFBNEIsQ0FBQztJQUM1QyxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFrQixFQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsSUFBZ0I7SUFDOUMsSUFBQSxrQkFBRSxDQUFnQjtJQUNwQixJQUFBLHlCQUFxQyxFQUFuQyxnQkFBSyxFQUFFLFlBQTRCLENBQUM7SUFDNUMsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsNkNBQTZDO0lBQzdDLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFjLENBQUM7SUFDM0QsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN6RCxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQWtCLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUNsQixRQUFrQixFQUNsQixFQUFlLEVBQ2YsS0FBa0IsRUFDbEIsR0FBZ0I7SUFFaEIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVEsQ0FBQztJQUMzQyxJQUFNLFFBQVEsR0FBRyxLQUFLLElBQUssWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQVMsQ0FBQztJQUNqRSxJQUFJLFFBQVEsRUFBRTtRQUNWLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNsRDtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxJQUFZLEVBQUUsTUFBYztJQUNyRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixNQUFNLElBQUksSUFBSSxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUFRO0lBQzlCLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUMxQixJQUFvQyxFQUNwQyxDQUFTO0lBRVQsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CO0lBQ2hDLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakQsSUFBTSxXQUFXLEdBQTJCO1FBQ3hDLFVBQVUsRUFBRSxlQUFlO1FBQzNCLGFBQWEsRUFBRSxlQUFlO1FBQzlCLFdBQVcsRUFBRSxnQkFBZ0I7UUFDN0IsZ0JBQWdCLEVBQUUscUJBQXFCO0tBQzFDLENBQUM7SUFFRixLQUFLLElBQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRTtRQUN6QixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBOEIsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN4RCxrRUFBa0U7WUFDbEUsZ0VBQWdFO1lBQ2hFLHVFQUF1RTtZQUN2RSxtREFBbUQ7WUFDbkQsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUF3QixDQUFDO1NBQ2hEO0tBQ0o7SUFFRCxPQUFPO0FBQ1gsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyx1QkFBdUIsQ0FBQyxLQUFrQjtJQUMvQyxJQUFNLEtBQUssR0FBb0IsRUFBRSxDQUFDO0lBQ2xDLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtRQUNYLElBQUEsb0JBQWdDLEVBQTlCLGdCQUFLLEVBQUUsWUFBdUIsQ0FBQztRQUNqQyxJQUFBLHVCQU9nQixFQU5sQiw0QkFBVSxFQUNWLGtCQUFLLEVBQ0wsOEJBQVcsRUFDWCw0QkFBVSxFQUNWLHdCQUFRLEVBQ1IsMEJBQ2tCLENBQUM7UUFDdkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQUEsSUFBSTtZQUMzQyxJQUNJLENBQUMsSUFBSSxDQUFDLE9BQU87Z0JBQ1QsQ0FBQyxZQUFVLEVBQUUsT0FBSyxFQUFFLGFBQVcsRUFBRSxZQUFVLEVBQUUsVUFBUSxDQUFDLENBQUMsT0FBTyxDQUMxRCxJQUFJLENBQUMsSUFBSSxDQUNaLElBQUksQ0FBQyxDQUFDO2dCQUNYLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBUyxFQUN6QjtnQkFDRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsS0FBa0I7SUFDcEQsSUFBTSxVQUFVLEdBQWUsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsSUFBQSxnQ0FBSyxDQUF3QjtJQUNyQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssS0FBSyxFQUFkLENBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxVQUFDLEVBQVU7SUFDbEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFHRixNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsVUFBQyxNQUFjO0lBQ2hDLElBQUEsaUJBaUJVLEVBaEJaLFlBQUcsRUFDSCx3QkFBUyxFQUNULHdCQUFTLEVBQ1QsMEJBQVUsRUFDVixnQkFBSyxFQUNMLG9CQUFPLEVBQ1Asc0JBQVEsRUFDUiwwQkFBVSxFQUNWLDRCQUFXLEVBQ1gsc0JBQVEsRUFDUixzQkFBUSxFQUNSLDhCQUFZLEVBQ1osOEJBQVksRUFDWixnQkFBSyxFQUNMLDBCQUFVLEVBQ1YsNEJBQ1ksQ0FBQztJQUNqQixJQUFNLGdCQUFnQixHQUFHLFVBQUMsSUFBVTtRQUNoQyxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssV0FBVztnQkFDWixPQUFPLEtBQUssQ0FBQztZQUNqQixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssWUFBWTtnQkFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQztZQUNuQyxLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssUUFBUTtnQkFDVCxPQUFPLENBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQ3ZFLENBQUM7WUFDTixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLFdBQVc7Z0JBQ1osT0FBTyxDQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUN2RSxDQUFDO1lBQ04sS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFlBQVk7Z0JBQ2IsT0FBTyxDQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUN2RSxDQUFDO1lBQ04sS0FBSyxHQUFHO2dCQUNKLElBQUksU0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO29CQUN0QixTQUFPLEdBQUcsU0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLFNBQU8sQ0FBQztZQUNuQjtnQkFDSSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUMsQ0FBQztJQUNGLE9BQU8sZ0JBQWdCLENBQUM7QUFDNUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLFVBQUMsS0FBa0I7SUFDcEMsSUFBQSx1QkFBeUMsRUFBdkMsZ0JBQUssRUFBRSx3QkFBZ0MsQ0FBQztJQUVoRCxPQUFPLG1CQUFtQixDQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxVQUFDLEtBQWtCO0lBQ3hDLElBQUEsdUJBQStDLEVBQTdDLHdCQUFTLEVBQUUsNEJBQWtDLENBQUM7SUFDdEQsT0FBTyxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxVQUNoQyxPQUEyQjtJQUUzQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLElBQVU7SUFDbkMsSUFBQSxzQkFBTyxDQUFVO0lBQ3pCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQztBQUMvRSxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxZQUFZLEdBQUcsVUFBQyxLQUFrQjtJQUMzQyxPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3RSxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUcsVUFBQyxLQUFZO0lBQ25DLE9BQU8sS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDcEQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLHFCQUFxQixDQUNqQyxHQUFTLEVBQ1QsSUFBWSxFQUNaLEVBQVUsRUFDVixTQUF5RTtJQUV6RSxJQUFNLE9BQU8sR0FBRyxFQUFtQyxDQUFDO0lBQ3BELEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTTtRQUN6QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUNsQixJQUFjLEVBQ2QsUUFBbUM7SUFEbkMscUJBQUEsRUFBQSxTQUFjO0lBR2QsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFekQsT0FBTyxXQUFXO1NBQ2IsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUE1QyxDQUE0QyxDQUFDO1NBQ3hFLE1BQU0sQ0FDSCxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBeEMsQ0FBd0MsRUFDOUQsRUFBRSxDQUNMLENBQUM7QUFDVixDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLFVBQzNCLFNBQW9CLElBQ1MsT0FBQSxTQUFTLFlBQVksYUFBYSxFQUFsQyxDQUFrQyxDQUFDO0FBTXBFOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQWdCakIsSUFBUTtJQUFFLGVBQVk7U0FBWixVQUFZLEVBQVoscUJBQVksRUFBWixJQUFZO1FBQVosOEJBQVk7O0lBQ3hCLElBQU0sUUFBUSxxQkFBSSxJQUFJLEdBQUssS0FBSyxDQUFDLENBQUM7SUFDbEMsT0FBTyxTQUFTLFFBQVEsQ0FBQyxHQUFRO1FBQzdCLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQVYsQ0FBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLENBQU0sQ0FBQztBQUNYLENBQUM7QUFnQ0QsT0FBTztBQUNQLE1BQU0sVUFBVSxJQUFJO0lBQUMsYUFBa0I7U0FBbEIsVUFBa0IsRUFBbEIscUJBQWtCLEVBQWxCLElBQWtCO1FBQWxCLHdCQUFrQjs7SUFDbkMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsQixPQUFPLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUMsQ0FBQztLQUN4QjtJQUVELElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7SUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUFNLEVBQUUsTUFBTSxJQUFLLE9BQUE7UUFBQyxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNqRCxPQUFBLE1BQU0sQ0FBQyxNQUFNLGdDQUFJLElBQUksR0FBRTtJQUF2QixDQUF1QixFQURXLENBQ1gsQ0FDMUIsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRyxVQUFDLEtBQWtCLEVBQUUsSUFBVTtJQUNoRSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsc0JBRW5CLElBQUksQ0FBQyxLQUFLLElBQ2IsTUFBTSxFQUFFLFNBQVMsS0FFckIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsS0FBSyxDQUNiLENBQUM7U0FDTDtRQUVELG1EQUFtRDtRQUNuRCw2Q0FBNkM7UUFDN0MsSUFBTSxZQUFZLEdBQVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3ZELElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xELElBQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RFO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b2dnbGVNYXJrIH0gZnJvbSBcInByb3NlbWlycm9yLWNvbW1hbmRzXCI7XG5pbXBvcnQge0dhcEN1cnNvcn0gZnJvbSBcInByb3NlbWlycm9yLWdhcGN1cnNvclwiO1xuaW1wb3J0IHtcbiAgICBGcmFnbWVudCxcbiAgICBNYXJrIGFzIFBNTWFyayxcbiAgICBNYXJrVHlwZSxcbiAgICBOb2RlLFxuICAgIE5vZGVUeXBlLFxuICAgIFJlc29sdmVkUG9zLFxuICAgIFNsaWNlLFxuICAgIFNjaGVtYSxcbiAgICBOb2RlUmFuZ2UsXG4gICAgTWFyayxcbn0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5pbXBvcnQgeyBFZGl0b3JWaWV3IH0gZnJvbSBcInByb3NlbWlycm9yLXZpZXdcIjtcbmltcG9ydCB7XG4gICAgRWRpdG9yU3RhdGUsXG4gICAgTm9kZVNlbGVjdGlvbixcbiAgICBTZWxlY3Rpb24sXG4gICAgVGV4dFNlbGVjdGlvbixcbiAgICBUcmFuc2FjdGlvbixcbn0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XG5pbXBvcnQgeyBsaWZ0VGFyZ2V0LCBmaW5kV3JhcHBpbmcgfSBmcm9tIFwicHJvc2VtaXJyb3ItdHJhbnNmb3JtXCI7XG5pbXBvcnQgeyBoYXNQYXJlbnROb2RlT2ZUeXBlIH0gZnJvbSBcInByb3NlbWlycm9yLXV0aWxzXCI7XG5pbXBvcnQgeyBpc05vZGVFbXB0eSB9IGZyb20gXCIuL2RvY3VtZW50LXV0aWxzXCI7XG5cbmV4cG9ydCB7XG4gICAgaXNFbXB0eVBhcmFncmFwaCxcbiAgICBoYXNWaXNpYmxlQ29udGVudCxcbiAgICBpc05vZGVFbXB0eSxcbiAgICBpc0VtcHR5RG9jdW1lbnQsXG4gICAgZ2V0U3RlcFJhbmdlLFxuICAgIGZpbmRGYXJ0aGVzdFBhcmVudE5vZGUsXG4gICAgaXNTZWxlY3Rpb25FbmRPZlBhcmFncmFwaCxcbiAgICBub2Rlc0JldHdlZW5DaGFuZ2VkLFxufSBmcm9tIFwiLi9kb2N1bWVudC11dGlsc1wiO1xuXG5cbmV4cG9ydCBjb25zdCBaZXJvV2lkdGhTcGFjZSA9IFwiXFx1MjAwYlwiO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZU5vZGUoX25vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzTWFya1R5cGVDb21wYXRpYmxlV2l0aE1hcmsoXG4gICAgbWFya1R5cGU6IE1hcmtUeXBlLFxuICAgIG1hcms6IFBNTWFyayxcbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhbWFyay50eXBlLmV4Y2x1ZGVzKG1hcmtUeXBlKSAmJiAhbWFya1R5cGUuZXhjbHVkZXMobWFyay50eXBlKTtcbn1cblxuZnVuY3Rpb24gaXNNYXJrVHlwZUFsbG93ZWRJbk5vZGUoXG4gICAgbWFya1R5cGU6IE1hcmtUeXBlLFxuICAgIHN0YXRlOiBFZGl0b3JTdGF0ZSxcbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0b2dnbGVNYXJrKG1hcmtUeXBlKShzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNsb3Nlc3QoXG4gICAgbm9kZTogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHM6IHN0cmluZyxcbik6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgbGV0IGVsID0gbm9kZSBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKGVsKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlcyA9IGVsLm1hdGNoZXMgPyBcIm1hdGNoZXNcIiA6IFwibXNNYXRjaGVzU2VsZWN0b3JcIjtcblxuICAgIGRvIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZWxbbWF0Y2hlc10gJiYgZWxbbWF0Y2hlc10ocykpIHtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgICAgICBlbCA9IChlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGUpIGFzIEhUTUxFbGVtZW50O1xuICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzSW1hZ2UgPSAoZmlsZVR5cGU/OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAhIWZpbGVUeXBlICYmXG4gICAgICAgIChmaWxlVHlwZS5pbmRleE9mKFwiaW1hZ2UvXCIpID4gLTEgfHwgZmlsZVR5cGUuaW5kZXhPZihcInZpZGVvL1wiKSA+IC0xKVxuICAgICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2FuTW92ZVVwKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW9uLCBkb2MgfSA9IHN0YXRlO1xuXG4gICAgLyoqXG4gICAgICogSWYgdGhlcmVcInMgYSBtZWRpYSBlbGVtZW50IG9uIHRoZSBzZWxlY3Rpb24sXG4gICAgICogYWRkIHRleHQgYmxvY2tzIHdpdGggYXJyb3cgbmF2aWdhdGlvbi5cbiAgICAgKiBBbHNvLCB0aGUgc2VsZWN0aW9uIGNvdWxkIGJlIG1lZGlhIHwgbWVkaWFHcm91cC5cbiAgICAgKi9cbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbikge1xuICAgICAgICBpZiAoc2VsZWN0aW9uLm5vZGUudHlwZS5uYW1lID09PSBcIm1lZGlhXCIpIHtcbiAgICAgICAgICAgIC8qKiBXZWlyZCB3YXkgb2YgY2hlY2tpbmcgaWYgdGhlIHByZXZpb3VzIGVsZW1lbnQgaXMgYSBwYXJhZ3JhcGggKi9cbiAgICAgICAgICAgIGNvbnN0IG1lZGlhQW5jZXN0b3JOb2RlID0gZG9jLm5vZGVBdChzZWxlY3Rpb24uYW5jaG9yIC0gMyk7XG4gICAgICAgICAgICByZXR1cm4gISEoXG4gICAgICAgICAgICAgICAgbWVkaWFBbmNlc3Rvck5vZGUgJiYgbWVkaWFBbmNlc3Rvck5vZGUudHlwZS5uYW1lID09PSBcInBhcmFncmFwaFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbi5ub2RlLnR5cGUubmFtZSA9PT0gXCJtZWRpYUdyb3VwXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lZGlhR3JvdXBBbmNlc3Rvck5vZGUgPSBzZWxlY3Rpb24uJGFuY2hvci5ub2RlQmVmb3JlO1xuICAgICAgICAgICAgcmV0dXJuICEhKFxuICAgICAgICAgICAgICAgIG1lZGlhR3JvdXBBbmNlc3Rvck5vZGUgJiZcbiAgICAgICAgICAgICAgICBtZWRpYUdyb3VwQW5jZXN0b3JOb2RlLnR5cGUubmFtZSA9PT0gXCJwYXJhZ3JhcGhcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSB7XG4gICAgICAgIGlmICghc2VsZWN0aW9uLmVtcHR5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhYXRUaGVCZWdpbm5pbmdPZkRvYyhzdGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5Nb3ZlRG93bihzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IHNlbGVjdGlvbiwgZG9jIH0gPSBzdGF0ZTtcblxuICAgIC8qKlxuICAgICAqIElmIHRoZXJlXCJzIGEgbWVkaWEgZWxlbWVudCBvbiB0aGUgc2VsZWN0aW9uLFxuICAgICAqIGFkZCB0ZXh0IGJsb2NrcyB3aXRoIGFycm93IG5hdmlnYXRpb24uXG4gICAgICogQWxzbywgdGhlIHNlbGVjdGlvbiBjb3VsZCBiZSBtZWRpYSB8IG1lZGlhR3JvdXAuXG4gICAgICovXG4gICAgaWYgKHNlbGVjdGlvbiBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHNlbGVjdGlvbi5ub2RlLnR5cGUubmFtZSA9PT0gXCJtZWRpYVwiKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlQWZ0ZXIgPSBkb2Mubm9kZUF0KHNlbGVjdGlvbi4kaGVhZC5hZnRlcigpKTtcbiAgICAgICAgICAgIHJldHVybiAhIShub2RlQWZ0ZXIgJiYgbm9kZUFmdGVyLnR5cGUubmFtZSA9PT0gXCJwYXJhZ3JhcGhcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uLm5vZGUudHlwZS5uYW1lID09PSBcIm1lZGlhR3JvdXBcIikge1xuICAgICAgICAgICAgcmV0dXJuICEoXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLiRoZWFkLnBhcmVudE9mZnNldCA9PT0gc2VsZWN0aW9uLiRhbmNob3IucGFyZW50LmNvbnRlbnQuc2l6ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgVGV4dFNlbGVjdGlvbikge1xuICAgICAgICBpZiAoIXNlbGVjdGlvbi5lbXB0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gIWF0VGhlRW5kT2ZEb2Moc3RhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTZWxlY3Rpb25JbnNpZGVMYXN0Tm9kZUluRG9jdW1lbnQoXG4gICAgc2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4pOiBib29sZWFuIHtcbiAgICBjb25zdCBkb2NOb2RlID0gc2VsZWN0aW9uLiRhbmNob3Iubm9kZSgwKTtcbiAgICBjb25zdCByb290Tm9kZSA9IHNlbGVjdGlvbi4kYW5jaG9yLm5vZGUoMSk7XG5cbiAgICByZXR1cm4gZG9jTm9kZS5sYXN0Q2hpbGQgPT09IHJvb3ROb2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXRUaGVFbmRPZkRvYyhzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IHNlbGVjdGlvbiwgZG9jIH0gPSBzdGF0ZTtcbiAgICByZXR1cm4gZG9jLm5vZGVTaXplIC0gc2VsZWN0aW9uLiR0by5wb3MgLSAyID09PSBzZWxlY3Rpb24uJHRvLmRlcHRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXRUaGVCZWdpbm5pbmdPZkRvYyhzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IHNlbGVjdGlvbiB9ID0gc3RhdGU7XG4gICAgcmV0dXJuIHNlbGVjdGlvbi4kZnJvbS5wb3MgPT09IHNlbGVjdGlvbi4kZnJvbS5kZXB0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF0VGhlRW5kT2ZCbG9jayhzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IHNlbGVjdGlvbiB9ID0gc3RhdGU7XG4gICAgY29uc3QgeyAkdG8gfSA9IHNlbGVjdGlvbjtcbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgR2FwQ3Vyc29yKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdGlvbiBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24gJiYgc2VsZWN0aW9uLm5vZGUuaXNCbG9jaykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGVuZFBvc2l0aW9uT2ZQYXJlbnQoJHRvKSA9PT0gJHRvLnBvcyArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdFRoZUJlZ2lubmluZ09mQmxvY2soc3RhdGU6IEVkaXRvclN0YXRlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBzZWxlY3Rpb24gfSA9IHN0YXRlO1xuICAgIGNvbnN0IHsgJGZyb20gfSA9IHNlbGVjdGlvbjtcbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgR2FwQ3Vyc29yKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdGlvbiBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24gJiYgc2VsZWN0aW9uLm5vZGUuaXNCbG9jaykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXJ0UG9zaXRpb25PZlBhcmVudCgkZnJvbSkgPT09ICRmcm9tLnBvcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UG9zaXRpb25PZlBhcmVudChyZXNvbHZlZFBvczogUmVzb2x2ZWRQb3MpOiBudW1iZXIge1xuICAgIHJldHVybiByZXNvbHZlZFBvcy5zdGFydChyZXNvbHZlZFBvcy5kZXB0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmRQb3NpdGlvbk9mUGFyZW50KHJlc29sdmVkUG9zOiBSZXNvbHZlZFBvcyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHJlc29sdmVkUG9zLmVuZChyZXNvbHZlZFBvcy5kZXB0aCkgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3Vyc29yKHNlbGVjdGlvbjogU2VsZWN0aW9uKTogUmVzb2x2ZWRQb3MgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiAoc2VsZWN0aW9uIGFzIFRleHRTZWxlY3Rpb24pLiRjdXJzb3IgfHwgdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgbWFyayBpcyBhbGxvd2VkIGF0IHRoZSBjdXJyZW50IHNlbGVjdGlvbiAvIGN1cnNvciBiYXNlZCBvbiBhIGdpdmVuIHN0YXRlLlxuICogVGhpcyBtZXRob2QgbG9va3MgYXQgYm90aCB0aGUgY3VycmVudGx5IGFjdGl2ZSBtYXJrcyBvbiB0aGUgdHJhbnNhY3Rpb24sIGFzIHdlbGwgYXNcbiAqIHRoZSBub2RlIGFuZCBtYXJrcyBhdCB0aGUgY3VycmVudCBzZWxlY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZSBnaXZlbiBtYXJrIHR5cGUgaXNcbiAqIGFsbG93ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc01hcmtUeXBlQWxsb3dlZEluQ3VycmVudFNlbGVjdGlvbihcbiAgICBtYXJrVHlwZTogTWFya1R5cGUsXG4gICAgc3RhdGU6IEVkaXRvclN0YXRlLFxuKSB7XG5cbiAgICBpZiAoIWlzTWFya1R5cGVBbGxvd2VkSW5Ob2RlKG1hcmtUeXBlLCBzdGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZW1wdHksICRjdXJzb3IsIHJhbmdlcyB9ID0gc3RhdGUuc2VsZWN0aW9uIGFzIFRleHRTZWxlY3Rpb247XG4gICAgaWYgKGVtcHR5ICYmICEkY3Vyc29yKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NvbXBhdGlibGVNYXJrVHlwZSA9IChtYXJrOiBQTU1hcmspID0+XG4gICAgICAgIGlzTWFya1R5cGVDb21wYXRpYmxlV2l0aE1hcmsobWFya1R5cGUsIG1hcmspO1xuXG4gICAgLy8gSGFuZGxlIGFueSBuZXcgbWFya3MgaW4gdGhlIGN1cnJlbnQgdHJhbnNhY3Rpb25cbiAgICBpZiAoXG4gICAgICAgIHN0YXRlLnRyLnN0b3JlZE1hcmtzICYmXG4gICAgICAgICFzdGF0ZS50ci5zdG9yZWRNYXJrcy5ldmVyeShpc0NvbXBhdGlibGVNYXJrVHlwZSlcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICgkY3Vyc29yKSB7XG4gICAgICAgIHJldHVybiAkY3Vyc29yLm1hcmtzKCkuZXZlcnkoaXNDb21wYXRpYmxlTWFya1R5cGUpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGV2ZXJ5IG5vZGUgaW4gYSBzZWxlY3Rpb24gLSBlbnN1cmluZyB0aGF0IGl0IGlzIGNvbXBhdGlibGUgd2l0aCB0aGUgY3VycmVudCBtYXJrIHR5cGVcbiAgICByZXR1cm4gcmFuZ2VzLmV2ZXJ5KCh7ICRmcm9tLCAkdG8gfSkgPT4ge1xuICAgICAgICBsZXQgYWxsb3dlZEluQWN0aXZlTWFya3MgPVxuICAgICAgICAgICAgJGZyb20uZGVwdGggPT09IDAgPyBzdGF0ZS5kb2MubWFya3MuZXZlcnkoaXNDb21wYXRpYmxlTWFya1R5cGUpIDogdHJ1ZTtcblxuICAgICAgICBzdGF0ZS5kb2Mubm9kZXNCZXR3ZWVuKCRmcm9tLnBvcywgJHRvLnBvcywgbm9kZSA9PiB7XG4gICAgICAgICAgICBhbGxvd2VkSW5BY3RpdmVNYXJrcyA9XG4gICAgICAgICAgICAgICAgYWxsb3dlZEluQWN0aXZlTWFya3MgJiYgbm9kZS5tYXJrcy5ldmVyeShpc0NvbXBhdGlibGVNYXJrVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhbGxvd2VkSW5BY3RpdmVNYXJrcztcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBTdGVwIHRocm91Z2ggYmxvY2stbm9kZXMgYmV0d2VlbiAkZnJvbSBhbmQgJHRvIGFuZCByZXR1cm5zIGZhbHNlIGlmIGEgbm9kZSBpc1xuICogZm91bmQgdGhhdCBpc25cInQgb2YgdGhlIHNwZWNpZmllZCB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JhbmdlT2ZUeXBlKFxuICAgIGRvYzogTm9kZSxcbiAgICAkZnJvbTogUmVzb2x2ZWRQb3MsXG4gICAgJHRvOiBSZXNvbHZlZFBvcyxcbiAgICBub2RlVHlwZTogTm9kZVR5cGUsXG4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBnZXRBbmNlc3Rvck5vZGVzQmV0d2Vlbihkb2MsICRmcm9tLCAkdG8pLmZpbHRlcihcbiAgICAgICAgICAgIG5vZGUgPT4gbm9kZS50eXBlICE9PSBub2RlVHlwZSxcbiAgICAgICAgKS5sZW5ndGggPT09IDBcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2xpY2VXaXRoQ29udGVudChjb250ZW50OiBzdHJpbmcsIHN0YXRlOiBFZGl0b3JTdGF0ZSkge1xuICAgIHJldHVybiBuZXcgU2xpY2UoRnJhZ21lbnQuZnJvbShzdGF0ZS5zY2hlbWEudGV4dChjb250ZW50KSksIDAsIDApO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgaWYgY29udGVudCBpbnNpZGUgYSBzZWxlY3Rpb24gY2FuIGJlIGpvaW5lZCB3aXRoIHRoZSBuZXh0IGJsb2NrLlxuICogV2UgbmVlZCB0aGlzIGNoZWNrIHNpbmNlIHRoZSBidWlsdC1pbiBtZXRob2QgZm9yIFwiam9pbkRvd25cIiB3aWxsIGpvaW4gYSBvcmRlcmVkTGlzdCB3aXRoIGJ1bGxldExpc3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Kb2luRG93bihcbiAgICBzZWxlY3Rpb246IFNlbGVjdGlvbixcbiAgICBkb2M6IGFueSxcbiAgICBub2RlVHlwZTogTm9kZVR5cGUsXG4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gY2hlY2tOb2RlRG93bihzZWxlY3Rpb24sIGRvYywgbm9kZSA9PiBub2RlLnR5cGUgPT09IG5vZGVUeXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTm9kZURvd24oXG4gICAgc2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4gICAgZG9jOiBOb2RlLFxuICAgIGZpbHRlcjogKG5vZGU6IE5vZGUpID0+IGJvb2xlYW4sXG4pOiBib29sZWFuIHtcbiAgICBjb25zdCByZXMgPSBkb2MucmVzb2x2ZShcbiAgICAgICAgc2VsZWN0aW9uLiR0by5hZnRlcihmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsIHNlbGVjdGlvbi4kdG8pLmRlcHRoKSxcbiAgICApO1xuICAgIHJldHVybiByZXMubm9kZUFmdGVyID8gZmlsdGVyKHJlcy5ub2RlQWZ0ZXIpIDogZmFsc2U7XG59XG5cbmV4cG9ydCBjb25zdCBzZXROb2RlU2VsZWN0aW9uID0gKHZpZXc6IEVkaXRvclZpZXcsIHBvczogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZSwgZGlzcGF0Y2ggfSA9IHZpZXc7XG5cbiAgICBpZiAoIWlzRmluaXRlKHBvcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRyID0gc3RhdGUudHIuc2V0U2VsZWN0aW9uKE5vZGVTZWxlY3Rpb24uY3JlYXRlKHN0YXRlLmRvYywgcG9zKSk7XG4gICAgZGlzcGF0Y2godHIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRleHRTZWxlY3Rpb24oXG4gICAgdmlldzogRWRpdG9yVmlldyxcbiAgICBhbmNob3I6IG51bWJlcixcbiAgICBoZWFkPzogbnVtYmVyLFxuKSB7XG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gdmlldztcbiAgICBjb25zdCB0ciA9IHN0YXRlLnRyLnNldFNlbGVjdGlvbihcbiAgICAgICAgVGV4dFNlbGVjdGlvbi5jcmVhdGUoc3RhdGUuZG9jLCBhbmNob3IsIGhlYWQpLFxuICAgICk7XG4gICAgdmlldy5kaXNwYXRjaCh0cik7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBjb250ZW50IGluc2lkZSBhIHNlbGVjdGlvbiBjYW4gYmUgam9pbmVkIHdpdGggdGhlIHByZXZpb3VzIGJsb2NrLlxuICogV2UgbmVlZCB0aGlzIGNoZWNrIHNpbmNlIHRoZSBidWlsdC1pbiBtZXRob2QgZm9yIFwiam9pblVwXCIgd2lsbCBqb2luIGEgb3JkZXJlZExpc3Qgd2l0aCBidWxsZXRMaXN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuSm9pblVwKFxuICAgIHNlbGVjdGlvbjogU2VsZWN0aW9uLFxuICAgIGRvYzogYW55LFxuICAgIG5vZGVUeXBlOiBOb2RlVHlwZSxcbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlcyA9IGRvYy5yZXNvbHZlKFxuICAgICAgICBzZWxlY3Rpb24uJGZyb20uYmVmb3JlKGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgc2VsZWN0aW9uLiRmcm9tKS5kZXB0aCksXG4gICAgKTtcbiAgICByZXR1cm4gcmVzLm5vZGVCZWZvcmUgJiYgcmVzLm5vZGVCZWZvcmUudHlwZSA9PT0gbm9kZVR5cGU7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbGwgdG9wLWxldmVsIGFuY2VzdG9yLW5vZGVzIGJldHdlZW4gJGZyb20gYW5kICR0b1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5jZXN0b3JOb2Rlc0JldHdlZW4oXG4gICAgZG9jOiBOb2RlLFxuICAgICRmcm9tOiBSZXNvbHZlZFBvcyxcbiAgICAkdG86IFJlc29sdmVkUG9zLFxuKTogTm9kZVtdIHtcbiAgICBjb25zdCBub2RlcyA9IEFycmF5PE5vZGU+KCk7XG4gICAgY29uc3QgbWF4RGVwdGggPSBmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsICRmcm9tKS5kZXB0aDtcbiAgICBsZXQgY3VycmVudCA9IGRvYy5yZXNvbHZlKCRmcm9tLnN0YXJ0KG1heERlcHRoKSk7XG5cbiAgICB3aGlsZSAoY3VycmVudC5wb3MgPD0gJHRvLnN0YXJ0KCR0by5kZXB0aCkpIHtcbiAgICAgICAgY29uc3QgZGVwdGggPSBNYXRoLm1pbihjdXJyZW50LmRlcHRoLCBtYXhEZXB0aCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjdXJyZW50Lm5vZGUoZGVwdGgpO1xuXG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlcHRoID09PSAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXh0OiBSZXNvbHZlZFBvcyA9IGRvYy5yZXNvbHZlKGN1cnJlbnQuYWZ0ZXIoZGVwdGgpKTtcbiAgICAgICAgaWYgKG5leHQuc3RhcnQoZGVwdGgpID49IGRvYy5ub2RlU2l6ZSAtIDIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQuZGVwdGggIT09IGN1cnJlbnQuZGVwdGgpIHtcbiAgICAgICAgICAgIG5leHQgPSBkb2MucmVzb2x2ZShuZXh0LnBvcyArIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQuZGVwdGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBkb2MucmVzb2x2ZShuZXh0LnN0YXJ0KG5leHQuZGVwdGgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBkb2MucmVzb2x2ZShuZXh0LmVuZChuZXh0LmRlcHRoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXM7XG59XG5cbi8qKlxuICogRmluZHMgYWxsIFwic2VsZWN0aW9uLWdyb3Vwc1wiIHdpdGhpbiBhIHJhbmdlLiBBIHNlbGVjdGlvbiBncm91cCBpcyBiYXNlZCBvbiBhbmNlc3RvcnMuXG4gKlxuICogRXhhbXBsZTpcbiAqIEdpdmVuIHRoZSBmb2xsb3dpbmcgZG9jdW1lbnQgYW5kIHNlbGVjdGlvbiAoezx9ID0gc3RhcnQgb2Ygc2VsZWN0aW9uIGFuZCB7Pn0gPSBlbmQpXG4gKiAgZG9jXG4gKiAgICBibG9ja3F1b3RlXG4gKiAgICAgIHVsXG4gKiAgICAgICAgbGlcbiAqICAgICAgICBsaXs8fVxuICogICAgICAgIGxpXG4gKiAgICAgcFxuICogICAgIHB7Pn1cbiAqXG4gKiBUaGUgb3V0cHV0IHdpbGwgYmUgdHdvIHNlbGVjdGlvbi1ncm91cHMuIE9uZSB3aXRoaW4gdGhlIHVsIGFuZCBvbmUgd2l0aCB0aGUgdHdvIHBhcmFncmFwaHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHcm91cHNJblJhbmdlKFxuICAgIGRvYzogTm9kZSxcbiAgICAkZnJvbTogUmVzb2x2ZWRQb3MsXG4gICAgJHRvOiBSZXNvbHZlZFBvcyxcbiAgICBpc05vZGVWYWxpZDogKG5vZGU6IE5vZGUpID0+IGJvb2xlYW4gPSB2YWxpZGF0ZU5vZGUsXG4pOiBBcnJheTx7ICRmcm9tOiBSZXNvbHZlZFBvczsgJHRvOiBSZXNvbHZlZFBvcyB9PiB7XG4gICAgY29uc3QgZ3JvdXBzID0gQXJyYXk8eyAkZnJvbTogUmVzb2x2ZWRQb3M7ICR0bzogUmVzb2x2ZWRQb3MgfT4oKTtcbiAgICBjb25zdCBjb21tb25BbmNlc3RvciA9IGhhc0NvbW1vbkFuY2VzdG9yKGRvYywgJGZyb20sICR0byk7XG4gICAgY29uc3QgZnJvbUFuY2VzdG9yID0gZmluZEFuY2VzdG9yUG9zaXRpb24oZG9jLCAkZnJvbSk7XG5cbiAgICBpZiAoXG4gICAgICAgIGNvbW1vbkFuY2VzdG9yIHx8XG4gICAgICAgIChmcm9tQW5jZXN0b3IuZGVwdGggPT09IDEgJiYgaXNOb2RlVmFsaWQoJGZyb20ubm9kZSgxKSkpXG4gICAgKSB7XG4gICAgICAgIGdyb3Vwcy5wdXNoKHsgJGZyb20sICR0byB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgY3VycmVudCA9ICRmcm9tO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50LnBvcyA8ICR0by5wb3MpIHtcbiAgICAgICAgICAgIGxldCBhbmNlc3RvclBvcyA9IGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgY3VycmVudCk7XG4gICAgICAgICAgICB3aGlsZSAoYW5jZXN0b3JQb3MuZGVwdGggPiAxKSB7XG4gICAgICAgICAgICAgICAgYW5jZXN0b3JQb3MgPSBmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsIGFuY2VzdG9yUG9zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW5kUG9zID0gZG9jLnJlc29sdmUoXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBub3QgYmUgc21hbGxlciB0aGVuIHN0YXJ0IHBvc2l0aW9uIGluIGNhc2Ugb2YgYW4gZW1wdHkgcGFyYWdyYXBoIGZvciBleGFtcGxlLlxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2VzdG9yUG9zLnN0YXJ0KGFuY2VzdG9yUG9zLmRlcHRoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2VzdG9yUG9zLmVuZChhbmNlc3RvclBvcy5kZXB0aCkgLSAzLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAkdG8ucG9zLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBncm91cHMucHVzaCh7XG4gICAgICAgICAgICAgICAgJGZyb206IGN1cnJlbnQsXG4gICAgICAgICAgICAgICAgJHRvOiBlbmRQb3MsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3VycmVudCA9IGRvYy5yZXNvbHZlKE1hdGgubWluKGVuZFBvcy5hZnRlcigxKSArIDEsIGRvYy5ub2RlU2l6ZSAtIDIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBncm91cHM7XG59XG5cbi8qKlxuICogVHJhdmVyc2UgdGhlIGRvY3VtZW50IHVudGlsIGFuIFwiYW5jZXN0b3JcIiBpcyBmb3VuZC4gQW55IG5lc3RhYmxlIGJsb2NrIGNhbiBiZSBhbiBhbmNlc3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYzogTm9kZSwgcG9zOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IG5lc3RhYmxlQmxvY2tzID0gW1wiYmxvY2txdW90ZVwiLCBcImJ1bGxldExpc3RcIiwgXCJvcmRlcmVkTGlzdFwiXTtcblxuICAgIGlmIChwb3MuZGVwdGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBsZXQgbm9kZTogTm9kZSB8IHVuZGVmaW5lZCA9IHBvcy5ub2RlKHBvcy5kZXB0aCk7XG4gICAgbGV0IG5ld1BvcyA9IHBvcztcbiAgICB3aGlsZSAocG9zLmRlcHRoID49IDEpIHtcbiAgICAgICAgcG9zID0gZG9jLnJlc29sdmUocG9zLmJlZm9yZShwb3MuZGVwdGgpKTtcbiAgICAgICAgbm9kZSA9IHBvcy5ub2RlKHBvcy5kZXB0aCk7XG5cbiAgICAgICAgaWYgKG5vZGUgJiYgbmVzdGFibGVCbG9ja3MuaW5kZXhPZihub2RlLnR5cGUubmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBuZXdQb3MgPSBwb3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3UG9zO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB0d28gcG9zaXRpb25zIGhhdmUgYSBjb21tb24gYW5jZXN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb21tb25BbmNlc3RvcihcbiAgICBkb2M6IE5vZGUsXG4gICAgJGZyb206IFJlc29sdmVkUG9zLFxuICAgICR0bzogUmVzb2x2ZWRQb3MsXG4pOiBib29sZWFuIHtcbiAgICBsZXQgY3VycmVudDtcbiAgICBsZXQgdGFyZ2V0O1xuXG4gICAgaWYgKCRmcm9tLmRlcHRoID4gJHRvLmRlcHRoKSB7XG4gICAgICAgIGN1cnJlbnQgPSBmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsICRmcm9tKTtcbiAgICAgICAgdGFyZ2V0ID0gZmluZEFuY2VzdG9yUG9zaXRpb24oZG9jLCAkdG8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgPSBmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsICR0byk7XG4gICAgICAgIHRhcmdldCA9IGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgJGZyb20pO1xuICAgIH1cblxuICAgIHdoaWxlIChjdXJyZW50LmRlcHRoID4gdGFyZ2V0LmRlcHRoICYmIGN1cnJlbnQuZGVwdGggPiAxKSB7XG4gICAgICAgIGN1cnJlbnQgPSBmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsIGN1cnJlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50Lm5vZGUoY3VycmVudC5kZXB0aCkgPT09IHRhcmdldC5ub2RlKHRhcmdldC5kZXB0aCk7XG59XG5cbi8qKlxuICogVGFrZXMgYSBzZWxlY3Rpb24gJGZyb20gYW5kICR0byBhbmQgbGlmdCBhbGwgdGV4dCBub2RlcyBmcm9tIHRoZWlyIHBhcmVudHMgdG8gZG9jdW1lbnQtbGV2ZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZnRTZWxlY3Rpb24oXG4gICAgdHI6IFRyYW5zYWN0aW9uLFxuICAgIGRvYzogTm9kZSxcbiAgICAkZnJvbTogUmVzb2x2ZWRQb3MsXG4gICAgJHRvOiBSZXNvbHZlZFBvcyxcbikge1xuICAgIGxldCBzdGFydFBvcyA9ICRmcm9tLnN0YXJ0KCRmcm9tLmRlcHRoKTtcbiAgICBsZXQgZW5kUG9zID0gJHRvLmVuZCgkdG8uZGVwdGgpO1xuICAgIGNvbnN0IHRhcmdldCA9IE1hdGgubWF4KDAsIGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgJGZyb20pLmRlcHRoIC0gMSk7XG5cbiAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHN0YXJ0UG9zLCBlbmRQb3MsIChub2RlLCBwb3MpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbm9kZS5pc1RleHQgfHwgLy8gVGV4dCBub2RlXG4gICAgICAgICAgICAobm9kZS5pc1RleHRibG9jayAmJiAhbm9kZS50ZXh0Q29udGVudCkgLy8gRW1wdHkgcGFyYWdyYXBoXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gdHIuZG9jLnJlc29sdmUodHIubWFwcGluZy5tYXAocG9zKSk7XG4gICAgICAgICAgICBjb25zdCBzZWwgPSBuZXcgTm9kZVNlbGVjdGlvbihyZXMpO1xuICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWwuJGZyb20uYmxvY2tSYW5nZShzZWwuJHRvKTtcblxuICAgICAgICAgICAgaWYgKGxpZnRUYXJnZXQocmFuZ2UgYXMgTm9kZVJhbmdlKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdHIubGlmdChyYW5nZSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhcnRQb3MgPSB0ci5tYXBwaW5nLm1hcChzdGFydFBvcyk7XG4gICAgZW5kUG9zID0gdHIubWFwcGluZy5tYXAoZW5kUG9zKTtcbiAgICBlbmRQb3MgPSB0ci5kb2MucmVzb2x2ZShlbmRQb3MpLmVuZCh0ci5kb2MucmVzb2x2ZShlbmRQb3MpLmRlcHRoKTsgLy8gV2Ugd2FudCB0byBzZWxlY3QgdGhlIGVudGlyZSBub2RlXG5cbiAgICB0ci5zZXRTZWxlY3Rpb24oXG4gICAgICAgIG5ldyBUZXh0U2VsZWN0aW9uKHRyLmRvYy5yZXNvbHZlKHN0YXJ0UG9zKSwgdHIuZG9jLnJlc29sdmUoZW5kUG9zKSksXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRyOiB0cixcbiAgICAgICAgJGZyb206IHRyLmRvYy5yZXNvbHZlKHN0YXJ0UG9zKSxcbiAgICAgICAgJHRvOiB0ci5kb2MucmVzb2x2ZShlbmRQb3MpLFxuICAgIH07XG59XG5cbi8qKlxuICogTGlmdCBub2RlcyBpbiBibG9jayB0byBvbmUgbGV2ZWwgYWJvdmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaWZ0U2libGluZ05vZGVzKHZpZXc6IEVkaXRvclZpZXcpIHtcbiAgICBjb25zdCB7IHRyIH0gPSB2aWV3LnN0YXRlO1xuICAgIGNvbnN0IHsgJGZyb20sICR0byB9ID0gdmlldy5zdGF0ZS5zZWxlY3Rpb247XG4gICAgY29uc3QgYmxvY2tTdGFydCA9IHRyLmRvYy5yZXNvbHZlKCRmcm9tLnN0YXJ0KCRmcm9tLmRlcHRoIC0gMSkpO1xuICAgIGNvbnN0IGJsb2NrRW5kID0gdHIuZG9jLnJlc29sdmUoJHRvLmVuZCgkdG8uZGVwdGggLSAxKSk7XG4gICAgY29uc3QgcmFuZ2UgPSBibG9ja1N0YXJ0LmJsb2NrUmFuZ2UoYmxvY2tFbmQpO1xuICAgIHZpZXcuZGlzcGF0Y2godHIubGlmdChyYW5nZSBhcyBOb2RlUmFuZ2UsIGJsb2NrU3RhcnQuZGVwdGggLSAxKSk7XG59XG5cbi8qKlxuICogTGlmdCBzaWJsaW5nIG5vZGVzIHRvIGRvY3VtZW50LWxldmVsIGFuZCBzZWxlY3QgdGhlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZnRBbmRTZWxlY3RTaWJsaW5nTm9kZXModmlldzogRWRpdG9yVmlldyk6IFRyYW5zYWN0aW9uIHtcbiAgICBjb25zdCB7IHRyIH0gPSB2aWV3LnN0YXRlO1xuICAgIGNvbnN0IHsgJGZyb20sICR0byB9ID0gdmlldy5zdGF0ZS5zZWxlY3Rpb247XG4gICAgY29uc3QgYmxvY2tTdGFydCA9IHRyLmRvYy5yZXNvbHZlKCRmcm9tLnN0YXJ0KCRmcm9tLmRlcHRoIC0gMSkpO1xuICAgIGNvbnN0IGJsb2NrRW5kID0gdHIuZG9jLnJlc29sdmUoJHRvLmVuZCgkdG8uZGVwdGggLSAxKSk7XG4gICAgLy8gVE9ETzogW3RzMzBdIGhhbmRsZSB2b2lkIGFuZCBudWxsIHByb3Blcmx5XG4gICAgY29uc3QgcmFuZ2UgPSBibG9ja1N0YXJ0LmJsb2NrUmFuZ2UoYmxvY2tFbmQpIGFzIE5vZGVSYW5nZTtcbiAgICB0ci5zZXRTZWxlY3Rpb24obmV3IFRleHRTZWxlY3Rpb24oYmxvY2tTdGFydCwgYmxvY2tFbmQpKTtcbiAgICB0ci5saWZ0KHJhbmdlIGFzIE5vZGVSYW5nZSwgYmxvY2tTdGFydC5kZXB0aCAtIDEpO1xuICAgIHJldHVybiB0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBJbihcbiAgICBub2RlVHlwZTogTm9kZVR5cGUsXG4gICAgdHI6IFRyYW5zYWN0aW9uLFxuICAgICRmcm9tOiBSZXNvbHZlZFBvcyxcbiAgICAkdG86IFJlc29sdmVkUG9zLFxuKTogVHJhbnNhY3Rpb24ge1xuICAgIGNvbnN0IHJhbmdlID0gJGZyb20uYmxvY2tSYW5nZSgkdG8pIGFzIGFueTtcbiAgICBjb25zdCB3cmFwcGluZyA9IHJhbmdlICYmIChmaW5kV3JhcHBpbmcocmFuZ2UsIG5vZGVUeXBlKSBhcyBhbnkpO1xuICAgIGlmICh3cmFwcGluZykge1xuICAgICAgICB0ciA9IHRyLndyYXAocmFuZ2UsIHdyYXBwaW5nKS5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cbiAgICByZXR1cm4gdHI7XG59XG5cbi8qKlxuICogUmVwZWF0aW5nIHN0cmluZyBmb3IgbXVsdGlwbGUgdGltZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1JlcGVhdCh0ZXh0OiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGxlbmd0aDsgeCsrKSB7XG4gICAgICAgIHJlc3VsdCArPSB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgcmVwbGFjZW1lbnQgZm9yIGBBcnJheS5mcm9tYCB1bnRpbCBpdCBiZWNvbWVzIHdpZGVseSBpbXBsZW1lbnRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5RnJvbShvYmo6IGFueSk6IGFueVtdIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqKTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlbWVudCBmb3IgRWxlbWVudC5jbG9zZXN0LCB1bnRpbCBpdCBiZWNvbWVzIHdpZGVseSBpbXBsZW1lbnRlZFxuICogUmV0dXJucyB0aGUgYW5jZXN0b3IgZWxlbWVudCBvZiBhIHBhcnRpY3VsYXIgdHlwZSBpZiBleGlzdHMgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdEVsZW1lbnQoXG4gICAgbm9kZTogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHM6IHN0cmluZyxcbik6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIGNsb3Nlc3Qobm9kZSwgcyk7XG59XG5cbi8qXG4gKiBGcm9tIE1vZGVybml6clxuICogUmV0dXJucyB0aGUga2luZCBvZiB0cmFuc2l0aW9uZXZlbnQgYXZhaWxhYmxlIGZvciB0aGUgZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2hpY2hUcmFuc2l0aW9uRXZlbnQ8VHJhbnNpdGlvbkV2ZW50TmFtZSBleHRlbmRzIHN0cmluZz4oKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XG4gICAgY29uc3QgdHJhbnNpdGlvbnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgIHRyYW5zaXRpb246IFwidHJhbnNpdGlvbmVuZFwiLFxuICAgICAgICBNb3pUcmFuc2l0aW9uOiBcInRyYW5zaXRpb25lbmRcIixcbiAgICAgICAgT1RyYW5zaXRpb246IFwib1RyYW5zaXRpb25FbmRcIixcbiAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgdCBpbiB0cmFuc2l0aW9ucykge1xuICAgICAgICBpZiAoZWwuc3R5bGVbdCBhcyBrZXlvZiBDU1NTdHlsZURlY2xhcmF0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBVc2UgYSBnZW5lcmljIGFzIHRoZSByZXR1cm4gdHlwZSBiZWNhdXNlIFR5cGVTY3JpcHQgZG9lc250IGtub3dcbiAgICAgICAgICAgIC8vIGFib3V0IGNyb3NzIGJyb3dzZXIgZmVhdHVyZXMsIHNvIHdlIGNhc3QgaGVyZSB0byBhbGlnbiB0byB0aGVcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkIEV2ZW50IHNwZWMgYW5kIHByb3BhZ2F0ZSB0aGUgdHlwZSBwcm9wZXJseSB0byB0aGUgY2FsbGJhY2tzXG4gICAgICAgICAgICAvLyBvZiBgYWRkRXZlbnRMaXN0ZW5lcmAgYW5kIGByZW1vdmVFdmVudExpc3RlbmVyYC5cbiAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XSBhcyBUcmFuc2l0aW9uRXZlbnROYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHdpbGwgY3JlYXRlIGEgbGlzdCBvZiB3cmFwcGVyIGJsb2NrcyBwcmVzZW50IGluIGEgc2VsZWN0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRTZWxlY3RlZFdyYXBwZXJOb2RlcyhzdGF0ZTogRWRpdG9yU3RhdGUpOiBOb2RlVHlwZVtdIHtcbiAgICBjb25zdCBub2RlczogQXJyYXk8Tm9kZVR5cGU+ID0gW107XG4gICAgaWYgKHN0YXRlLnNlbGVjdGlvbikge1xuICAgICAgICBjb25zdCB7ICRmcm9tLCAkdG8gfSA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYmxvY2txdW90ZSxcbiAgICAgICAgICAgIHBhbmVsLFxuICAgICAgICAgICAgb3JkZXJlZExpc3QsXG4gICAgICAgICAgICBidWxsZXRMaXN0LFxuICAgICAgICAgICAgbGlzdEl0ZW0sXG4gICAgICAgICAgICBjb2RlQmxvY2ssXG4gICAgICAgIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG4gICAgICAgIHN0YXRlLmRvYy5ub2Rlc0JldHdlZW4oJGZyb20ucG9zLCAkdG8ucG9zLCBub2RlID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAobm9kZS5pc0Jsb2NrICYmXG4gICAgICAgICAgICAgICAgICAgIFtibG9ja3F1b3RlLCBwYW5lbCwgb3JkZXJlZExpc3QsIGJ1bGxldExpc3QsIGxpc3RJdGVtXS5pbmRleE9mKFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICApID49IDApIHx8XG4gICAgICAgICAgICAgICAgbm9kZS50eXBlID09PSBjb2RlQmxvY2tcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZS50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBub2Rlcztcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB3aWxsIGNoZWNrIGlmIGNoYW5naW5nIGJsb2NrIHR5cGVzOiBQYXJhZ3JhcGgsIEhlYWRpbmcgaXMgZW5hYmxlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUJsb2NrVHlwZXNEaXNhYmxlZChzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBub2Rlc1R5cGVzOiBOb2RlVHlwZVtdID0gZ2V0U2VsZWN0ZWRXcmFwcGVyTm9kZXMoc3RhdGUpO1xuICAgIGNvbnN0IHsgcGFuZWwgfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcbiAgICByZXR1cm4gbm9kZXNUeXBlcy5maWx0ZXIodHlwZSA9PiB0eXBlICE9PSBwYW5lbCkubGVuZ3RoID4gMDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzVGVtcG9yYXJ5ID0gKGlkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gaWQuaW5kZXhPZihcInRlbXBvcmFyeTpcIikgPT09IDA7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBpc0VtcHR5Tm9kZSA9IChzY2hlbWE6IFNjaGVtYSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICAgZG9jLFxuICAgICAgICBwYXJhZ3JhcGgsXG4gICAgICAgIGNvZGVCbG9jayxcbiAgICAgICAgYmxvY2txdW90ZSxcbiAgICAgICAgcGFuZWwsXG4gICAgICAgIGhlYWRpbmcsXG4gICAgICAgIGxpc3RJdGVtLFxuICAgICAgICBidWxsZXRMaXN0LFxuICAgICAgICBvcmRlcmVkTGlzdCxcbiAgICAgICAgdGFza0xpc3QsXG4gICAgICAgIHRhc2tJdGVtLFxuICAgICAgICBkZWNpc2lvbkxpc3QsXG4gICAgICAgIGRlY2lzaW9uSXRlbSxcbiAgICAgICAgbWVkaWEsXG4gICAgICAgIG1lZGlhR3JvdXAsXG4gICAgICAgIG1lZGlhU2luZ2xlLFxuICAgIH0gPSBzY2hlbWEubm9kZXM7XG4gICAgY29uc3QgaW5uZXJJc0VtcHR5Tm9kZSA9IChub2RlOiBOb2RlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIG1lZGlhOlxuICAgICAgICAgICAgY2FzZSBtZWRpYUdyb3VwOlxuICAgICAgICAgICAgY2FzZSBtZWRpYVNpbmdsZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlIHBhcmFncmFwaDpcbiAgICAgICAgICAgIGNhc2UgY29kZUJsb2NrOlxuICAgICAgICAgICAgY2FzZSBoZWFkaW5nOlxuICAgICAgICAgICAgY2FzZSB0YXNrSXRlbTpcbiAgICAgICAgICAgIGNhc2UgZGVjaXNpb25JdGVtOlxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmNvbnRlbnQuc2l6ZSA9PT0gMDtcbiAgICAgICAgICAgIGNhc2UgYmxvY2txdW90ZTpcbiAgICAgICAgICAgIGNhc2UgcGFuZWw6XG4gICAgICAgICAgICBjYXNlIGxpc3RJdGVtOlxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udGVudC5zaXplID09PSAyICYmIGlubmVySXNFbXB0eU5vZGUobm9kZS5jb250ZW50LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgYnVsbGV0TGlzdDpcbiAgICAgICAgICAgIGNhc2Ugb3JkZXJlZExpc3Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250ZW50LnNpemUgPT09IDQgJiYgaW5uZXJJc0VtcHR5Tm9kZShub2RlLmNvbnRlbnQuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSB0YXNrTGlzdDpcbiAgICAgICAgICAgIGNhc2UgZGVjaXNpb25MaXN0OlxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY29udGVudC5zaXplID09PSAyICYmIGlubmVySXNFbXB0eU5vZGUobm9kZS5jb250ZW50LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgZG9jOlxuICAgICAgICAgICAgICAgIGxldCBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRlbnQuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzRW1wdHkgPSBpc0VtcHR5ICYmIGlubmVySXNFbXB0eU5vZGUoY2hpbGQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0VtcHR5O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNOb2RlRW1wdHkobm9kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBpbm5lcklzRW1wdHlOb2RlO1xufTtcblxuZXhwb3J0IGNvbnN0IGluc2lkZVRhYmxlID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IEJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IHsgdGFibGUsIHRhYmxlQ2VsbCB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuXG4gICAgcmV0dXJuIGhhc1BhcmVudE5vZGVPZlR5cGUoW3RhYmxlLCB0YWJsZUNlbGxdKShzdGF0ZS5zZWxlY3Rpb24pO1xufTtcblxuZXhwb3J0IGNvbnN0IGluc2lkZVRhYmxlQ2VsbCA9IChzdGF0ZTogRWRpdG9yU3RhdGUpID0+IHtcbiAgICBjb25zdCB7IHRhYmxlQ2VsbCwgdGFibGVIZWFkZXIgfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcbiAgICByZXR1cm4gaGFzUGFyZW50Tm9kZU9mVHlwZShbdGFibGVDZWxsLCB0YWJsZUhlYWRlcl0pKHN0YXRlLnNlbGVjdGlvbik7XG59O1xuXG5leHBvcnQgY29uc3QgaXNFbGVtZW50SW5UYWJsZUNlbGwgPSAoXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsLFxuKTogSFRNTEVsZW1lbnQgfCBudWxsID0+IHtcbiAgICByZXR1cm4gY2xvc2VzdChlbGVtZW50LCBcInRkXCIpIHx8IGNsb3Nlc3QoZWxlbWVudCwgXCJ0aFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0xhc3RJdGVtTWVkaWFHcm91cCA9IChub2RlOiBOb2RlKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBjb250ZW50IH0gPSBub2RlO1xuICAgIHJldHVybiAhIWNvbnRlbnQubGFzdENoaWxkICYmIGNvbnRlbnQubGFzdENoaWxkLnR5cGUubmFtZSA9PT0gXCJtZWRpYUdyb3VwXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaXNJbkxpc3RJdGVtID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBoYXNQYXJlbnROb2RlT2ZUeXBlKHN0YXRlLnNjaGVtYS5ub2Rlcy5saXN0SXRlbSkoc3RhdGUuc2VsZWN0aW9uKTtcbn07XG5cbmV4cG9ydCBjb25zdCBoYXNPcGVuRW5kID0gKHNsaWNlOiBTbGljZSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBzbGljZS5vcGVuU3RhcnQgPiAwIHx8IHNsaWNlLm9wZW5FbmQgPiAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckNoaWxkcmVuQmV0d2VlbihcbiAgICBkb2M6IE5vZGUsXG4gICAgZnJvbTogbnVtYmVyLFxuICAgIHRvOiBudW1iZXIsXG4gICAgcHJlZGljYXRlOiAobm9kZTogTm9kZSwgcG9zOiBudW1iZXIsIHBhcmVudDogTm9kZSkgPT4gYm9vbGVhbiB8IHVuZGVmaW5lZCxcbikge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXSBhcyB7IG5vZGU6IE5vZGU7IHBvczogbnVtYmVyIH1bXTtcbiAgICBkb2Mubm9kZXNCZXR3ZWVuKGZyb20sIHRvLCAobm9kZSwgcG9zLCBwYXJlbnQpID0+IHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlLCBwb3MsIHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7IG5vZGUsIHBvcyB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVkdXBlPFQ+KFxuICAgIGxpc3Q6IFRbXSA9IFtdLFxuICAgIGl0ZXJhdGVlPzogKHA6IFQpID0+IFRba2V5b2YgVF0gfCBULFxuKTogVFtdIHtcbiAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IGl0ZXJhdGVlID8gbGlzdC5tYXAoaXRlcmF0ZWUpIDogbGlzdDtcblxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFxuICAgICAgICAubWFwKChpdGVtLCBpbmRleCwgbGlzdCkgPT4gKGxpc3QuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXggPyBpdGVtIDogbnVsbCkpXG4gICAgICAgIC5yZWR1Y2U8VFtdPihcbiAgICAgICAgICAgIChhY2MsIGl0ZW0sIGluZGV4KSA9PiAoISFpdGVtID8gYWNjLmNvbmNhdChsaXN0W2luZGV4XSkgOiBhY2MpLFxuICAgICAgICAgICAgW10sXG4gICAgICAgICk7XG59XG5cbmV4cG9ydCBjb25zdCBpc1RleHRTZWxlY3Rpb24gPSAoXG4gICAgc2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4pOiBzZWxlY3Rpb24gaXMgVGV4dFNlbGVjdGlvbiA9PiBzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uO1xuXG4vKiogSGVscGVyIHR5cGUgZm9yIHNpbmdsZSBhcmcgZnVuY3Rpb24gKi9cbnR5cGUgRnVuYzxBLCBCPiA9IChhOiBBKSA9PiBCO1xudHlwZSBGdW5jTjxBIGV4dGVuZHMgYW55W10sIEI+ID0gKC4uLmFyZ3M6IEEpID0+IEI7XG5cbi8qKlxuICogQ29tcG9zZSAxIHRvIG4gZnVuY3Rpb25zLlxuICogQHBhcmFtIGZ1bmMgZmlyc3QgZnVuY3Rpb25cbiAqIEBwYXJhbSBmdW5jcyBhZGRpdGlvbmFsIGZ1bmN0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxcbiAgICBGMSBleHRlbmRzIEZ1bmM8YW55LCBhbnk+LFxuICAgIEZOIGV4dGVuZHMgQXJyYXk8RnVuYzxhbnksIGFueT4+LFxuICAgIFIgZXh0ZW5kcyBGTiBleHRlbmRzIFtdXG4gICAgICAgID8gRjFcbiAgICAgICAgOiBGTiBleHRlbmRzIFtGdW5jPGluZmVyIEEsIGFueT5dXG4gICAgICAgICAgICA/IChhOiBBKSA9PiBSZXR1cm5UeXBlPEYxPlxuICAgICAgICAgICAgOiBGTiBleHRlbmRzIFthbnksIEZ1bmM8aW5mZXIgQSwgYW55Pl1cbiAgICAgICAgICAgICAgICA/IChhOiBBKSA9PiBSZXR1cm5UeXBlPEYxPlxuICAgICAgICAgICAgICAgIDogRk4gZXh0ZW5kcyBbYW55LCBhbnksIEZ1bmM8aW5mZXIgQSwgYW55Pl1cbiAgICAgICAgICAgICAgICAgICAgPyAoYTogQSkgPT4gUmV0dXJuVHlwZTxGMT5cbiAgICAgICAgICAgICAgICAgICAgOiBGTiBleHRlbmRzIFthbnksIGFueSwgYW55LCBGdW5jPGluZmVyIEEsIGFueT5dXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChhOiBBKSA9PiBSZXR1cm5UeXBlPEYxPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBGTiBleHRlbmRzIFthbnksIGFueSwgYW55LCBhbnksIEZ1bmM8aW5mZXIgQSwgYW55Pl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChhOiBBKSA9PiBSZXR1cm5UeXBlPEYxPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRnVuYzxhbnksIFJldHVyblR5cGU8RjE+PiAvLyBEb3VidGZ1bCB3ZVwiZCBldmVyIHdhbnQgdG8gcGlwZSB0aGlzIG1hbnkgZnVuY3Rpb25zLCBidXQgaW4gdGhlIG9mZiBjaGFuY2Ugc29tZW9uZSBkb2VzLCB3ZSBjYW4gc3RpbGwgaW5mZXIgdGhlIHJldHVybiB0eXBlXG4gICAgPihmdW5jOiBGMSwgLi4uZnVuY3M6IEZOKTogUiB7XG4gICAgY29uc3QgYWxsRnVuY3MgPSBbZnVuYywgLi4uZnVuY3NdO1xuICAgIHJldHVybiBmdW5jdGlvbiBjb21wb3NlZChyYXc6IGFueSkge1xuICAgICAgICByZXR1cm4gYWxsRnVuY3MucmVkdWNlUmlnaHQoKG1lbW8sIGZ1bmMpID0+IGZ1bmMobWVtbyksIHJhdyk7XG4gICAgfSBhcyBSO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGlwZSgpOiA8Uj4oYTogUikgPT4gUjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBpcGU8RiBleHRlbmRzIEZ1bmN0aW9uPihmOiBGKTogRjtcblxuLy8gb25lIGZ1bmN0aW9uXG5leHBvcnQgZnVuY3Rpb24gcGlwZTxGMSBleHRlbmRzIEZ1bmNOPGFueSwgYW55Pj4oXG4gICAgZjE6IEYxLFxuKTogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8RjE+KSA9PiBSZXR1cm5UeXBlPEYxPjtcblxuLy8gdHdvIGZ1bmN0aW9uXG5leHBvcnQgZnVuY3Rpb24gcGlwZTxcbiAgICBGMSBleHRlbmRzIEZ1bmNOPGFueSwgYW55PixcbiAgICBGMiBleHRlbmRzIEZ1bmM8UmV0dXJuVHlwZTxGMT4sIGFueT5cbiAgICA+KGYxOiBGMSwgZjI6IEYyKTogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8RjE+KSA9PiBSZXR1cm5UeXBlPEYyPjtcblxuLy8gdGhyZWUgZnVuY3Rpb25cbmV4cG9ydCBmdW5jdGlvbiBwaXBlPFxuICAgIEYxIGV4dGVuZHMgRnVuY048YW55LCBhbnk+LFxuICAgIEYyIGV4dGVuZHMgRnVuYzxSZXR1cm5UeXBlPEYxPiwgYW55PixcbiAgICBGMyBleHRlbmRzIEZ1bmM8UmV0dXJuVHlwZTxGMj4sIGFueT5cbiAgICA+KGYxOiBGMSwgZjI6IEYyLCBmMzogRjMpOiAoLi4uYXJnczogUGFyYW1ldGVyczxGMT4pID0+IFJldHVyblR5cGU8RjM+O1xuLy8gSWYgbmVlZGVkIGFkZCBtb3JlIHRoYW4gMyBmdW5jdGlvblxuLy8gR2VuZXJpY1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGU8XG4gICAgRjEgZXh0ZW5kcyBGdW5jTjxhbnksIGFueT4sXG4gICAgRjIgZXh0ZW5kcyBGdW5jPFJldHVyblR5cGU8RjE+LCBhbnk+LFxuICAgIEYzIGV4dGVuZHMgRnVuYzxSZXR1cm5UeXBlPEYyPiwgYW55PixcbiAgICBGTiBleHRlbmRzIEFycmF5PEZ1bmM8YW55LCBhbnk+PlxuICAgID4oZjE6IEYxLCBmMjogRjIsIGYzOiBGMywgLi4uZm46IEZOKTogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8RjE+KSA9PiBhbnk7XG5cbi8vIHJlc3RcbmV4cG9ydCBmdW5jdGlvbiBwaXBlKC4uLmZuczogRnVuY3Rpb25bXSkge1xuICAgIGlmIChmbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoYTogYW55KSA9PiBhO1xuICAgIH1cblxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmbnNbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZucy5yZWR1Y2UoKHByZXZGbiwgbmV4dEZuKSA9PiAoLi4uYXJnczogYW55W10pID0+XG4gICAgICAgIG5leHRGbihwcmV2Rm4oLi4uYXJncykpLFxuICAgICk7XG59XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpc2VOZXN0ZWRMYXlvdXQgPSAoc3RhdGU6IEVkaXRvclN0YXRlLCBub2RlOiBOb2RlKSA9PiB7XG4gICAgaWYgKHN0YXRlLnNlbGVjdGlvbi4kZnJvbS5kZXB0aCA+IDEpIHtcbiAgICAgICAgaWYgKG5vZGUuYXR0cnMubGF5b3V0ICYmIG5vZGUuYXR0cnMubGF5b3V0ICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUudHlwZS5jcmVhdGVDaGVja2VkKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLi4ubm9kZS5hdHRycyxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5vZGUuY29udGVudCxcbiAgICAgICAgICAgICAgICBub2RlLm1hcmtzLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGl0cyBhIGJyZWFrb3V0IGxheW91dCwgd2UgY2FuIHJlbW92ZSB0aGUgbWFya1xuICAgICAgICAvLyBTaW5jZSBkZWZhdWx0IGlzblwidCBhIHZhbGlkIGJyZWFrb3V0IG1vZGUuXG4gICAgICAgIGNvbnN0IGJyZWFrb3V0TWFyazogTWFyayA9IHN0YXRlLnNjaGVtYS5tYXJrcy5icmVha291dDtcbiAgICAgICAgaWYgKGJyZWFrb3V0TWFyayAmJiBicmVha291dE1hcmsuaXNJblNldChub2RlLm1hcmtzKSkge1xuICAgICAgICAgICAgY29uc3QgbmV3TWFya3MgPSBicmVha291dE1hcmsucmVtb3ZlRnJvbVNldChub2RlLm1hcmtzKTtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnR5cGUuY3JlYXRlQ2hlY2tlZChub2RlLmF0dHJzLCBub2RlLmNvbnRlbnQsIG5ld01hcmtzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xufTtcbiJdfQ==