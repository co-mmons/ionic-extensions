import { Subscription } from "rxjs";
export declare class SubscriptionsHelper {
    private subscriptions;
    add(subscription: Subscription): void;
    unsubscribeAll(): void;
}
