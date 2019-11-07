import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MessageRef} from "@co.mmons/js-intl";

export abstract class LinkType {

    protected constructor(public readonly type: string) {
    }

    abstract get label(): MessageRef;

    abstract get inputType(): string;

    abstract get inputComponent(): any;

    abstract get inputValidators(): ValidatorFn[];

    abstract get inputHint(): MessageRef;

    abstract get inputLabel(): MessageRef;

    abstract uri(fromLink: string): string;

    toString() {
        return this.type;
    }
}

export class DefaultLinkType extends LinkType {

    static readonly www = new DefaultLinkType("www");
    static readonly email = new DefaultLinkType("email");
    static readonly tel = new DefaultLinkType("tel");
    static readonly sms = new DefaultLinkType("sms");
    static readonly other = new DefaultLinkType("other");

    constructor(type: string) {
        super(type);

        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/type/" + type);

        if (type === "www") {
            this.inputType = "url";
        } else if (type === "other") {
            this.inputType = "text";
        } else if (type === "sms") {
            this.inputType = "sms";
        } else {
            this.inputType = type;
        }

        if (type === "www") {
            this.inputValidators = [urlValidator];
            this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Web page url");
        }

        if (type === "email") {
            this.inputValidators = [Validators.email];
            this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/E-mail address");
        }

        if (type === "tel" || type === "sms") {
            this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Phone number");
            this.inputHint = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/phoneNumberHint");
        }
    }


    readonly label: MessageRef;

    readonly inputType: string;

    readonly inputValidators: ValidatorFn[];

    readonly inputComponent = undefined;

    readonly inputLabel: MessageRef;

    readonly inputHint: MessageRef;

    uri(fromLink: string) {

        if (this.type === "www" || this.type === "other") {
            return fromLink;
        } else if (this.type === "tel") {
            return `tel:${fromLink}`;
        } else if (this.type === "sms") {
            return `sms:${fromLink}`;
        } else if (this.type === "email") {
            return `mailto:${fromLink}`;
        }

        return fromLink;
    }

}

const urlValidatorRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

function urlValidator(control: AbstractControl): ValidationErrors {

    const value = control.value;

    if (urlValidatorRegex.test(value)) {
        return undefined;
    }

    return {
        invalidUrl: new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/invalidUrlError")
    };
}
