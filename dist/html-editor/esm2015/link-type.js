import { Validators } from "@angular/forms";
import { MessageRef } from "@co.mmons/js-intl";
export class LinkType {
    constructor(type) {
        this.type = type;
    }
    toString() {
        return this.type;
    }
}
export class DefaultLinkType extends LinkType {
    constructor(type) {
        super(type);
        this.inputComponent = undefined;
        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/type/" + type);
        if (type === "www") {
            this.inputType = "url";
        }
        else if (type === "other") {
            this.inputType = "text";
        }
        else if (type === "sms") {
            this.inputType = "sms";
        }
        else {
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
    uri(fromLink) {
        if (this.type === "www" || this.type === "other") {
            return fromLink;
        }
        else if (this.type === "tel") {
            return `tel:${fromLink}`;
        }
        else if (this.type === "sms") {
            return `sms:${fromLink}`;
        }
        else if (this.type === "email") {
            return `mailto:${fromLink}`;
        }
        return fromLink;
    }
}
DefaultLinkType.www = new DefaultLinkType("www");
DefaultLinkType.email = new DefaultLinkType("email");
DefaultLinkType.tel = new DefaultLinkType("tel");
DefaultLinkType.sms = new DefaultLinkType("sms");
DefaultLinkType.other = new DefaultLinkType("other");
const urlValidatorRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
function urlValidator(control) {
    const value = control.value;
    if (urlValidatorRegex.test(value)) {
        return undefined;
    }
    return {
        invalidUrl: new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/invalidUrlError")
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay10eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2h0bWwtZWRpdG9yL2xpbmstdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlELFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxNQUFNLE9BQWdCLFFBQVE7SUFFMUIsWUFBc0MsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7SUFDbEQsQ0FBQztJQWdCRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxlQUFnQixTQUFRLFFBQVE7SUFRekMsWUFBWSxJQUFZO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQXFDUCxtQkFBYyxHQUFHLFNBQVMsQ0FBQztRQW5DaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyx3Q0FBd0MsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFM0YsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzFCO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN6QjtRQUVELElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyx3Q0FBd0MsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ25HO1FBRUQsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyx3Q0FBd0MsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3JHO1FBRUQsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyx3Q0FBd0MsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsd0NBQXdDLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUNyRztJQUNMLENBQUM7SUFlRCxHQUFHLENBQUMsUUFBZ0I7UUFFaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUM5QyxPQUFPLFFBQVEsQ0FBQztTQUNuQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxPQUFPLFFBQVEsRUFBRSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUM1QixPQUFPLE9BQU8sUUFBUSxFQUFFLENBQUM7U0FDNUI7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQzlCLE9BQU8sVUFBVSxRQUFRLEVBQUUsQ0FBQztTQUMvQjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7O0FBL0RlLG1CQUFHLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMscUJBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQyxtQkFBRyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLG1CQUFHLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMscUJBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQStEekQsTUFBTSxpQkFBaUIsR0FBRyx5YUFBeWEsQ0FBQztBQUVwYyxTQUFTLFlBQVksQ0FBQyxPQUF3QjtJQUUxQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBRTVCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQy9CLE9BQU8sU0FBUyxDQUFDO0tBQ3BCO0lBRUQsT0FBTztRQUNILFVBQVUsRUFBRSxJQUFJLFVBQVUsQ0FBQyx3Q0FBd0MsRUFBRSxzQkFBc0IsQ0FBQztLQUMvRixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge01lc3NhZ2VSZWZ9IGZyb20gXCJAY28ubW1vbnMvanMtaW50bFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGlua1R5cGUge1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgbGFiZWwoKTogTWVzc2FnZVJlZjtcblxuICAgIGFic3RyYWN0IGdldCBpbnB1dFR5cGUoKTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0IGlucHV0Q29tcG9uZW50KCk6IGFueTtcblxuICAgIGFic3RyYWN0IGdldCBpbnB1dFZhbGlkYXRvcnMoKTogVmFsaWRhdG9yRm5bXTtcblxuICAgIGFic3RyYWN0IGdldCBpbnB1dEhpbnQoKTogTWVzc2FnZVJlZjtcblxuICAgIGFic3RyYWN0IGdldCBpbnB1dExhYmVsKCk6IE1lc3NhZ2VSZWY7XG5cbiAgICBhYnN0cmFjdCB1cmkoZnJvbUxpbms6IHN0cmluZyk6IHN0cmluZztcblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRMaW5rVHlwZSBleHRlbmRzIExpbmtUeXBlIHtcblxuICAgIHN0YXRpYyByZWFkb25seSB3d3cgPSBuZXcgRGVmYXVsdExpbmtUeXBlKFwid3d3XCIpO1xuICAgIHN0YXRpYyByZWFkb25seSBlbWFpbCA9IG5ldyBEZWZhdWx0TGlua1R5cGUoXCJlbWFpbFwiKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgdGVsID0gbmV3IERlZmF1bHRMaW5rVHlwZShcInRlbFwiKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgc21zID0gbmV3IERlZmF1bHRMaW5rVHlwZShcInNtc1wiKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgb3RoZXIgPSBuZXcgRGVmYXVsdExpbmtUeXBlKFwib3RoZXJcIik7XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIodHlwZSk7XG5cbiAgICAgICAgdGhpcy5sYWJlbCA9IG5ldyBNZXNzYWdlUmVmKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3JcIiwgXCJsaW5rL3R5cGUvXCIgKyB0eXBlKTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ3d3dcIikge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBcInVybFwiO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwib3RoZXJcIikge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcInNtc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VHlwZSA9IFwic21zXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VHlwZSA9IHR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ3d3dcIikge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbGlkYXRvcnMgPSBbdXJsVmFsaWRhdG9yXTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRMYWJlbCA9IG5ldyBNZXNzYWdlUmVmKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3JcIiwgXCJsaW5rL1dlYiBwYWdlIHVybFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSBcImVtYWlsXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWxpZGF0b3JzID0gW1ZhbGlkYXRvcnMuZW1haWxdO1xuICAgICAgICAgICAgdGhpcy5pbnB1dExhYmVsID0gbmV3IE1lc3NhZ2VSZWYoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvclwiLCBcImxpbmsvRS1tYWlsIGFkZHJlc3NcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ0ZWxcIiB8fCB0eXBlID09PSBcInNtc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0TGFiZWwgPSBuZXcgTWVzc2FnZVJlZihcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yXCIsIFwibGluay9QaG9uZSBudW1iZXJcIik7XG4gICAgICAgICAgICB0aGlzLmlucHV0SGludCA9IG5ldyBNZXNzYWdlUmVmKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3JcIiwgXCJsaW5rL3Bob25lTnVtYmVySGludFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVhZG9ubHkgbGFiZWw6IE1lc3NhZ2VSZWY7XG5cbiAgICByZWFkb25seSBpbnB1dFR5cGU6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IGlucHV0VmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXTtcblxuICAgIHJlYWRvbmx5IGlucHV0Q29tcG9uZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgcmVhZG9ubHkgaW5wdXRMYWJlbDogTWVzc2FnZVJlZjtcblxuICAgIHJlYWRvbmx5IGlucHV0SGludDogTWVzc2FnZVJlZjtcblxuICAgIHVyaShmcm9tTGluazogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJ3d3dcIiB8fCB0aGlzLnR5cGUgPT09IFwib3RoZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21MaW5rO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJ0ZWxcIikge1xuICAgICAgICAgICAgcmV0dXJuIGB0ZWw6JHtmcm9tTGlua31gO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJzbXNcIikge1xuICAgICAgICAgICAgcmV0dXJuIGBzbXM6JHtmcm9tTGlua31gO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJlbWFpbFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYG1haWx0bzoke2Zyb21MaW5rfWA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJvbUxpbms7XG4gICAgfVxuXG59XG5cbmNvbnN0IHVybFZhbGlkYXRvclJlZ2V4ID0gL14oPzooPzooPzpodHRwcz98ZnRwKTopP1xcL1xcLykoPzpcXFMrKD86OlxcUyopP0ApPyg/Oig/ISg/OjEwfDEyNykoPzpcXC5cXGR7MSwzfSl7M30pKD8hKD86MTY5XFwuMjU0fDE5MlxcLjE2OCkoPzpcXC5cXGR7MSwzfSl7Mn0pKD8hMTcyXFwuKD86MVs2LTldfDJcXGR8M1swLTFdKSg/OlxcLlxcZHsxLDN9KXsyfSkoPzpbMS05XVxcZD98MVxcZFxcZHwyWzAxXVxcZHwyMlswLTNdKSg/OlxcLig/OjE/XFxkezEsMn18MlswLTRdXFxkfDI1WzAtNV0pKXsyfSg/OlxcLig/OlsxLTldXFxkP3wxXFxkXFxkfDJbMC00XVxcZHwyNVswLTRdKSl8KD86KD86W2EtejAtOVxcdTAwYTEtXFx1ZmZmZl1bYS16MC05XFx1MDBhMS1cXHVmZmZmXy1dezAsNjJ9KT9bYS16MC05XFx1MDBhMS1cXHVmZmZmXVxcLikrKD86W2EtelxcdTAwYTEtXFx1ZmZmZl17Mix9XFwuPykpKD86OlxcZHsyLDV9KT8oPzpbLz8jXVxcUyopPyQvaTtcblxuZnVuY3Rpb24gdXJsVmFsaWRhdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMge1xuXG4gICAgY29uc3QgdmFsdWUgPSBjb250cm9sLnZhbHVlO1xuXG4gICAgaWYgKHVybFZhbGlkYXRvclJlZ2V4LnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW52YWxpZFVybDogbmV3IE1lc3NhZ2VSZWYoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvclwiLCBcImxpbmsvaW52YWxpZFVybEVycm9yXCIpXG4gICAgfTtcbn1cbiJdfQ==