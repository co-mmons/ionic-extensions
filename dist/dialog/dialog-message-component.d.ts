import { Dialog } from "./dialog";
import { dialogInstance } from "./dialog-instance-symbol";
import { dialogData } from "./dialog-data-symbol";
export interface DialogMessageComponent {
    [dialogData]?(): any;
    readonly [dialogInstance]?: Dialog;
}
