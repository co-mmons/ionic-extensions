import * as tslib_1 from "tslib";
import { Validators } from "@angular/forms";
import { MessageRef } from "@co.mmons/js-intl";
var LinkType = /** @class */ (function () {
    function LinkType(type) {
        this.type = type;
    }
    LinkType.prototype.toString = function () {
        return this.type;
    };
    return LinkType;
}());
export { LinkType };
var DefaultLinkType = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultLinkType, _super);
    function DefaultLinkType(type) {
        var _this = _super.call(this, type) || this;
        _this.inputComponent = undefined;
        _this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/type/" + type);
        if (type === "www") {
            _this.inputType = "url";
        }
        else if (type === "other") {
            _this.inputType = "text";
        }
        else if (type === "sms") {
            _this.inputType = "sms";
        }
        else {
            _this.inputType = type;
        }
        if (type === "www") {
            _this.inputValidators = [urlValidator];
            _this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Web page url");
        }
        if (type === "email") {
            _this.inputValidators = [Validators.email];
            _this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/E-mail address");
        }
        if (type === "tel" || type === "sms") {
            _this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Phone number");
            _this.inputHint = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/phoneNumberHint");
        }
        return _this;
    }
    DefaultLinkType.prototype.uri = function (fromLink) {
        if (this.type === "www" || this.type === "other") {
            return fromLink;
        }
        else if (this.type === "tel") {
            return "tel:" + fromLink;
        }
        else if (this.type === "sms") {
            return "sms:" + fromLink;
        }
        else if (this.type === "email") {
            return "mailto:" + fromLink;
        }
        return fromLink;
    };
    DefaultLinkType.www = new DefaultLinkType("www");
    DefaultLinkType.email = new DefaultLinkType("email");
    DefaultLinkType.tel = new DefaultLinkType("tel");
    DefaultLinkType.sms = new DefaultLinkType("sms");
    DefaultLinkType.other = new DefaultLinkType("other");
    return DefaultLinkType;
}(LinkType));
export { DefaultLinkType };
var urlValidatorRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
function urlValidator(control) {
    var value = control.value;
    if (urlValidatorRegex.test(value)) {
        return undefined;
    }
    return {
        invalidUrl: new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/invalidUrlError")
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay10eXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJsaW5rLXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBaUQsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTdDO0lBRUksa0JBQXNDLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQ2xELENBQUM7SUFnQkQsMkJBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7O0FBRUQ7SUFBcUMsMkNBQVE7SUFRekMseUJBQVksSUFBWTtRQUF4QixZQUNJLGtCQUFNLElBQUksQ0FBQyxTQTRCZDtRQVNRLG9CQUFjLEdBQUcsU0FBUyxDQUFDO1FBbkNoQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLHdDQUF3QyxFQUFFLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUUzRixJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDaEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDMUI7YUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDekIsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDM0I7YUFBTSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDMUI7YUFBTTtZQUNILEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ2hCLEtBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLHdDQUF3QyxFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDbkc7UUFFRCxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDbEIsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLHdDQUF3QyxFQUFFLHFCQUFxQixDQUFDLENBQUM7U0FDckc7UUFFRCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtZQUNsQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLHdDQUF3QyxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDaEcsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyx3Q0FBd0MsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3JHOztJQUNMLENBQUM7SUFlRCw2QkFBRyxHQUFILFVBQUksUUFBZ0I7UUFFaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUM5QyxPQUFPLFFBQVEsQ0FBQztTQUNuQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxTQUFPLFFBQVUsQ0FBQztTQUM1QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxTQUFPLFFBQVUsQ0FBQztTQUM1QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDOUIsT0FBTyxZQUFVLFFBQVUsQ0FBQztTQUMvQjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUEvRGUsbUJBQUcsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxxQkFBSyxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLG1CQUFHLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsbUJBQUcsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxxQkFBSyxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBNkR6RCxzQkFBQztDQUFBLEFBbkVELENBQXFDLFFBQVEsR0FtRTVDO1NBbkVZLGVBQWU7QUFxRTVCLElBQU0saUJBQWlCLEdBQUcseWFBQXlhLENBQUM7QUFFcGMsU0FBUyxZQUFZLENBQUMsT0FBd0I7SUFFMUMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUU1QixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMvQixPQUFPLFNBQVMsQ0FBQztLQUNwQjtJQUVELE9BQU87UUFDSCxVQUFVLEVBQUUsSUFBSSxVQUFVLENBQUMsd0NBQXdDLEVBQUUsc0JBQXNCLENBQUM7S0FDL0YsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtNZXNzYWdlUmVmfSBmcm9tIFwiQGNvLm1tb25zL2pzLWludGxcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpbmtUeXBlIHtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IGxhYmVsKCk6IE1lc3NhZ2VSZWY7XG5cbiAgICBhYnN0cmFjdCBnZXQgaW5wdXRUeXBlKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldCBpbnB1dENvbXBvbmVudCgpOiBhbnk7XG5cbiAgICBhYnN0cmFjdCBnZXQgaW5wdXRWYWxpZGF0b3JzKCk6IFZhbGlkYXRvckZuW107XG5cbiAgICBhYnN0cmFjdCBnZXQgaW5wdXRIaW50KCk6IE1lc3NhZ2VSZWY7XG5cbiAgICBhYnN0cmFjdCBnZXQgaW5wdXRMYWJlbCgpOiBNZXNzYWdlUmVmO1xuXG4gICAgYWJzdHJhY3QgdXJpKGZyb21MaW5rOiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TGlua1R5cGUgZXh0ZW5kcyBMaW5rVHlwZSB7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgd3d3ID0gbmV3IERlZmF1bHRMaW5rVHlwZShcInd3d1wiKTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgZW1haWwgPSBuZXcgRGVmYXVsdExpbmtUeXBlKFwiZW1haWxcIik7XG4gICAgc3RhdGljIHJlYWRvbmx5IHRlbCA9IG5ldyBEZWZhdWx0TGlua1R5cGUoXCJ0ZWxcIik7XG4gICAgc3RhdGljIHJlYWRvbmx5IHNtcyA9IG5ldyBEZWZhdWx0TGlua1R5cGUoXCJzbXNcIik7XG4gICAgc3RhdGljIHJlYWRvbmx5IG90aGVyID0gbmV3IERlZmF1bHRMaW5rVHlwZShcIm90aGVyXCIpO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSBuZXcgTWVzc2FnZVJlZihcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yXCIsIFwibGluay90eXBlL1wiICsgdHlwZSk7XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwid3d3XCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRUeXBlID0gXCJ1cmxcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIm90aGVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRUeXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJzbXNcIikge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSBcInNtc1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFR5cGUgPSB0eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwid3d3XCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWxpZGF0b3JzID0gW3VybFZhbGlkYXRvcl07XG4gICAgICAgICAgICB0aGlzLmlucHV0TGFiZWwgPSBuZXcgTWVzc2FnZVJlZihcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yXCIsIFwibGluay9XZWIgcGFnZSB1cmxcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJlbWFpbFwiKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsaWRhdG9ycyA9IFtWYWxpZGF0b3JzLmVtYWlsXTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRMYWJlbCA9IG5ldyBNZXNzYWdlUmVmKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3JcIiwgXCJsaW5rL0UtbWFpbCBhZGRyZXNzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwidGVsXCIgfHwgdHlwZSA9PT0gXCJzbXNcIikge1xuICAgICAgICAgICAgdGhpcy5pbnB1dExhYmVsID0gbmV3IE1lc3NhZ2VSZWYoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvclwiLCBcImxpbmsvUGhvbmUgbnVtYmVyXCIpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhpbnQgPSBuZXcgTWVzc2FnZVJlZihcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yXCIsIFwibGluay9waG9uZU51bWJlckhpbnRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJlYWRvbmx5IGxhYmVsOiBNZXNzYWdlUmVmO1xuXG4gICAgcmVhZG9ubHkgaW5wdXRUeXBlOiBzdHJpbmc7XG5cbiAgICByZWFkb25seSBpbnB1dFZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW107XG5cbiAgICByZWFkb25seSBpbnB1dENvbXBvbmVudCA9IHVuZGVmaW5lZDtcblxuICAgIHJlYWRvbmx5IGlucHV0TGFiZWw6IE1lc3NhZ2VSZWY7XG5cbiAgICByZWFkb25seSBpbnB1dEhpbnQ6IE1lc3NhZ2VSZWY7XG5cbiAgICB1cmkoZnJvbUxpbms6IHN0cmluZykge1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwid3d3XCIgfHwgdGhpcy50eXBlID09PSBcIm90aGVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tTGluaztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwidGVsXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBgdGVsOiR7ZnJvbUxpbmt9YDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwic21zXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBgc21zOiR7ZnJvbUxpbmt9YDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwiZW1haWxcIikge1xuICAgICAgICAgICAgcmV0dXJuIGBtYWlsdG86JHtmcm9tTGlua31gO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyb21MaW5rO1xuICAgIH1cblxufVxuXG5jb25zdCB1cmxWYWxpZGF0b3JSZWdleCA9IC9eKD86KD86KD86aHR0cHM/fGZ0cCk6KT9cXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXowLTlcXHUwMGExLVxcdWZmZmZdW2EtejAtOVxcdTAwYTEtXFx1ZmZmZl8tXXswLDYyfSk/W2EtejAtOVxcdTAwYTEtXFx1ZmZmZl1cXC4pKyg/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfVxcLj8pKSg/OjpcXGR7Miw1fSk/KD86Wy8/I11cXFMqKT8kL2k7XG5cbmZ1bmN0aW9uIHVybFZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcblxuICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcblxuICAgIGlmICh1cmxWYWxpZGF0b3JSZWdleC50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGludmFsaWRVcmw6IG5ldyBNZXNzYWdlUmVmKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3JcIiwgXCJsaW5rL2ludmFsaWRVcmxFcnJvclwiKVxuICAgIH07XG59XG4iXX0=