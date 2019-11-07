import { EventManager } from "@angular/platform-browser";
import { Node } from "prosemirror-model";
import { EditorView, NodeView } from "prosemirror-view";
export declare function createYoutubeIframe(id: string, start?: string): HTMLIFrameElement;
export declare class YoutubeNodeView implements NodeView {
    protected view: EditorView;
    constructor(node: Node, view: EditorView, eventManager: EventManager);
    private deleteUnlisten;
    dom: HTMLElement;
    private deleteNode;
    selectNode(): void;
    deselectNode(): void;
    update(node: Node): boolean;
    destroy(): void;
    stopEvent(event: Event): boolean;
    ignoreMutation(): boolean;
}
