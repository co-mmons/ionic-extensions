const ɵ0 = dom => {
    const size = dom.getAttribute("data-font-size");
    return size ? { fontSize: size } : false;
};
export const fontSize = {
    excludes: "fontSize",
    group: "fontSize",
    attrs: {
        fontSize: {},
    },
    parseDOM: [
        {
            tag: "span[data-font-size]",
            getAttrs: ɵ0,
        },
    ],
    toDOM(mark) {
        return [
            "span",
            { style: `font-size: ${mark.attrs.fontSize}`, "data-font-size": mark.attrs.fontSize },
            0
        ];
    },
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udC1zaXplLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJwcm9zZW1pcnJvci9tYXJrcy9mb250LXNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IldBV3NCLEdBQUcsQ0FBQyxFQUFFO0lBQ1osTUFBTSxJQUFJLEdBQUksR0FBZSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzNDLENBQUM7QUFaYixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWE7SUFDOUIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsS0FBSyxFQUFFLFVBQVU7SUFDakIsS0FBSyxFQUFFO1FBQ0gsUUFBUSxFQUFFLEVBQUU7S0FDZjtJQUNELFFBQVEsRUFBRTtRQUNOO1lBQ0ksR0FBRyxFQUFFLHNCQUFzQjtZQUMzQixRQUFRLElBR1A7U0FDSjtLQUNKO0lBQ0QsS0FBSyxDQUFDLElBQUk7UUFDTixPQUFPO1lBQ0gsTUFBTTtZQUNOLEVBQUMsS0FBSyxFQUFFLGNBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQztZQUNuRixDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNYXJrU3BlY30gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5cbmV4cG9ydCBjb25zdCBmb250U2l6ZTogTWFya1NwZWMgPSB7XG4gICAgZXhjbHVkZXM6IFwiZm9udFNpemVcIixcbiAgICBncm91cDogXCJmb250U2l6ZVwiLFxuICAgIGF0dHJzOiB7XG4gICAgICAgIGZvbnRTaXplOiB7fSxcbiAgICB9LFxuICAgIHBhcnNlRE9NOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhZzogXCJzcGFuW2RhdGEtZm9udC1zaXplXVwiLFxuICAgICAgICAgICAgZ2V0QXR0cnM6IGRvbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IChkb20gYXMgRWxlbWVudCkuZ2V0QXR0cmlidXRlKFwiZGF0YS1mb250LXNpemVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemUgPyB7Zm9udFNpemU6IHNpemV9IDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIF0sXG4gICAgdG9ET00obWFyaykge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICB7c3R5bGU6IGBmb250LXNpemU6ICR7bWFyay5hdHRycy5mb250U2l6ZX1gLCBcImRhdGEtZm9udC1zaXplXCI6IG1hcmsuYXR0cnMuZm9udFNpemV9LFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgIH0sXG59O1xuIl19