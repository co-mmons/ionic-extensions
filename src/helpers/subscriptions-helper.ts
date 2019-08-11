import {Subscription} from "rxjs";

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