import { Subscription } from "rxjs/Rx";
export declare class SubscriptionsHelper {
    private subscriptions;
    add(subscription: Subscription): void;
    unsubscribeAll(): void;
}
