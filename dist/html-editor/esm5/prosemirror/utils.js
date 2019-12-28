import { __assign, __read, __spread } from "tslib";
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
    var allFuncs = __spread([func], funcs);
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
        return nextFn(prevFn.apply(void 0, __spread(args)));
    }; });
}
export var normaliseNestedLayout = function (state, node) {
    if (state.selection.$from.depth > 1) {
        if (node.attrs.layout && node.attrs.layout !== "default") {
            return node.type.createChecked(__assign(__assign({}, node.attrs), { layout: "default" }), node.content, node.marks);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbInByb3NlbWlycm9yL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFDSCxRQUFRLEVBTVIsS0FBSyxHQUlSLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUVILGFBQWEsRUFFYixhQUFhLEdBRWhCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsT0FBTyxFQUNILGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLGVBQWUsRUFDZixZQUFZLEVBQ1osc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUN6QixtQkFBbUIsR0FDdEIsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixNQUFNLENBQUMsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDO0FBRXZDLFNBQVMsWUFBWSxDQUFDLEtBQVc7SUFDN0IsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsNEJBQTRCLENBQ2pDLFFBQWtCLEVBQ2xCLElBQVk7SUFFWixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FDNUIsUUFBa0Is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RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSx1QkFFbkIsSUFBSSxDQUFDLEtBQUssS0FDYixNQUFNLEVBQUUsU0FBUyxLQUVyQixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxLQUFLLENBQ2IsQ0FBQztTQUNMO1FBRUQsbURBQW1EO1FBQ25ELDZDQUE2QztRQUM3QyxJQUFNLFlBQVksR0FBUyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDdkQsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEQsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdEU7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRvZ2dsZU1hcmsgfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7R2FwQ3Vyc29yfSBmcm9tIFwicHJvc2VtaXJyb3ItZ2FwY3Vyc29yXCI7XG5pbXBvcnQge1xuICAgIEZyYWdtZW50LFxuICAgIE1hcmsgYXMgUE1NYXJrLFxuICAgIE1hcmtUeXBlLFxuICAgIE5vZGUsXG4gICAgTm9kZVR5cGUsXG4gICAgUmVzb2x2ZWRQb3MsXG4gICAgU2xpY2UsXG4gICAgU2NoZW1hLFxuICAgIE5vZGVSYW5nZSxcbiAgICBNYXJrLFxufSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcbmltcG9ydCB7IEVkaXRvclZpZXcgfSBmcm9tIFwicHJvc2VtaXJyb3Itdmlld1wiO1xuaW1wb3J0IHtcbiAgICBFZGl0b3JTdGF0ZSxcbiAgICBOb2RlU2VsZWN0aW9uLFxuICAgIFNlbGVjdGlvbixcbiAgICBUZXh0U2VsZWN0aW9uLFxuICAgIFRyYW5zYWN0aW9uLFxufSBmcm9tIFwicHJvc2VtaXJyb3Itc3RhdGVcIjtcbmltcG9ydCB7IGxpZnRUYXJnZXQsIGZpbmRXcmFwcGluZyB9IGZyb20gXCJwcm9zZW1pcnJvci10cmFuc2Zvcm1cIjtcbmltcG9ydCB7IGhhc1BhcmVudE5vZGVPZlR5cGUgfSBmcm9tIFwicHJvc2VtaXJyb3ItdXRpbHNcIjtcbmltcG9ydCB7IGlzTm9kZUVtcHR5IH0gZnJvbSBcIi4vZG9jdW1lbnQtdXRpbHNcIjtcblxuZXhwb3J0IHtcbiAgICBpc0VtcHR5UGFyYWdyYXBoLFxuICAgIGhhc1Zpc2libGVDb250ZW50LFxuICAgIGlzTm9kZUVtcHR5LFxuICAgIGlzRW1wdHlEb2N1bWVudCxcbiAgICBnZXRTdGVwUmFuZ2UsXG4gICAgZmluZEZhcnRoZXN0UGFyZW50Tm9kZSxcbiAgICBpc1NlbGVjdGlvbkVuZE9mUGFyYWdyYXBoLFxuICAgIG5vZGVzQmV0d2VlbkNoYW5nZWQsXG59IGZyb20gXCIuL2RvY3VtZW50LXV0aWxzXCI7XG5cblxuZXhwb3J0IGNvbnN0IFplcm9XaWR0aFNwYWNlID0gXCJcXHUyMDBiXCI7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTm9kZShfbm9kZTogTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNNYXJrVHlwZUNvbXBhdGlibGVXaXRoTWFyayhcbiAgICBtYXJrVHlwZTogTWFya1R5cGUsXG4gICAgbWFyazogUE1NYXJrLFxuKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFtYXJrLnR5cGUuZXhjbHVkZXMobWFya1R5cGUpICYmICFtYXJrVHlwZS5leGNsdWRlcyhtYXJrLnR5cGUpO1xufVxuXG5mdW5jdGlvbiBpc01hcmtUeXBlQWxsb3dlZEluTm9kZShcbiAgICBtYXJrVHlwZTogTWFya1R5cGUsXG4gICAgc3RhdGU6IEVkaXRvclN0YXRlLFxuKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRvZ2dsZU1hcmsobWFya1R5cGUpKHN0YXRlKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VzdChcbiAgICBub2RlOiBIVE1MRWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgczogc3RyaW5nLFxuKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICBsZXQgZWwgPSBub2RlIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8ICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoZWwpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGVzID0gZWwubWF0Y2hlcyA/IFwibWF0Y2hlc1wiIDogXCJtc01hdGNoZXNTZWxlY3RvclwiO1xuXG4gICAgZG8ge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChlbFttYXRjaGVzXSAmJiBlbFttYXRjaGVzXShzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIGVsID0gKGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgfSB3aGlsZSAoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEpO1xuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgY29uc3QgaXNJbWFnZSA9IChmaWxlVHlwZT86IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICEhZmlsZVR5cGUgJiZcbiAgICAgICAgKGZpbGVUeXBlLmluZGV4T2YoXCJpbWFnZS9cIikgPiAtMSB8fCBmaWxlVHlwZS5pbmRleE9mKFwidmlkZW8vXCIpID4gLTEpXG4gICAgKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5Nb3ZlVXAoc3RhdGU6IEVkaXRvclN0YXRlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBzZWxlY3Rpb24sIGRvYyB9ID0gc3RhdGU7XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZVwicyBhIG1lZGlhIGVsZW1lbnQgb24gdGhlIHNlbGVjdGlvbixcbiAgICAgKiBhZGQgdGV4dCBibG9ja3Mgd2l0aCBhcnJvdyBuYXZpZ2F0aW9uLlxuICAgICAqIEFsc28sIHRoZSBzZWxlY3Rpb24gY291bGQgYmUgbWVkaWEgfCBtZWRpYUdyb3VwLlxuICAgICAqL1xuICAgIGlmIChzZWxlY3Rpb24gaW5zdGFuY2VvZiBOb2RlU2VsZWN0aW9uKSB7XG4gICAgICAgIGlmIChzZWxlY3Rpb24ubm9kZS50eXBlLm5hbWUgPT09IFwibWVkaWFcIikge1xuICAgICAgICAgICAgLyoqIFdlaXJkIHdheSBvZiBjaGVja2luZyBpZiB0aGUgcHJldmlvdXMgZWxlbWVudCBpcyBhIHBhcmFncmFwaCAqL1xuICAgICAgICAgICAgY29uc3QgbWVkaWFBbmNlc3Rvck5vZGUgPSBkb2Mubm9kZUF0KHNlbGVjdGlvbi5hbmNob3IgLSAzKTtcbiAgICAgICAgICAgIHJldHVybiAhIShcbiAgICAgICAgICAgICAgICBtZWRpYUFuY2VzdG9yTm9kZSAmJiBtZWRpYUFuY2VzdG9yTm9kZS50eXBlLm5hbWUgPT09IFwicGFyYWdyYXBoXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uLm5vZGUudHlwZS5uYW1lID09PSBcIm1lZGlhR3JvdXBcIikge1xuICAgICAgICAgICAgY29uc3QgbWVkaWFHcm91cEFuY2VzdG9yTm9kZSA9IHNlbGVjdGlvbi4kYW5jaG9yLm5vZGVCZWZvcmU7XG4gICAgICAgICAgICByZXR1cm4gISEoXG4gICAgICAgICAgICAgICAgbWVkaWFHcm91cEFuY2VzdG9yTm9kZSAmJlxuICAgICAgICAgICAgICAgIG1lZGlhR3JvdXBBbmNlc3Rvck5vZGUudHlwZS5uYW1lID09PSBcInBhcmFncmFwaFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRleHRTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKCFzZWxlY3Rpb24uZW1wdHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICFhdFRoZUJlZ2lubmluZ09mRG9jKHN0YXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbk1vdmVEb3duKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW9uLCBkb2MgfSA9IHN0YXRlO1xuXG4gICAgLyoqXG4gICAgICogSWYgdGhlcmVcInMgYSBtZWRpYSBlbGVtZW50IG9uIHRoZSBzZWxlY3Rpb24sXG4gICAgICogYWRkIHRleHQgYmxvY2tzIHdpdGggYXJyb3cgbmF2aWdhdGlvbi5cbiAgICAgKiBBbHNvLCB0aGUgc2VsZWN0aW9uIGNvdWxkIGJlIG1lZGlhIHwgbWVkaWFHcm91cC5cbiAgICAgKi9cbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbikge1xuICAgICAgICBpZiAoc2VsZWN0aW9uLm5vZGUudHlwZS5uYW1lID09PSBcIm1lZGlhXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVBZnRlciA9IGRvYy5ub2RlQXQoc2VsZWN0aW9uLiRoZWFkLmFmdGVyKCkpO1xuICAgICAgICAgICAgcmV0dXJuICEhKG5vZGVBZnRlciAmJiBub2RlQWZ0ZXIudHlwZS5uYW1lID09PSBcInBhcmFncmFwaFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rpb24ubm9kZS50eXBlLm5hbWUgPT09IFwibWVkaWFHcm91cFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gIShcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uJGhlYWQucGFyZW50T2Zmc2V0ID09PSBzZWxlY3Rpb24uJGFuY2hvci5wYXJlbnQuY29udGVudC5zaXplXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSB7XG4gICAgICAgIGlmICghc2VsZWN0aW9uLmVtcHR5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAhYXRUaGVFbmRPZkRvYyhzdGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NlbGVjdGlvbkluc2lkZUxhc3ROb2RlSW5Eb2N1bWVudChcbiAgICBzZWxlY3Rpb246IFNlbGVjdGlvbixcbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRvY05vZGUgPSBzZWxlY3Rpb24uJGFuY2hvci5ub2RlKDApO1xuICAgIGNvbnN0IHJvb3ROb2RlID0gc2VsZWN0aW9uLiRhbmNob3Iubm9kZSgxKTtcblxuICAgIHJldHVybiBkb2NOb2RlLmxhc3RDaGlsZCA9PT0gcm9vdE5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdFRoZUVuZE9mRG9jKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW9uLCBkb2MgfSA9IHN0YXRlO1xuICAgIHJldHVybiBkb2Mubm9kZVNpemUgLSBzZWxlY3Rpb24uJHRvLnBvcyAtIDIgPT09IHNlbGVjdGlvbi4kdG8uZGVwdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdFRoZUJlZ2lubmluZ09mRG9jKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW9uIH0gPSBzdGF0ZTtcbiAgICByZXR1cm4gc2VsZWN0aW9uLiRmcm9tLnBvcyA9PT0gc2VsZWN0aW9uLiRmcm9tLmRlcHRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXRUaGVFbmRPZkJsb2NrKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgc2VsZWN0aW9uIH0gPSBzdGF0ZTtcbiAgICBjb25zdCB7ICR0byB9ID0gc2VsZWN0aW9uO1xuICAgIGlmIChzZWxlY3Rpb24gaW5zdGFuY2VvZiBHYXBDdXJzb3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbiAmJiBzZWxlY3Rpb24ubm9kZS5pc0Jsb2NrKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZW5kUG9zaXRpb25PZlBhcmVudCgkdG8pID09PSAkdG8ucG9zICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF0VGhlQmVnaW5uaW5nT2ZCbG9jayhzdGF0ZTogRWRpdG9yU3RhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IHNlbGVjdGlvbiB9ID0gc3RhdGU7XG4gICAgY29uc3QgeyAkZnJvbSB9ID0gc2VsZWN0aW9uO1xuICAgIGlmIChzZWxlY3Rpb24gaW5zdGFuY2VvZiBHYXBDdXJzb3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2VsZWN0aW9uIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbiAmJiBzZWxlY3Rpb24ubm9kZS5pc0Jsb2NrKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnRQb3NpdGlvbk9mUGFyZW50KCRmcm9tKSA9PT0gJGZyb20ucG9zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQb3NpdGlvbk9mUGFyZW50KHJlc29sdmVkUG9zOiBSZXNvbHZlZFBvcyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHJlc29sdmVkUG9zLnN0YXJ0KHJlc29sdmVkUG9zLmRlcHRoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZFBvc2l0aW9uT2ZQYXJlbnQocmVzb2x2ZWRQb3M6IFJlc29sdmVkUG9zKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcmVzb2x2ZWRQb3MuZW5kKHJlc29sdmVkUG9zLmRlcHRoKSArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJzb3Ioc2VsZWN0aW9uOiBTZWxlY3Rpb24pOiBSZXNvbHZlZFBvcyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIChzZWxlY3Rpb24gYXMgVGV4dFNlbGVjdGlvbikuJGN1cnNvciB8fCB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBtYXJrIGlzIGFsbG93ZWQgYXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIC8gY3Vyc29yIGJhc2VkIG9uIGEgZ2l2ZW4gc3RhdGUuXG4gKiBUaGlzIG1ldGhvZCBsb29rcyBhdCBib3RoIHRoZSBjdXJyZW50bHkgYWN0aXZlIG1hcmtzIG9uIHRoZSB0cmFuc2FjdGlvbiwgYXMgd2VsbCBhc1xuICogdGhlIG5vZGUgYW5kIG1hcmtzIGF0IHRoZSBjdXJyZW50IHNlbGVjdGlvbiB0byBkZXRlcm1pbmUgaWYgdGhlIGdpdmVuIG1hcmsgdHlwZSBpc1xuICogYWxsb3dlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTWFya1R5cGVBbGxvd2VkSW5DdXJyZW50U2VsZWN0aW9uKFxuICAgIG1hcmtUeXBlOiBNYXJrVHlwZSxcbiAgICBzdGF0ZTogRWRpdG9yU3RhdGUsXG4pIHtcblxuICAgIGlmICghaXNNYXJrVHlwZUFsbG93ZWRJbk5vZGUobWFya1R5cGUsIHN0YXRlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeyBlbXB0eSwgJGN1cnNvciwgcmFuZ2VzIH0gPSBzdGF0ZS5zZWxlY3Rpb24gYXMgVGV4dFNlbGVjdGlvbjtcbiAgICBpZiAoZW1wdHkgJiYgISRjdXJzb3IpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ29tcGF0aWJsZU1hcmtUeXBlID0gKG1hcms6IFBNTWFyaykgPT5cbiAgICAgICAgaXNNYXJrVHlwZUNvbXBhdGlibGVXaXRoTWFyayhtYXJrVHlwZSwgbWFyayk7XG5cbiAgICAvLyBIYW5kbGUgYW55IG5ldyBtYXJrcyBpbiB0aGUgY3VycmVudCB0cmFuc2FjdGlvblxuICAgIGlmIChcbiAgICAgICAgc3RhdGUudHIuc3RvcmVkTWFya3MgJiZcbiAgICAgICAgIXN0YXRlLnRyLnN0b3JlZE1hcmtzLmV2ZXJ5KGlzQ29tcGF0aWJsZU1hcmtUeXBlKVxuICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCRjdXJzb3IpIHtcbiAgICAgICAgcmV0dXJuICRjdXJzb3IubWFya3MoKS5ldmVyeShpc0NvbXBhdGlibGVNYXJrVHlwZSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZXZlcnkgbm9kZSBpbiBhIHNlbGVjdGlvbiAtIGVuc3VyaW5nIHRoYXQgaXQgaXMgY29tcGF0aWJsZSB3aXRoIHRoZSBjdXJyZW50IG1hcmsgdHlwZVxuICAgIHJldHVybiByYW5nZXMuZXZlcnkoKHsgJGZyb20sICR0byB9KSA9PiB7XG4gICAgICAgIGxldCBhbGxvd2VkSW5BY3RpdmVNYXJrcyA9XG4gICAgICAgICAgICAkZnJvbS5kZXB0aCA9PT0gMCA/IHN0YXRlLmRvYy5tYXJrcy5ldmVyeShpc0NvbXBhdGlibGVNYXJrVHlwZSkgOiB0cnVlO1xuXG4gICAgICAgIHN0YXRlLmRvYy5ub2Rlc0JldHdlZW4oJGZyb20ucG9zLCAkdG8ucG9zLCBub2RlID0+IHtcbiAgICAgICAgICAgIGFsbG93ZWRJbkFjdGl2ZU1hcmtzID1cbiAgICAgICAgICAgICAgICBhbGxvd2VkSW5BY3RpdmVNYXJrcyAmJiBub2RlLm1hcmtzLmV2ZXJ5KGlzQ29tcGF0aWJsZU1hcmtUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFsbG93ZWRJbkFjdGl2ZU1hcmtzO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFN0ZXAgdGhyb3VnaCBibG9jay1ub2RlcyBiZXR3ZWVuICRmcm9tIGFuZCAkdG8gYW5kIHJldHVybnMgZmFsc2UgaWYgYSBub2RlIGlzXG4gKiBmb3VuZCB0aGF0IGlzblwidCBvZiB0aGUgc3BlY2lmaWVkIHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmFuZ2VPZlR5cGUoXG4gICAgZG9jOiBOb2RlLFxuICAgICRmcm9tOiBSZXNvbHZlZFBvcyxcbiAgICAkdG86IFJlc29sdmVkUG9zLFxuICAgIG5vZGVUeXBlOiBOb2RlVHlwZSxcbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIGdldEFuY2VzdG9yTm9kZXNCZXR3ZWVuKGRvYywgJGZyb20sICR0bykuZmlsdGVyKFxuICAgICAgICAgICAgbm9kZSA9PiBub2RlLnR5cGUgIT09IG5vZGVUeXBlLFxuICAgICAgICApLmxlbmd0aCA9PT0gMFxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTbGljZVdpdGhDb250ZW50KGNvbnRlbnQ6IHN0cmluZywgc3RhdGU6IEVkaXRvclN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBTbGljZShGcmFnbWVudC5mcm9tKHN0YXRlLnNjaGVtYS50ZXh0KGNvbnRlbnQpKSwgMCwgMCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBjb250ZW50IGluc2lkZSBhIHNlbGVjdGlvbiBjYW4gYmUgam9pbmVkIHdpdGggdGhlIG5leHQgYmxvY2suXG4gKiBXZSBuZWVkIHRoaXMgY2hlY2sgc2luY2UgdGhlIGJ1aWx0LWluIG1ldGhvZCBmb3IgXCJqb2luRG93blwiIHdpbGwgam9pbiBhIG9yZGVyZWRMaXN0IHdpdGggYnVsbGV0TGlzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbkpvaW5Eb3duKFxuICAgIHNlbGVjdGlvbjogU2VsZWN0aW9uLFxuICAgIGRvYzogYW55LFxuICAgIG5vZGVUeXBlOiBOb2RlVHlwZSxcbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjaGVja05vZGVEb3duKHNlbGVjdGlvbiwgZG9jLCBub2RlID0+IG5vZGUudHlwZSA9PT0gbm9kZVR5cGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tOb2RlRG93bihcbiAgICBzZWxlY3Rpb246IFNlbGVjdGlvbixcbiAgICBkb2M6IE5vZGUsXG4gICAgZmlsdGVyOiAobm9kZTogTm9kZSkgPT4gYm9vbGVhbixcbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlcyA9IGRvYy5yZXNvbHZlKFxuICAgICAgICBzZWxlY3Rpb24uJHRvLmFmdGVyKGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgc2VsZWN0aW9uLiR0bykuZGVwdGgpLFxuICAgICk7XG4gICAgcmV0dXJuIHJlcy5ub2RlQWZ0ZXIgPyBmaWx0ZXIocmVzLm5vZGVBZnRlcikgOiBmYWxzZTtcbn1cblxuZXhwb3J0IGNvbnN0IHNldE5vZGVTZWxlY3Rpb24gPSAodmlldzogRWRpdG9yVmlldywgcG9zOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB7IHN0YXRlLCBkaXNwYXRjaCB9ID0gdmlldztcblxuICAgIGlmICghaXNGaW5pdGUocG9zKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdHIgPSBzdGF0ZS50ci5zZXRTZWxlY3Rpb24oTm9kZVNlbGVjdGlvbi5jcmVhdGUoc3RhdGUuZG9jLCBwb3MpKTtcbiAgICBkaXNwYXRjaCh0cik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGV4dFNlbGVjdGlvbihcbiAgICB2aWV3OiBFZGl0b3JWaWV3LFxuICAgIGFuY2hvcjogbnVtYmVyLFxuICAgIGhlYWQ/OiBudW1iZXIsXG4pIHtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB2aWV3O1xuICAgIGNvbnN0IHRyID0gc3RhdGUudHIuc2V0U2VsZWN0aW9uKFxuICAgICAgICBUZXh0U2VsZWN0aW9uLmNyZWF0ZShzdGF0ZS5kb2MsIGFuY2hvciwgaGVhZCksXG4gICAgKTtcbiAgICB2aWV3LmRpc3BhdGNoKHRyKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGNvbnRlbnQgaW5zaWRlIGEgc2VsZWN0aW9uIGNhbiBiZSBqb2luZWQgd2l0aCB0aGUgcHJldmlvdXMgYmxvY2suXG4gKiBXZSBuZWVkIHRoaXMgY2hlY2sgc2luY2UgdGhlIGJ1aWx0LWluIG1ldGhvZCBmb3IgXCJqb2luVXBcIiB3aWxsIGpvaW4gYSBvcmRlcmVkTGlzdCB3aXRoIGJ1bGxldExpc3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Kb2luVXAoXG4gICAgc2VsZWN0aW9uOiBTZWxlY3Rpb24sXG4gICAgZG9jOiBhbnksXG4gICAgbm9kZVR5cGU6IE5vZGVUeXBlLFxuKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVzID0gZG9jLnJlc29sdmUoXG4gICAgICAgIHNlbGVjdGlvbi4kZnJvbS5iZWZvcmUoZmluZEFuY2VzdG9yUG9zaXRpb24oZG9jLCBzZWxlY3Rpb24uJGZyb20pLmRlcHRoKSxcbiAgICApO1xuICAgIHJldHVybiByZXMubm9kZUJlZm9yZSAmJiByZXMubm9kZUJlZm9yZS50eXBlID09PSBub2RlVHlwZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFsbCB0b3AtbGV2ZWwgYW5jZXN0b3Itbm9kZXMgYmV0d2VlbiAkZnJvbSBhbmQgJHRvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNlc3Rvck5vZGVzQmV0d2VlbihcbiAgICBkb2M6IE5vZGUsXG4gICAgJGZyb206IFJlc29sdmVkUG9zLFxuICAgICR0bzogUmVzb2x2ZWRQb3MsXG4pOiBOb2RlW10ge1xuICAgIGNvbnN0IG5vZGVzID0gQXJyYXk8Tm9kZT4oKTtcbiAgICBjb25zdCBtYXhEZXB0aCA9IGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgJGZyb20pLmRlcHRoO1xuICAgIGxldCBjdXJyZW50ID0gZG9jLnJlc29sdmUoJGZyb20uc3RhcnQobWF4RGVwdGgpKTtcblxuICAgIHdoaWxlIChjdXJyZW50LnBvcyA8PSAkdG8uc3RhcnQoJHRvLmRlcHRoKSkge1xuICAgICAgICBjb25zdCBkZXB0aCA9IE1hdGgubWluKGN1cnJlbnQuZGVwdGgsIG1heERlcHRoKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGN1cnJlbnQubm9kZShkZXB0aCk7XG5cbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVwdGggPT09IDApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5leHQ6IFJlc29sdmVkUG9zID0gZG9jLnJlc29sdmUoY3VycmVudC5hZnRlcihkZXB0aCkpO1xuICAgICAgICBpZiAobmV4dC5zdGFydChkZXB0aCkgPj0gZG9jLm5vZGVTaXplIC0gMikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dC5kZXB0aCAhPT0gY3VycmVudC5kZXB0aCkge1xuICAgICAgICAgICAgbmV4dCA9IGRvYy5yZXNvbHZlKG5leHQucG9zICsgMik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dC5kZXB0aCkge1xuICAgICAgICAgICAgY3VycmVudCA9IGRvYy5yZXNvbHZlKG5leHQuc3RhcnQobmV4dC5kZXB0aCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudCA9IGRvYy5yZXNvbHZlKG5leHQuZW5kKG5leHQuZGVwdGgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2Rlcztcbn1cblxuLyoqXG4gKiBGaW5kcyBhbGwgXCJzZWxlY3Rpb24tZ3JvdXBzXCIgd2l0aGluIGEgcmFuZ2UuIEEgc2VsZWN0aW9uIGdyb3VwIGlzIGJhc2VkIG9uIGFuY2VzdG9ycy5cbiAqXG4gKiBFeGFtcGxlOlxuICogR2l2ZW4gdGhlIGZvbGxvd2luZyBkb2N1bWVudCBhbmQgc2VsZWN0aW9uICh7PH0gPSBzdGFydCBvZiBzZWxlY3Rpb24gYW5kIHs+fSA9IGVuZClcbiAqICBkb2NcbiAqICAgIGJsb2NrcXVvdGVcbiAqICAgICAgdWxcbiAqICAgICAgICBsaVxuICogICAgICAgIGxpezx9XG4gKiAgICAgICAgbGlcbiAqICAgICBwXG4gKiAgICAgcHs+fVxuICpcbiAqIFRoZSBvdXRwdXQgd2lsbCBiZSB0d28gc2VsZWN0aW9uLWdyb3Vwcy4gT25lIHdpdGhpbiB0aGUgdWwgYW5kIG9uZSB3aXRoIHRoZSB0d28gcGFyYWdyYXBocy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdyb3Vwc0luUmFuZ2UoXG4gICAgZG9jOiBOb2RlLFxuICAgICRmcm9tOiBSZXNvbHZlZFBvcyxcbiAgICAkdG86IFJlc29sdmVkUG9zLFxuICAgIGlzTm9kZVZhbGlkOiAobm9kZTogTm9kZSkgPT4gYm9vbGVhbiA9IHZhbGlkYXRlTm9kZSxcbik6IEFycmF5PHsgJGZyb206IFJlc29sdmVkUG9zOyAkdG86IFJlc29sdmVkUG9zIH0+IHtcbiAgICBjb25zdCBncm91cHMgPSBBcnJheTx7ICRmcm9tOiBSZXNvbHZlZFBvczsgJHRvOiBSZXNvbHZlZFBvcyB9PigpO1xuICAgIGNvbnN0IGNvbW1vbkFuY2VzdG9yID0gaGFzQ29tbW9uQW5jZXN0b3IoZG9jLCAkZnJvbSwgJHRvKTtcbiAgICBjb25zdCBmcm9tQW5jZXN0b3IgPSBmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsICRmcm9tKTtcblxuICAgIGlmIChcbiAgICAgICAgY29tbW9uQW5jZXN0b3IgfHxcbiAgICAgICAgKGZyb21BbmNlc3Rvci5kZXB0aCA9PT0gMSAmJiBpc05vZGVWYWxpZCgkZnJvbS5ub2RlKDEpKSlcbiAgICApIHtcbiAgICAgICAgZ3JvdXBzLnB1c2goeyAkZnJvbSwgJHRvIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gJGZyb207XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnQucG9zIDwgJHRvLnBvcykge1xuICAgICAgICAgICAgbGV0IGFuY2VzdG9yUG9zID0gZmluZEFuY2VzdG9yUG9zaXRpb24oZG9jLCBjdXJyZW50KTtcbiAgICAgICAgICAgIHdoaWxlIChhbmNlc3RvclBvcy5kZXB0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBhbmNlc3RvclBvcyA9IGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgYW5jZXN0b3JQb3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbmRQb3MgPSBkb2MucmVzb2x2ZShcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIG5vdCBiZSBzbWFsbGVyIHRoZW4gc3RhcnQgcG9zaXRpb24gaW4gY2FzZSBvZiBhbiBlbXB0eSBwYXJhZ3JhcGggZm9yIGV4YW1wbGUuXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jZXN0b3JQb3Muc3RhcnQoYW5jZXN0b3JQb3MuZGVwdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jZXN0b3JQb3MuZW5kKGFuY2VzdG9yUG9zLmRlcHRoKSAtIDMsXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICR0by5wb3MsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAkZnJvbTogY3VycmVudCxcbiAgICAgICAgICAgICAgICAkdG86IGVuZFBvcyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjdXJyZW50ID0gZG9jLnJlc29sdmUoTWF0aC5taW4oZW5kUG9zLmFmdGVyKDEpICsgMSwgZG9jLm5vZGVTaXplIC0gMikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3Vwcztcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZSB0aGUgZG9jdW1lbnQgdW50aWwgYW4gXCJhbmNlc3RvclwiIGlzIGZvdW5kLiBBbnkgbmVzdGFibGUgYmxvY2sgY2FuIGJlIGFuIGFuY2VzdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEFuY2VzdG9yUG9zaXRpb24oZG9jOiBOb2RlLCBwb3M6IGFueSk6IGFueSB7XG4gICAgY29uc3QgbmVzdGFibGVCbG9ja3MgPSBbXCJibG9ja3F1b3RlXCIsIFwiYnVsbGV0TGlzdFwiLCBcIm9yZGVyZWRMaXN0XCJdO1xuXG4gICAgaWYgKHBvcy5kZXB0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIGxldCBub2RlOiBOb2RlIHwgdW5kZWZpbmVkID0gcG9zLm5vZGUocG9zLmRlcHRoKTtcbiAgICBsZXQgbmV3UG9zID0gcG9zO1xuICAgIHdoaWxlIChwb3MuZGVwdGggPj0gMSkge1xuICAgICAgICBwb3MgPSBkb2MucmVzb2x2ZShwb3MuYmVmb3JlKHBvcy5kZXB0aCkpO1xuICAgICAgICBub2RlID0gcG9zLm5vZGUocG9zLmRlcHRoKTtcblxuICAgICAgICBpZiAobm9kZSAmJiBuZXN0YWJsZUJsb2Nrcy5pbmRleE9mKG5vZGUudHlwZS5uYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG5ld1BvcyA9IHBvcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdQb3M7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHR3byBwb3NpdGlvbnMgaGF2ZSBhIGNvbW1vbiBhbmNlc3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbW1vbkFuY2VzdG9yKFxuICAgIGRvYzogTm9kZSxcbiAgICAkZnJvbTogUmVzb2x2ZWRQb3MsXG4gICAgJHRvOiBSZXNvbHZlZFBvcyxcbik6IGJvb2xlYW4ge1xuICAgIGxldCBjdXJyZW50O1xuICAgIGxldCB0YXJnZXQ7XG5cbiAgICBpZiAoJGZyb20uZGVwdGggPiAkdG8uZGVwdGgpIHtcbiAgICAgICAgY3VycmVudCA9IGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgJGZyb20pO1xuICAgICAgICB0YXJnZXQgPSBmaW5kQW5jZXN0b3JQb3NpdGlvbihkb2MsICR0byk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudCA9IGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgJHRvKTtcbiAgICAgICAgdGFyZ2V0ID0gZmluZEFuY2VzdG9yUG9zaXRpb24oZG9jLCAkZnJvbSk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGN1cnJlbnQuZGVwdGggPiB0YXJnZXQuZGVwdGggJiYgY3VycmVudC5kZXB0aCA+IDEpIHtcbiAgICAgICAgY3VycmVudCA9IGZpbmRBbmNlc3RvclBvc2l0aW9uKGRvYywgY3VycmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQubm9kZShjdXJyZW50LmRlcHRoKSA9PT0gdGFyZ2V0Lm5vZGUodGFyZ2V0LmRlcHRoKTtcbn1cblxuLyoqXG4gKiBUYWtlcyBhIHNlbGVjdGlvbiAkZnJvbSBhbmQgJHRvIGFuZCBsaWZ0IGFsbCB0ZXh0IG5vZGVzIGZyb20gdGhlaXIgcGFyZW50cyB0byBkb2N1bWVudC1sZXZlbFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGlmdFNlbGVjdGlvbihcbiAgICB0cjogVHJhbnNhY3Rpb24sXG4gICAgZG9jOiBOb2RlLFxuICAgICRmcm9tOiBSZXNvbHZlZFBvcyxcbiAgICAkdG86IFJlc29sdmVkUG9zLFxuKSB7XG4gICAgbGV0IHN0YXJ0UG9zID0gJGZyb20uc3RhcnQoJGZyb20uZGVwdGgpO1xuICAgIGxldCBlbmRQb3MgPSAkdG8uZW5kKCR0by5kZXB0aCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gTWF0aC5tYXgoMCwgZmluZEFuY2VzdG9yUG9zaXRpb24oZG9jLCAkZnJvbSkuZGVwdGggLSAxKTtcblxuICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oc3RhcnRQb3MsIGVuZFBvcywgKG5vZGUsIHBvcykgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBub2RlLmlzVGV4dCB8fCAvLyBUZXh0IG5vZGVcbiAgICAgICAgICAgIChub2RlLmlzVGV4dGJsb2NrICYmICFub2RlLnRleHRDb250ZW50KSAvLyBFbXB0eSBwYXJhZ3JhcGhcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSB0ci5kb2MucmVzb2x2ZSh0ci5tYXBwaW5nLm1hcChwb3MpKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbCA9IG5ldyBOb2RlU2VsZWN0aW9uKHJlcyk7XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IHNlbC4kZnJvbS5ibG9ja1JhbmdlKHNlbC4kdG8pO1xuXG4gICAgICAgICAgICBpZiAobGlmdFRhcmdldChyYW5nZSBhcyBOb2RlUmFuZ2UpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0ci5saWZ0KHJhbmdlLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFydFBvcyA9IHRyLm1hcHBpbmcubWFwKHN0YXJ0UG9zKTtcbiAgICBlbmRQb3MgPSB0ci5tYXBwaW5nLm1hcChlbmRQb3MpO1xuICAgIGVuZFBvcyA9IHRyLmRvYy5yZXNvbHZlKGVuZFBvcykuZW5kKHRyLmRvYy5yZXNvbHZlKGVuZFBvcykuZGVwdGgpOyAvLyBXZSB3YW50IHRvIHNlbGVjdCB0aGUgZW50aXJlIG5vZGVcblxuICAgIHRyLnNldFNlbGVjdGlvbihcbiAgICAgICAgbmV3IFRleHRTZWxlY3Rpb24odHIuZG9jLnJlc29sdmUoc3RhcnRQb3MpLCB0ci5kb2MucmVzb2x2ZShlbmRQb3MpKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHI6IHRyLFxuICAgICAgICAkZnJvbTogdHIuZG9jLnJlc29sdmUoc3RhcnRQb3MpLFxuICAgICAgICAkdG86IHRyLmRvYy5yZXNvbHZlKGVuZFBvcyksXG4gICAgfTtcbn1cblxuLyoqXG4gKiBMaWZ0IG5vZGVzIGluIGJsb2NrIHRvIG9uZSBsZXZlbCBhYm92ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZnRTaWJsaW5nTm9kZXModmlldzogRWRpdG9yVmlldykge1xuICAgIGNvbnN0IHsgdHIgfSA9IHZpZXcuc3RhdGU7XG4gICAgY29uc3QgeyAkZnJvbSwgJHRvIH0gPSB2aWV3LnN0YXRlLnNlbGVjdGlvbjtcbiAgICBjb25zdCBibG9ja1N0YXJ0ID0gdHIuZG9jLnJlc29sdmUoJGZyb20uc3RhcnQoJGZyb20uZGVwdGggLSAxKSk7XG4gICAgY29uc3QgYmxvY2tFbmQgPSB0ci5kb2MucmVzb2x2ZSgkdG8uZW5kKCR0by5kZXB0aCAtIDEpKTtcbiAgICBjb25zdCByYW5nZSA9IGJsb2NrU3RhcnQuYmxvY2tSYW5nZShibG9ja0VuZCk7XG4gICAgdmlldy5kaXNwYXRjaCh0ci5saWZ0KHJhbmdlIGFzIE5vZGVSYW5nZSwgYmxvY2tTdGFydC5kZXB0aCAtIDEpKTtcbn1cblxuLyoqXG4gKiBMaWZ0IHNpYmxpbmcgbm9kZXMgdG8gZG9jdW1lbnQtbGV2ZWwgYW5kIHNlbGVjdCB0aGVtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGlmdEFuZFNlbGVjdFNpYmxpbmdOb2Rlcyh2aWV3OiBFZGl0b3JWaWV3KTogVHJhbnNhY3Rpb24ge1xuICAgIGNvbnN0IHsgdHIgfSA9IHZpZXcuc3RhdGU7XG4gICAgY29uc3QgeyAkZnJvbSwgJHRvIH0gPSB2aWV3LnN0YXRlLnNlbGVjdGlvbjtcbiAgICBjb25zdCBibG9ja1N0YXJ0ID0gdHIuZG9jLnJlc29sdmUoJGZyb20uc3RhcnQoJGZyb20uZGVwdGggLSAxKSk7XG4gICAgY29uc3QgYmxvY2tFbmQgPSB0ci5kb2MucmVzb2x2ZSgkdG8uZW5kKCR0by5kZXB0aCAtIDEpKTtcbiAgICAvLyBUT0RPOiBbdHMzMF0gaGFuZGxlIHZvaWQgYW5kIG51bGwgcHJvcGVybHlcbiAgICBjb25zdCByYW5nZSA9IGJsb2NrU3RhcnQuYmxvY2tSYW5nZShibG9ja0VuZCkgYXMgTm9kZVJhbmdlO1xuICAgIHRyLnNldFNlbGVjdGlvbihuZXcgVGV4dFNlbGVjdGlvbihibG9ja1N0YXJ0LCBibG9ja0VuZCkpO1xuICAgIHRyLmxpZnQocmFuZ2UgYXMgTm9kZVJhbmdlLCBibG9ja1N0YXJ0LmRlcHRoIC0gMSk7XG4gICAgcmV0dXJuIHRyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcEluKFxuICAgIG5vZGVUeXBlOiBOb2RlVHlwZSxcbiAgICB0cjogVHJhbnNhY3Rpb24sXG4gICAgJGZyb206IFJlc29sdmVkUG9zLFxuICAgICR0bzogUmVzb2x2ZWRQb3MsXG4pOiBUcmFuc2FjdGlvbiB7XG4gICAgY29uc3QgcmFuZ2UgPSAkZnJvbS5ibG9ja1JhbmdlKCR0bykgYXMgYW55O1xuICAgIGNvbnN0IHdyYXBwaW5nID0gcmFuZ2UgJiYgKGZpbmRXcmFwcGluZyhyYW5nZSwgbm9kZVR5cGUpIGFzIGFueSk7XG4gICAgaWYgKHdyYXBwaW5nKSB7XG4gICAgICAgIHRyID0gdHIud3JhcChyYW5nZSwgd3JhcHBpbmcpLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfVxuICAgIHJldHVybiB0cjtcbn1cblxuLyoqXG4gKiBSZXBlYXRpbmcgc3RyaW5nIGZvciBtdWx0aXBsZSB0aW1lc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwZWF0KHRleHQ6IHN0cmluZywgbGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgbGVuZ3RoOyB4KyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHRleHQ7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSByZXBsYWNlbWVudCBmb3IgYEFycmF5LmZyb21gIHVudGlsIGl0IGJlY29tZXMgd2lkZWx5IGltcGxlbWVudGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlGcm9tKG9iajogYW55KTogYW55W10ge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmopO1xufVxuXG4vKipcbiAqIFJlcGxhY2VtZW50IGZvciBFbGVtZW50LmNsb3Nlc3QsIHVudGlsIGl0IGJlY29tZXMgd2lkZWx5IGltcGxlbWVudGVkXG4gKiBSZXR1cm5zIHRoZSBhbmNlc3RvciBlbGVtZW50IG9mIGEgcGFydGljdWxhciB0eXBlIGlmIGV4aXN0cyBvciBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0RWxlbWVudChcbiAgICBub2RlOiBIVE1MRWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgczogc3RyaW5nLFxuKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gY2xvc2VzdChub2RlLCBzKTtcbn1cblxuLypcbiAqIEZyb20gTW9kZXJuaXpyXG4gKiBSZXR1cm5zIHRoZSBraW5kIG9mIHRyYW5zaXRpb25ldmVudCBhdmFpbGFibGUgZm9yIHRoZSBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudDxUcmFuc2l0aW9uRXZlbnROYW1lIGV4dGVuZHMgc3RyaW5nPigpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgICAgdHJhbnNpdGlvbjogXCJ0cmFuc2l0aW9uZW5kXCIsXG4gICAgICAgIE1velRyYW5zaXRpb246IFwidHJhbnNpdGlvbmVuZFwiLFxuICAgICAgICBPVHJhbnNpdGlvbjogXCJvVHJhbnNpdGlvbkVuZFwiLFxuICAgICAgICBXZWJraXRUcmFuc2l0aW9uOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIixcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCB0IGluIHRyYW5zaXRpb25zKSB7XG4gICAgICAgIGlmIChlbC5zdHlsZVt0IGFzIGtleW9mIENTU1N0eWxlRGVjbGFyYXRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFVzZSBhIGdlbmVyaWMgYXMgdGhlIHJldHVybiB0eXBlIGJlY2F1c2UgVHlwZVNjcmlwdCBkb2VzbnQga25vd1xuICAgICAgICAgICAgLy8gYWJvdXQgY3Jvc3MgYnJvd3NlciBmZWF0dXJlcywgc28gd2UgY2FzdCBoZXJlIHRvIGFsaWduIHRvIHRoZVxuICAgICAgICAgICAgLy8gc3RhbmRhcmQgRXZlbnQgc3BlYyBhbmQgcHJvcGFnYXRlIHRoZSB0eXBlIHByb3Blcmx5IHRvIHRoZSBjYWxsYmFja3NcbiAgICAgICAgICAgIC8vIG9mIGBhZGRFdmVudExpc3RlbmVyYCBhbmQgYHJlbW92ZUV2ZW50TGlzdGVuZXJgLlxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdIGFzIFRyYW5zaXRpb25FdmVudE5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm47XG59XG5cbi8qKlxuICogRnVuY3Rpb24gd2lsbCBjcmVhdGUgYSBsaXN0IG9mIHdyYXBwZXIgYmxvY2tzIHByZXNlbnQgaW4gYSBzZWxlY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGdldFNlbGVjdGVkV3JhcHBlck5vZGVzKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IE5vZGVUeXBlW10ge1xuICAgIGNvbnN0IG5vZGVzOiBBcnJheTxOb2RlVHlwZT4gPSBbXTtcbiAgICBpZiAoc3RhdGUuc2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgJGZyb20sICR0byB9ID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBibG9ja3F1b3RlLFxuICAgICAgICAgICAgcGFuZWwsXG4gICAgICAgICAgICBvcmRlcmVkTGlzdCxcbiAgICAgICAgICAgIGJ1bGxldExpc3QsXG4gICAgICAgICAgICBsaXN0SXRlbSxcbiAgICAgICAgICAgIGNvZGVCbG9jayxcbiAgICAgICAgfSA9IHN0YXRlLnNjaGVtYS5ub2RlcztcbiAgICAgICAgc3RhdGUuZG9jLm5vZGVzQmV0d2VlbigkZnJvbS5wb3MsICR0by5wb3MsIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChub2RlLmlzQmxvY2sgJiZcbiAgICAgICAgICAgICAgICAgICAgW2Jsb2NrcXVvdGUsIHBhbmVsLCBvcmRlcmVkTGlzdCwgYnVsbGV0TGlzdCwgbGlzdEl0ZW1dLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICkgPj0gMCkgfHxcbiAgICAgICAgICAgICAgICBub2RlLnR5cGUgPT09IGNvZGVCbG9ja1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChub2RlLnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHdpbGwgY2hlY2sgaWYgY2hhbmdpbmcgYmxvY2sgdHlwZXM6IFBhcmFncmFwaCwgSGVhZGluZyBpcyBlbmFibGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlQmxvY2tUeXBlc0Rpc2FibGVkKHN0YXRlOiBFZGl0b3JTdGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vZGVzVHlwZXM6IE5vZGVUeXBlW10gPSBnZXRTZWxlY3RlZFdyYXBwZXJOb2RlcyhzdGF0ZSk7XG4gICAgY29uc3QgeyBwYW5lbCB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuICAgIHJldHVybiBub2Rlc1R5cGVzLmZpbHRlcih0eXBlID0+IHR5cGUgIT09IHBhbmVsKS5sZW5ndGggPiAwO1xufVxuXG5leHBvcnQgY29uc3QgaXNUZW1wb3JhcnkgPSAoaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBpZC5pbmRleE9mKFwidGVtcG9yYXJ5OlwiKSA9PT0gMDtcbn07XG5cblxuZXhwb3J0IGNvbnN0IGlzRW1wdHlOb2RlID0gKHNjaGVtYTogU2NoZW1hKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgICBkb2MsXG4gICAgICAgIHBhcmFncmFwaCxcbiAgICAgICAgY29kZUJsb2NrLFxuICAgICAgICBibG9ja3F1b3RlLFxuICAgICAgICBwYW5lbCxcbiAgICAgICAgaGVhZGluZyxcbiAgICAgICAgbGlzdEl0ZW0sXG4gICAgICAgIGJ1bGxldExpc3QsXG4gICAgICAgIG9yZGVyZWRMaXN0LFxuICAgICAgICB0YXNrTGlzdCxcbiAgICAgICAgdGFza0l0ZW0sXG4gICAgICAgIGRlY2lzaW9uTGlzdCxcbiAgICAgICAgZGVjaXNpb25JdGVtLFxuICAgICAgICBtZWRpYSxcbiAgICAgICAgbWVkaWFHcm91cCxcbiAgICAgICAgbWVkaWFTaW5nbGUsXG4gICAgfSA9IHNjaGVtYS5ub2RlcztcbiAgICBjb25zdCBpbm5lcklzRW1wdHlOb2RlID0gKG5vZGU6IE5vZGUpOiBib29sZWFuID0+IHtcbiAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgbWVkaWE6XG4gICAgICAgICAgICBjYXNlIG1lZGlhR3JvdXA6XG4gICAgICAgICAgICBjYXNlIG1lZGlhU2luZ2xlOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgcGFyYWdyYXBoOlxuICAgICAgICAgICAgY2FzZSBjb2RlQmxvY2s6XG4gICAgICAgICAgICBjYXNlIGhlYWRpbmc6XG4gICAgICAgICAgICBjYXNlIHRhc2tJdGVtOlxuICAgICAgICAgICAgY2FzZSBkZWNpc2lvbkl0ZW06XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuY29udGVudC5zaXplID09PSAwO1xuICAgICAgICAgICAgY2FzZSBibG9ja3F1b3RlOlxuICAgICAgICAgICAgY2FzZSBwYW5lbDpcbiAgICAgICAgICAgIGNhc2UgbGlzdEl0ZW06XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250ZW50LnNpemUgPT09IDIgJiYgaW5uZXJJc0VtcHR5Tm9kZShub2RlLmNvbnRlbnQuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSBidWxsZXRMaXN0OlxuICAgICAgICAgICAgY2FzZSBvcmRlcmVkTGlzdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRlbnQuc2l6ZSA9PT0gNCAmJiBpbm5lcklzRW1wdHlOb2RlKG5vZGUuY29udGVudC5maXJzdENoaWxkKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlIHRhc2tMaXN0OlxuICAgICAgICAgICAgY2FzZSBkZWNpc2lvbkxpc3Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250ZW50LnNpemUgPT09IDIgJiYgaW5uZXJJc0VtcHR5Tm9kZShub2RlLmNvbnRlbnQuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSBkb2M6XG4gICAgICAgICAgICAgICAgbGV0IGlzRW1wdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5vZGUuY29udGVudC5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXNFbXB0eSA9IGlzRW1wdHkgJiYgaW5uZXJJc0VtcHR5Tm9kZShjaGlsZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBpc05vZGVFbXB0eShub2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGlubmVySXNFbXB0eU5vZGU7XG59O1xuXG5leHBvcnQgY29uc3QgaW5zaWRlVGFibGUgPSAoc3RhdGU6IEVkaXRvclN0YXRlKTogQm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyB0YWJsZSwgdGFibGVDZWxsIH0gPSBzdGF0ZS5zY2hlbWEubm9kZXM7XG5cbiAgICByZXR1cm4gaGFzUGFyZW50Tm9kZU9mVHlwZShbdGFibGUsIHRhYmxlQ2VsbF0pKHN0YXRlLnNlbGVjdGlvbik7XG59O1xuXG5leHBvcnQgY29uc3QgaW5zaWRlVGFibGVDZWxsID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgdGFibGVDZWxsLCB0YWJsZUhlYWRlciB9ID0gc3RhdGUuc2NoZW1hLm5vZGVzO1xuICAgIHJldHVybiBoYXNQYXJlbnROb2RlT2ZUeXBlKFt0YWJsZUNlbGwsIHRhYmxlSGVhZGVyXSkoc3RhdGUuc2VsZWN0aW9uKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0VsZW1lbnRJblRhYmxlQ2VsbCA9IChcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwsXG4pOiBIVE1MRWxlbWVudCB8IG51bGwgPT4ge1xuICAgIHJldHVybiBjbG9zZXN0KGVsZW1lbnQsIFwidGRcIikgfHwgY2xvc2VzdChlbGVtZW50LCBcInRoXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTGFzdEl0ZW1NZWRpYUdyb3VwID0gKG5vZGU6IE5vZGUpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7IGNvbnRlbnQgfSA9IG5vZGU7XG4gICAgcmV0dXJuICEhY29udGVudC5sYXN0Q2hpbGQgJiYgY29udGVudC5sYXN0Q2hpbGQudHlwZS5uYW1lID09PSBcIm1lZGlhR3JvdXBcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0luTGlzdEl0ZW0gPSAoc3RhdGU6IEVkaXRvclN0YXRlKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGhhc1BhcmVudE5vZGVPZlR5cGUoc3RhdGUuc2NoZW1hLm5vZGVzLmxpc3RJdGVtKShzdGF0ZS5zZWxlY3Rpb24pO1xufTtcblxuZXhwb3J0IGNvbnN0IGhhc09wZW5FbmQgPSAoc2xpY2U6IFNsaWNlKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHNsaWNlLm9wZW5TdGFydCA+IDAgfHwgc2xpY2Uub3BlbkVuZCA+IDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQ2hpbGRyZW5CZXR3ZWVuKFxuICAgIGRvYzogTm9kZSxcbiAgICBmcm9tOiBudW1iZXIsXG4gICAgdG86IG51bWJlcixcbiAgICBwcmVkaWNhdGU6IChub2RlOiBOb2RlLCBwb3M6IG51bWJlciwgcGFyZW50OiBOb2RlKSA9PiBib29sZWFuIHwgdW5kZWZpbmVkLFxuKSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdIGFzIHsgbm9kZTogTm9kZTsgcG9zOiBudW1iZXIgfVtdO1xuICAgIGRvYy5ub2Rlc0JldHdlZW4oZnJvbSwgdG8sIChub2RlLCBwb3MsIHBhcmVudCkgPT4ge1xuICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUsIHBvcywgcGFyZW50KSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgbm9kZSwgcG9zIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWR1cGU8VD4oXG4gICAgbGlzdDogVFtdID0gW10sXG4gICAgaXRlcmF0ZWU/OiAocDogVCkgPT4gVFtrZXlvZiBUXSB8IFQsXG4pOiBUW10ge1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gaXRlcmF0ZWUgPyBsaXN0Lm1hcChpdGVyYXRlZSkgOiBsaXN0O1xuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkXG4gICAgICAgIC5tYXAoKGl0ZW0sIGluZGV4LCBsaXN0KSA9PiAobGlzdC5pbmRleE9mKGl0ZW0pID09PSBpbmRleCA/IGl0ZW0gOiBudWxsKSlcbiAgICAgICAgLnJlZHVjZTxUW10+KFxuICAgICAgICAgICAgKGFjYywgaXRlbSwgaW5kZXgpID0+ICghIWl0ZW0gPyBhY2MuY29uY2F0KGxpc3RbaW5kZXhdKSA6IGFjYyksXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGlzVGV4dFNlbGVjdGlvbiA9IChcbiAgICBzZWxlY3Rpb246IFNlbGVjdGlvbixcbik6IHNlbGVjdGlvbiBpcyBUZXh0U2VsZWN0aW9uID0+IHNlbGVjdGlvbiBpbnN0YW5jZW9mIFRleHRTZWxlY3Rpb247XG5cbi8qKiBIZWxwZXIgdHlwZSBmb3Igc2luZ2xlIGFyZyBmdW5jdGlvbiAqL1xudHlwZSBGdW5jPEEsIEI+ID0gKGE6IEEpID0+IEI7XG50eXBlIEZ1bmNOPEEgZXh0ZW5kcyBhbnlbXSwgQj4gPSAoLi4uYXJnczogQSkgPT4gQjtcblxuLyoqXG4gKiBDb21wb3NlIDEgdG8gbiBmdW5jdGlvbnMuXG4gKiBAcGFyYW0gZnVuYyBmaXJzdCBmdW5jdGlvblxuICogQHBhcmFtIGZ1bmNzIGFkZGl0aW9uYWwgZnVuY3Rpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPFxuICAgIEYxIGV4dGVuZHMgRnVuYzxhbnksIGFueT4sXG4gICAgRk4gZXh0ZW5kcyBBcnJheTxGdW5jPGFueSwgYW55Pj4sXG4gICAgUiBleHRlbmRzIEZOIGV4dGVuZHMgW11cbiAgICAgICAgPyBGMVxuICAgICAgICA6IEZOIGV4dGVuZHMgW0Z1bmM8aW5mZXIgQSwgYW55Pl1cbiAgICAgICAgICAgID8gKGE6IEEpID0+IFJldHVyblR5cGU8RjE+XG4gICAgICAgICAgICA6IEZOIGV4dGVuZHMgW2FueSwgRnVuYzxpbmZlciBBLCBhbnk+XVxuICAgICAgICAgICAgICAgID8gKGE6IEEpID0+IFJldHVyblR5cGU8RjE+XG4gICAgICAgICAgICAgICAgOiBGTiBleHRlbmRzIFthbnksIGFueSwgRnVuYzxpbmZlciBBLCBhbnk+XVxuICAgICAgICAgICAgICAgICAgICA/IChhOiBBKSA9PiBSZXR1cm5UeXBlPEYxPlxuICAgICAgICAgICAgICAgICAgICA6IEZOIGV4dGVuZHMgW2FueSwgYW55LCBhbnksIEZ1bmM8aW5mZXIgQSwgYW55Pl1cbiAgICAgICAgICAgICAgICAgICAgICAgID8gKGE6IEEpID0+IFJldHVyblR5cGU8RjE+XG4gICAgICAgICAgICAgICAgICAgICAgICA6IEZOIGV4dGVuZHMgW2FueSwgYW55LCBhbnksIGFueSwgRnVuYzxpbmZlciBBLCBhbnk+XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGE6IEEpID0+IFJldHVyblR5cGU8RjE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBGdW5jPGFueSwgUmV0dXJuVHlwZTxGMT4+IC8vIERvdWJ0ZnVsIHdlXCJkIGV2ZXIgd2FudCB0byBwaXBlIHRoaXMgbWFueSBmdW5jdGlvbnMsIGJ1dCBpbiB0aGUgb2ZmIGNoYW5jZSBzb21lb25lIGRvZXMsIHdlIGNhbiBzdGlsbCBpbmZlciB0aGUgcmV0dXJuIHR5cGVcbiAgICA+KGZ1bmM6IEYxLCAuLi5mdW5jczogRk4pOiBSIHtcbiAgICBjb25zdCBhbGxGdW5jcyA9IFtmdW5jLCAuLi5mdW5jc107XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNvbXBvc2VkKHJhdzogYW55KSB7XG4gICAgICAgIHJldHVybiBhbGxGdW5jcy5yZWR1Y2VSaWdodCgobWVtbywgZnVuYykgPT4gZnVuYyhtZW1vKSwgcmF3KTtcbiAgICB9IGFzIFI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwaXBlKCk6IDxSPihhOiBSKSA9PiBSO1xuXG5leHBvcnQgZnVuY3Rpb24gcGlwZTxGIGV4dGVuZHMgRnVuY3Rpb24+KGY6IEYpOiBGO1xuXG4vLyBvbmUgZnVuY3Rpb25cbmV4cG9ydCBmdW5jdGlvbiBwaXBlPEYxIGV4dGVuZHMgRnVuY048YW55LCBhbnk+PihcbiAgICBmMTogRjEsXG4pOiAoLi4uYXJnczogUGFyYW1ldGVyczxGMT4pID0+IFJldHVyblR5cGU8RjE+O1xuXG4vLyB0d28gZnVuY3Rpb25cbmV4cG9ydCBmdW5jdGlvbiBwaXBlPFxuICAgIEYxIGV4dGVuZHMgRnVuY048YW55LCBhbnk+LFxuICAgIEYyIGV4dGVuZHMgRnVuYzxSZXR1cm5UeXBlPEYxPiwgYW55PlxuICAgID4oZjE6IEYxLCBmMjogRjIpOiAoLi4uYXJnczogUGFyYW1ldGVyczxGMT4pID0+IFJldHVyblR5cGU8RjI+O1xuXG4vLyB0aHJlZSBmdW5jdGlvblxuZXhwb3J0IGZ1bmN0aW9uIHBpcGU8XG4gICAgRjEgZXh0ZW5kcyBGdW5jTjxhbnksIGFueT4sXG4gICAgRjIgZXh0ZW5kcyBGdW5jPFJldHVyblR5cGU8RjE+LCBhbnk+LFxuICAgIEYzIGV4dGVuZHMgRnVuYzxSZXR1cm5UeXBlPEYyPiwgYW55PlxuICAgID4oZjE6IEYxLCBmMjogRjIsIGYzOiBGMyk6ICguLi5hcmdzOiBQYXJhbWV0ZXJzPEYxPikgPT4gUmV0dXJuVHlwZTxGMz47XG4vLyBJZiBuZWVkZWQgYWRkIG1vcmUgdGhhbiAzIGZ1bmN0aW9uXG4vLyBHZW5lcmljXG5leHBvcnQgZnVuY3Rpb24gcGlwZTxcbiAgICBGMSBleHRlbmRzIEZ1bmNOPGFueSwgYW55PixcbiAgICBGMiBleHRlbmRzIEZ1bmM8UmV0dXJuVHlwZTxGMT4sIGFueT4sXG4gICAgRjMgZXh0ZW5kcyBGdW5jPFJldHVyblR5cGU8RjI+LCBhbnk+LFxuICAgIEZOIGV4dGVuZHMgQXJyYXk8RnVuYzxhbnksIGFueT4+XG4gICAgPihmMTogRjEsIGYyOiBGMiwgZjM6IEYzLCAuLi5mbjogRk4pOiAoLi4uYXJnczogUGFyYW1ldGVyczxGMT4pID0+IGFueTtcblxuLy8gcmVzdFxuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoLi4uZm5zOiBGdW5jdGlvbltdKSB7XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIChhOiBhbnkpID0+IGE7XG4gICAgfVxuXG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZuc1swXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm5zLnJlZHVjZSgocHJldkZuLCBuZXh0Rm4pID0+ICguLi5hcmdzOiBhbnlbXSkgPT5cbiAgICAgICAgbmV4dEZuKHByZXZGbiguLi5hcmdzKSksXG4gICAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5vcm1hbGlzZU5lc3RlZExheW91dCA9IChzdGF0ZTogRWRpdG9yU3RhdGUsIG5vZGU6IE5vZGUpID0+IHtcbiAgICBpZiAoc3RhdGUuc2VsZWN0aW9uLiRmcm9tLmRlcHRoID4gMSkge1xuICAgICAgICBpZiAobm9kZS5hdHRycy5sYXlvdXQgJiYgbm9kZS5hdHRycy5sYXlvdXQgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS50eXBlLmNyZWF0ZUNoZWNrZWQoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAuLi5ub2RlLmF0dHJzLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbm9kZS5jb250ZW50LFxuICAgICAgICAgICAgICAgIG5vZGUubWFya3MsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgaXRzIGEgYnJlYWtvdXQgbGF5b3V0LCB3ZSBjYW4gcmVtb3ZlIHRoZSBtYXJrXG4gICAgICAgIC8vIFNpbmNlIGRlZmF1bHQgaXNuXCJ0IGEgdmFsaWQgYnJlYWtvdXQgbW9kZS5cbiAgICAgICAgY29uc3QgYnJlYWtvdXRNYXJrOiBNYXJrID0gc3RhdGUuc2NoZW1hLm1hcmtzLmJyZWFrb3V0O1xuICAgICAgICBpZiAoYnJlYWtvdXRNYXJrICYmIGJyZWFrb3V0TWFyay5pc0luU2V0KG5vZGUubWFya3MpKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdNYXJrcyA9IGJyZWFrb3V0TWFyay5yZW1vdmVGcm9tU2V0KG5vZGUubWFya3MpO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUudHlwZS5jcmVhdGVDaGVja2VkKG5vZGUuYXR0cnMsIG5vZGUuY29udGVudCwgbmV3TWFya3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuIl19