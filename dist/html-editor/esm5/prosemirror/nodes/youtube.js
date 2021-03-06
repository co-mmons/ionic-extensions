var ɵ0 = { default: "" }, ɵ1 = function (node) {
    return [
        "div",
        { "data-youtube": node.attrs.id + (node.attrs.start ? "," + node.attrs.start : "") }
    ];
}, ɵ2 = function (dom) {
    // @ts-ignore
    var info = dom.getAttribute("data-youtube").split(",");
    return {
        id: info[0],
        start: info.length > 1 ? info[1] : 0
    };
};
export var youtube = {
    attrs: { id: ɵ0, start: { default: 0 } },
    inline: false,
    group: "block",
    draggable: false,
    toDOM: ɵ1,
    parseDOM: [
        {
            tag: "div[data-youtube]",
            getAttrs: ɵ2,
        }
    ]
};
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsicHJvc2VtaXJyb3Ivbm9kZXMveW91dHViZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiU0FHZ0IsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFDLE9BS2xCLFVBQUMsSUFBSTtJQUVSLE9BQU87UUFDSCxLQUFLO1FBQ0wsRUFBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQztLQUNyRixDQUFDO0FBQ04sQ0FBQyxPQUtpQixVQUFDLEdBQUc7SUFFVixhQUFhO0lBQ2IsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFekQsT0FBTztRQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkMsQ0FBQztBQUNOLENBQUM7QUExQmIsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFhO0lBQzdCLEtBQUssRUFBRSxFQUFDLEVBQUUsSUFBZSxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsRUFBQztJQUMvQyxNQUFNLEVBQUUsS0FBSztJQUNiLEtBQUssRUFBRSxPQUFPO0lBQ2QsU0FBUyxFQUFFLEtBQUs7SUFFaEIsS0FBSyxJQU1KO0lBRUQsUUFBUSxFQUFFO1FBQ047WUFDSSxHQUFHLEVBQUUsbUJBQW1CO1lBQ3hCLFFBQVEsSUFTUDtTQUNKO0tBQ0o7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOb2RlU3BlY30gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5cbmV4cG9ydCBjb25zdCB5b3V0dWJlOiBOb2RlU3BlYyA9IHtcbiAgICBhdHRyczoge2lkOiB7ZGVmYXVsdDogXCJcIn0sIHN0YXJ0OiB7ZGVmYXVsdDogMH19LFxuICAgIGlubGluZTogZmFsc2UsXG4gICAgZ3JvdXA6IFwiYmxvY2tcIixcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuXG4gICAgdG9ET006IChub2RlKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XCJkYXRhLXlvdXR1YmVcIjogbm9kZS5hdHRycy5pZCArIChub2RlLmF0dHJzLnN0YXJ0ID8gXCIsXCIgKyBub2RlLmF0dHJzLnN0YXJ0IDogXCJcIil9XG4gICAgICAgIF07XG4gICAgfSxcblxuICAgIHBhcnNlRE9NOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhZzogXCJkaXZbZGF0YS15b3V0dWJlXVwiLFxuICAgICAgICAgICAgZ2V0QXR0cnM6IChkb20pID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gZG9tLmdldEF0dHJpYnV0ZShcImRhdGEteW91dHViZVwiKS5zcGxpdChcIixcIik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpZDogaW5mb1swXSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGluZm8ubGVuZ3RoID4gMSA/IGluZm9bMV0gOiAwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICBdXG59O1xuIl19