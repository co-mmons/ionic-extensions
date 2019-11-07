import {EventManager} from "@angular/platform-browser";
import {Node} from "prosemirror-model";
import {removeSelectedNode} from "prosemirror-utils";
import {EditorView, NodeView} from "prosemirror-view";

export function createYoutubeIframe(id: string, start?: string) {

    const iframe = document.createElement("iframe");
    iframe.height = "200px";
    iframe.width = "100%";
    iframe.src = `https://www.youtube.com/embed/${id}${start ? "?start=" + start : ""}`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    return iframe;
}

// https://www.youtube.com/watch?v=m3V7_Ov52sY
export class YoutubeNodeView implements NodeView {

    constructor(node: Node, protected view: EditorView, eventManager: EventManager) {

        this.dom = document.createElement("div");
        this.dom.style.position = "relative";
        this.dom.style.overflow = "hidden";
        this.dom.style.height = "200px";
        this.dom.style.marginTop = "16px";

        this.dom.appendChild(createYoutubeIframe(node.attrs.id, node.attrs.start));

        const overlay = this.dom.appendChild(document.createElement("div"));
        overlay.style.position = "absolute";
        overlay.style.left = "0px";
        overlay.style.top = "0px";
        overlay.style.width = "100%";
        overlay.style.height = "200px";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";

        const button = overlay.appendChild(document.createElement("ion-button"));
        button.classList.add("ionx--interactive");
        button.setAttribute("color", "primary");
        this.deleteUnlisten = eventManager.addEventListener(button, "click", () => this.deleteNode());

        const icon = document.createElement("ion-icon");
        icon.setAttribute("name", "trash");
        icon.slot = "icon-only";
        button.appendChild(icon);
    }

    private deleteUnlisten: Function;

    dom: HTMLElement;

    private deleteNode() {
        this.view.dispatch(removeSelectedNode(this.view.state.tr));
    }

    selectNode() {
        this.dom.classList.add("ionx--selected");
    }

    deselectNode() {
        this.dom.classList.remove("ionx--selected");
    }

    update(node: Node) {
        return false;
    }

    destroy() {

        if (this.deleteUnlisten) {
            this.deleteUnlisten();
        }
    }

    stopEvent(event: Event) {
        return false;
    }

    ignoreMutation() {
        return true;
    }
}
