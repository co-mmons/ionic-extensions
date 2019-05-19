export interface TimezoneInfo {
    id: string;
    label: string;
    date: string;
}
export declare function timezoneInfo(tz: string, date?: Date): {
    id: string;
    label: string;
    date: string;
};
