import { MessageRef } from "@co.mmons/js-intl";
export class FontSize {
    constructor(size) {
        this.size = size;
        FontSize._sizes.push(this);
        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "textMenu/fontSize/" + size.toUpperCase()[0] + size.substring(1));
    }
    static sizes() {
        return FontSize._sizes.slice();
    }
}
FontSize._sizes = [];
FontSize.small = new FontSize("small");
FontSize.large = new FontSize("large");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udC1zaXplcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odG1sLWVkaXRvci9mb250LXNpemVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxNQUFNLE9BQU8sUUFBUTtJQVdqQixZQUFvQyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUU1QyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLHdDQUF3QyxFQUFFLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUksQ0FBQztJQVpELE1BQU0sQ0FBQyxLQUFLO1FBQ1IsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25DLENBQUM7O0FBSmMsZUFBTSxHQUFlLEVBQUUsQ0FBQztBQU12QixjQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsY0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlUmVmfSBmcm9tIFwiQGNvLm1tb25zL2pzLWludGxcIjtcblxuZXhwb3J0IGNsYXNzIEZvbnRTaXplIHtcblxuICAgIHByaXZhdGUgc3RhdGljIF9zaXplczogRm9udFNpemVbXSA9IFtdO1xuXG4gICAgc3RhdGljIHNpemVzKCkge1xuICAgICAgICByZXR1cm4gRm9udFNpemUuX3NpemVzLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlYWRvbmx5IHNtYWxsID0gbmV3IEZvbnRTaXplKFwic21hbGxcIik7XG4gICAgc3RhdGljIHJlYWRvbmx5IGxhcmdlID0gbmV3IEZvbnRTaXplKFwibGFyZ2VcIik7XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzaXplOiBzdHJpbmcpIHtcblxuICAgICAgICBGb250U2l6ZS5fc2l6ZXMucHVzaCh0aGlzKTtcblxuICAgICAgICB0aGlzLmxhYmVsID0gbmV3IE1lc3NhZ2VSZWYoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvclwiLCBcInRleHRNZW51L2ZvbnRTaXplL1wiICsgc2l6ZS50b1VwcGVyQ2FzZSgpWzBdICsgc2l6ZS5zdWJzdHJpbmcoMSkpO1xuICAgIH1cblxuICAgIHJlYWRvbmx5IGxhYmVsOiBNZXNzYWdlUmVmO1xufVxuIl19