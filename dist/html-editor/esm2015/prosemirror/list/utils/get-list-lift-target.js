// This will return (depth - 1) for root list parent of a list.
export const getListLiftTarget = (schema, resPos) => {
    let target = resPos.depth;
    const { bulletList, orderedList, listItem } = schema.nodes;
    for (let i = resPos.depth; i > 0; i--) {
        const node = resPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            target = i;
        }
        if (node.type !== bulletList &&
            node.type !== orderedList &&
            node.type !== listItem) {
            break;
        }
    }
    return target - 1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWxpc3QtbGlmdC10YXJnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvaHRtbC1lZGl0b3IvcHJvc2VtaXJyb3IvbGlzdC91dGlscy9nZXQtbGlzdC1saWZ0LXRhcmdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSwrREFBK0Q7QUFDL0QsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsQ0FDN0IsTUFBYyxFQUNkLE1BQW1CLEVBQ2IsRUFBRTtJQUNSLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDMUIsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUMzRCxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDdkQsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNkO1FBQ0QsSUFDSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVU7WUFDeEIsSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUN4QjtZQUNFLE1BQU07U0FDVDtLQUNKO0lBQ0QsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVzb2x2ZWRQb3MsIFNjaGVtYX0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5cbi8vIFRoaXMgd2lsbCByZXR1cm4gKGRlcHRoIC0gMSkgZm9yIHJvb3QgbGlzdCBwYXJlbnQgb2YgYSBsaXN0LlxuZXhwb3J0IGNvbnN0IGdldExpc3RMaWZ0VGFyZ2V0ID0gKFxuICAgIHNjaGVtYTogU2NoZW1hLFxuICAgIHJlc1BvczogUmVzb2x2ZWRQb3MsXG4pOiBudW1iZXIgPT4ge1xuICAgIGxldCB0YXJnZXQgPSByZXNQb3MuZGVwdGg7XG4gICAgY29uc3QgeyBidWxsZXRMaXN0LCBvcmRlcmVkTGlzdCwgbGlzdEl0ZW0gfSA9IHNjaGVtYS5ub2RlcztcbiAgICBmb3IgKGxldCBpID0gcmVzUG9zLmRlcHRoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSByZXNQb3Mubm9kZShpKTtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gYnVsbGV0TGlzdCB8fCBub2RlLnR5cGUgPT09IG9yZGVyZWRMaXN0KSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG5vZGUudHlwZSAhPT0gYnVsbGV0TGlzdCAmJlxuICAgICAgICAgICAgbm9kZS50eXBlICE9PSBvcmRlcmVkTGlzdCAmJlxuICAgICAgICAgICAgbm9kZS50eXBlICE9PSBsaXN0SXRlbVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQgLSAxO1xufTtcbiJdfQ==