export class SubscriptionsHelper {
    constructor() {
        this.subscriptions = [];
    }
    add(subscription) {
        if (subscription) {
            this.subscriptions.push(subscription);
        }
    }
    unsubscribeAll() {
        for (let e of this.subscriptions) {
            e.unsubscribe();
        }
        this.subscriptions = [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9ucy1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9oZWxwZXJzLyIsInNvdXJjZXMiOlsic3Vic2NyaXB0aW9ucy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLG1CQUFtQjtJQUFoQztRQUVZLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztJQWdCL0MsQ0FBQztJQWRVLEdBQUcsQ0FBQyxZQUEwQjtRQUNqQyxJQUFJLFlBQVksRUFBRTtZQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVNLGNBQWM7UUFFakIsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzlCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9uc0hlbHBlciB7XG5cbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBwdWJsaWMgYWRkKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdW5zdWJzY3JpYmVBbGwoKSB7XG5cbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIGUudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgIH1cbn0iXX0=