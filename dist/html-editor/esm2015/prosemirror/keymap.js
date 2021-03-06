import { joinDown, joinUp, lift, selectParentNode, toggleMark } from "prosemirror-commands";
import { redo, undo } from "prosemirror-history";
import { undoInputRule } from "prosemirror-inputrules";
import { splitListItem } from "prosemirror-schema-list";
const mac = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
export function buildKeymap(schema, mapKeys) {
    const keys = {};
    let type;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5bWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJwcm9zZW1pcnJvci9rZXltYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUV0RCxNQUFNLEdBQUcsR0FBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFFdEYsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFjLEVBQUUsT0FBYTtJQUVyRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxJQUFTLENBQUM7SUFFZCxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRztRQUVsQixJQUFJLE9BQU8sRUFBRTtZQUNULE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU1QixJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQ2xCLE9BQU87YUFDVjtZQUVELElBQUksTUFBTSxFQUFFO2dCQUNSLEdBQUcsR0FBRyxNQUFNLENBQUM7YUFDaEI7U0FDSjtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUdELElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDTixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QixJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFFakMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN0QztJQUVELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1FBRS9CLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztRQUVoQixNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUM1QixRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QixJQUFJLEdBQUcsRUFBRTtZQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2pvaW5Eb3duLCBqb2luVXAsIGxpZnQsIHNlbGVjdFBhcmVudE5vZGUsIHRvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtyZWRvLCB1bmRvfSBmcm9tIFwicHJvc2VtaXJyb3ItaGlzdG9yeVwiO1xuaW1wb3J0IHt1bmRvSW5wdXRSdWxlfSBmcm9tIFwicHJvc2VtaXJyb3ItaW5wdXRydWxlc1wiO1xuaW1wb3J0IHtTY2hlbWF9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xuaW1wb3J0IHtzcGxpdExpc3RJdGVtfSBmcm9tIFwicHJvc2VtaXJyb3Itc2NoZW1hLWxpc3RcIjtcblxuY29uc3QgbWFjID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiA/IC9NYWMvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSA6IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRLZXltYXAoc2NoZW1hOiBTY2hlbWEsIG1hcEtleXM/OiBhbnkpIHtcblxuICAgIGNvbnN0IGtleXMgPSB7fTtcbiAgICBsZXQgdHlwZTogYW55O1xuXG4gICAgZnVuY3Rpb24gYmluZChrZXksIGNtZCkge1xuXG4gICAgICAgIGlmIChtYXBLZXlzKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwZWQgPSBtYXBLZXlzW2tleV07XG5cbiAgICAgICAgICAgIGlmIChtYXBwZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWFwcGVkKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gbWFwcGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5c1trZXldID0gY21kO1xuICAgIH1cblxuXG4gICAgYmluZChcIk1vZC16XCIsIHVuZG8pO1xuICAgIGJpbmQoXCJTaGlmdC1Nb2QtelwiLCByZWRvKTtcbiAgICBiaW5kKFwiQmFja3NwYWNlXCIsIHVuZG9JbnB1dFJ1bGUpO1xuICAgIGlmICghbWFjKSB7XG4gICAgICAgIGJpbmQoXCJNb2QteVwiLCByZWRvKTtcbiAgICB9XG5cbiAgICBiaW5kKFwiQWx0LUFycm93VXBcIiwgam9pblVwKTtcbiAgICBiaW5kKFwiQWx0LUFycm93RG93blwiLCBqb2luRG93bik7XG4gICAgYmluZChcIk1vZC1CcmFja2V0TGVmdFwiLCBsaWZ0KTtcbiAgICBiaW5kKFwiRXNjYXBlXCIsIHNlbGVjdFBhcmVudE5vZGUpO1xuXG4gICAgaWYgKHR5cGUgPSBzY2hlbWEubWFya3Muc3Ryb25nKSB7XG4gICAgICAgIGJpbmQoXCJNb2QtYlwiLCB0b2dnbGVNYXJrKHR5cGUpKTtcbiAgICAgICAgYmluZChcIk1vZC1CXCIsIHRvZ2dsZU1hcmsodHlwZSkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlID0gc2NoZW1hLm1hcmtzLmVtKSB7XG4gICAgICAgIGJpbmQoXCJNb2QtaVwiLCB0b2dnbGVNYXJrKHR5cGUpKTtcbiAgICAgICAgYmluZChcIk1vZC1JXCIsIHRvZ2dsZU1hcmsodHlwZSkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlID0gc2NoZW1hLm1hcmtzLnVuZGVybGluZSkge1xuICAgICAgICBiaW5kKFwiTW9kLXVcIiwgdG9nZ2xlTWFyayh0eXBlKSk7XG4gICAgICAgIGJpbmQoXCJNb2QtVVwiLCB0b2dnbGVNYXJrKHR5cGUpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5saXN0SXRlbSkge1xuICAgICAgICBiaW5kKFwiRW50ZXJcIiwgc3BsaXRMaXN0SXRlbSh0eXBlKSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPSBzY2hlbWEubm9kZXMuaGFyZEJyZWFrKSB7XG5cbiAgICAgICAgY29uc3QgYnIgPSB0eXBlO1xuXG4gICAgICAgIGNvbnN0IGNtZCA9IChzdGF0ZSwgZGlzcGF0Y2gpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHN0YXRlLnRyLnJlcGxhY2VTZWxlY3Rpb25XaXRoKGJyLmNyZWF0ZSgpKS5zY3JvbGxJbnRvVmlldygpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGJpbmQoXCJNb2QtRW50ZXJcIiwgY21kKTtcbiAgICAgICAgYmluZChcIlNoaWZ0LUVudGVyXCIsIGNtZCk7XG5cbiAgICAgICAgaWYgKG1hYykge1xuICAgICAgICAgICAgYmluZChcIkN0cmwtRW50ZXJcIiwgY21kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBrZXlzO1xufVxuIl19