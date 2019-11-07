// https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js#L90
// Keep going left up the tree, without going across isolating boundaries, until we
// can go along the tree at that same level
//
// You can think of this as, if you could construct each document like we do in the tests,
// return the position of the first ) backwards from the current selection.
import {ResolvedPos} from "prosemirror-model";

export function findCutBefore($pos: ResolvedPos): ResolvedPos | null {

    // parent is non-isolating, so we can look across this boundary
    if (!$pos.parent.type.spec.isolating) {
        // search up the tree from the pos"s *parent*
        for (let i = $pos.depth - 1; i >= 0; i--) {
            // starting from the inner most node"s parent, find out
            // if we"re not its first child
            if ($pos.index(i) > 0) {
                return $pos.doc.resolve($pos.before(i + 1));
            }

            if ($pos.node(i).type.spec.isolating) {
                break;
            }
        }
    }

    return null;
}
