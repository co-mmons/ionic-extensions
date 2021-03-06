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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWxpc3QtbGlmdC10YXJnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbInByb3NlbWlycm9yL2xpc3QvdXRpbHMvZ2V0LWxpc3QtbGlmdC10YXJnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsK0RBQStEO0FBQy9ELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLENBQzdCLE1BQWMsRUFDZCxNQUFtQixFQUNiLEVBQUU7SUFDUixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzFCLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ3ZELE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDZDtRQUNELElBQ0ksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVztZQUN6QixJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFDeEI7WUFDRSxNQUFNO1NBQ1Q7S0FDSjtJQUNELE9BQU8sTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Jlc29sdmVkUG9zLCBTY2hlbWF9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xuXG4vLyBUaGlzIHdpbGwgcmV0dXJuIChkZXB0aCAtIDEpIGZvciByb290IGxpc3QgcGFyZW50IG9mIGEgbGlzdC5cbmV4cG9ydCBjb25zdCBnZXRMaXN0TGlmdFRhcmdldCA9IChcbiAgICBzY2hlbWE6IFNjaGVtYSxcbiAgICByZXNQb3M6IFJlc29sdmVkUG9zLFxuKTogbnVtYmVyID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gcmVzUG9zLmRlcHRoO1xuICAgIGNvbnN0IHsgYnVsbGV0TGlzdCwgb3JkZXJlZExpc3QsIGxpc3RJdGVtIH0gPSBzY2hlbWEubm9kZXM7XG4gICAgZm9yIChsZXQgaSA9IHJlc1Bvcy5kZXB0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICBjb25zdCBub2RlID0gcmVzUG9zLm5vZGUoaSk7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IGJ1bGxldExpc3QgfHwgbm9kZS50eXBlID09PSBvcmRlcmVkTGlzdCkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBub2RlLnR5cGUgIT09IGJ1bGxldExpc3QgJiZcbiAgICAgICAgICAgIG5vZGUudHlwZSAhPT0gb3JkZXJlZExpc3QgJiZcbiAgICAgICAgICAgIG5vZGUudHlwZSAhPT0gbGlzdEl0ZW1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0IC0gMTtcbn07XG4iXX0=