import { OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormHelper } from "@co.mmons/ionic-extensions/form-helper";
import { ModalController } from "@ionic/angular";
import { HtmlEditor } from "./editor";
import { LinkType } from "./link-type";
export declare class LinkModal implements OnDestroy, OnInit {
    private modalController;
    static present(modalController: ModalController, editor: HtmlEditor): Promise<void>;
    constructor(modalController: ModalController);
    private editor;
    existing: boolean;
    private existingType;
    private existingLink;
    types: LinkType[];
    form: FormGroup;
    formHelper: FormHelper;
    close(): Promise<void>;
    unlink(): Promise<void>;
    ok(): Promise<void>;
    private typeChanged;
    private parseLink;
    private linkValidator;
    ionViewDidEnter(): Promise<void>;
    ionViewWillLeave(): Promise<void>;
    ngOnInit(): void;
    private typeChangesSubscription;
    ngOnDestroy(): void;
}
