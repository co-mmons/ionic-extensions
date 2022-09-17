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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9ucy1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9zdWJzY3JpcHRpb25zLWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sbUJBQW1CO0lBQWhDO1FBRVksa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBZ0IvQyxDQUFDO0lBZFUsR0FBRyxDQUFDLFlBQTBCO1FBQ2pDLElBQUksWUFBWSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRU0sY0FBYztRQUVqQixLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDOUIsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25CO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25zSGVscGVyIHtcblxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIHB1YmxpYyBhZGQoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bnN1YnNjcmliZUFsbCgpIHtcblxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgZS51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgfVxufSJdfQ==