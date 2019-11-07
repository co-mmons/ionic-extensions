import {ResolvedPos, Schema} from "prosemirror-model";

// This will return (depth - 1) for root list parent of a list.
export const getListLiftTarget = (
    schema: Schema,
    resPos: ResolvedPos,
): number => {
    let target = resPos.depth;
    const { bulletList, orderedList, listItem } = schema.nodes;
    for (let i = resPos.depth; i > 0; i--) {
        const node = resPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            target = i;
        }
        if (
            node.type !== bulletList &&
            node.type !== orderedList &&
            node.type !== listItem
        ) {
            break;
        }
    }
    return target - 1;
};
