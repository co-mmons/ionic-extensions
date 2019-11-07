import { MarkType, Node as PMNode, NodeType, Schema } from "prosemirror-model";
import { Command } from "../command";
/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror"s `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
export declare const toggleBlockMark: <T = object>(markType: MarkType<any>, getAttrs: (prevAttrs?: T, node?: PMNode<any>) => false | T, allowedBlocks?: NodeType<any>[] | ((schema: Schema<any, any>, node: PMNode<any>, parent: PMNode<any>) => boolean)) => Command;
