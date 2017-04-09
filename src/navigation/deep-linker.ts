import { ComponentFactoryResolver } from "@angular/core";
import { Location } from "@angular/common";
import { App, UrlSerializer, DeepLinker as IonicDeepLinker } from "ionic-angular";
import { ModuleLoader } from "ionic-angular/util/module-loader";

export class DeepLinker extends IonicDeepLinker {

    navChange(direction: string) {
        super.navChange(direction);
    }
}

function setupDeepLinker(app: App, serializer: UrlSerializer, location: Location, moduleLoader: ModuleLoader, cfr: ComponentFactoryResolver) {
    const deepLinker = new DeepLinker(app, serializer, location, moduleLoader, cfr);
    deepLinker.init();
    return deepLinker;
}


export const deepLinkerProvider = {
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