import {Subscription} from "rxjs/Rx";

export class SubscriptionsHelper {

    private subscriptions: Subscription[] = [];

    public add(subscription: Subscription) {
        if (subscription) {
            this.subscriptions.push(subscription);
        }
    }

    public unsubscribeAll() {

        for (let e of this.subscriptions) {
            e.unsubscribe();
        }

        this.subscriptions = [];
    }
}