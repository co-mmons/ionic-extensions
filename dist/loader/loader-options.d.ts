export interface LoaderOptions {
    message?: string;
    header?: string;
    mode?: "spinner" | "progress";
    progressMessage?: string;
    progressType?: "determinate" | "indeterminate";
    progressValue?: number;
    progressBuffer?: number;
    progressPercent?: number;
}
