var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ComponentFactoryResolver } from "@angular/core";
import { Location } from "@angular/common";
import { App, UrlSerializer, DeepLinker as IonicDeepLinker } from "ionic-angular";
import { ModuleLoader } from "ionic-angular/util/module-loader";
var DeepLinker = /** @class */ (function (_super) {
    __extends(DeepLinker, _super);
    function DeepLinker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeepLinker.prototype.navChange = function (direction) {
        _super.prototype.navChange.call(this, direction);
    };
    return DeepLinker;
}(IonicDeepLinker));
export { DeepLinker };
function setupDeepLinker(app, serializer, location, moduleLoader, cfr) {
    var deepLinker = new DeepLinker(app, serializer, location, moduleLoader, cfr);
    deepLinker.init();
    return deepLinker;
}
export var deepLinkerProvider = {
    provide: IonicDeepLinker,
    useFactory: setupDeepLinker,
    deps: [
        App,
        UrlSerializer,
        Location,
        ModuleLoader,
        ComponentFactoryResolver
    ]
};
//# sourceMappingURL=deep-linker.js.map