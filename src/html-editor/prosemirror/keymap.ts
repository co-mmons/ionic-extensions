import {joinDown, joinUp, lift, selectParentNode, toggleMark} from "prosemirror-commands";
import {redo, undo} from "prosemirror-history";
import {undoInputRule} from "prosemirror-inputrules";
import {Schema} from "prosemirror-model";
import {splitListItem} from "prosemirror-schema-list";

const mac = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;

export function buildKeymap(schema: Schema, mapKeys?: any) {

    const keys = {};
    let type: any;

    function bind(key, cmd) {

        if (mapKeys) {
            const mapped = mapKeys[key];

            if (mapped === false) {
                return;
            }

            if (mapped) {
                key = mapped;
            }
        }

        keys[key] = cmd;
    }


    bind("Mod-z", undo);
    bind("Shift-Mod-z", redo);
    bind("Backspace", undoInputRule);
    if (!mac) {
        bind("Mod-y", redo);
    }

    bind("Alt-ArrowUp", joinUp);
    bind("Alt-ArrowDown", joinDown);
    bind("Mod-BracketLeft", lift);
    bind("Escape", selectParentNode);

    if (type = schema.marks.strong) {
        bind("Mod-b", toggleMark(type));
        bind("Mod-B", toggleMark(type));
    }

    if (type = schema.marks.em) {
        bind("Mod-i", toggleMark(type));
        bind("Mod-I", toggleMark(type));
    }

    if (type = schema.marks.underline) {
        bind("Mod-u", toggleMark(type));
        bind("Mod-U", toggleMark(type));
    }

    if (type = schema.nodes.listItem) {
        bind("Enter", splitListItem(type));
    }

    if (type = schema.nodes.hardBreak) {

        const br = type;

        const cmd = (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
            return true;
        };

        bind("Mod-Enter", cmd);
        bind("Shift-Enter", cmd);

        if (mac) {
            bind("Ctrl-Enter", cmd);
        }
    }

    return keys;
}
