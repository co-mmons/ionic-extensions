import { ComponentFactoryResolver } from "@angular/core";
import { Location } from "@angular/common";
import { App, UrlSerializer, DeepLinker as IonicDeepLinker } from "ionic-angular";
import { ModuleLoader } from "ionic-angular/util/module-loader";
export declare class DeepLinker extends IonicDeepLinker {
    navChange(direction: string): void;
}
export declare const deepLinkerProvider: {
    provide: typeof IonicDeepLinker;
    useFactory: (app: App, serializer: UrlSerializer, location: Location, moduleLoader: ModuleLoader, cfr: ComponentFactoryResolver) => DeepLinker;
    deps: (typeof ComponentFactoryResolver | typeof Location | typeof App | typeof ModuleLoader | typeof UrlSerializer)[];
};
