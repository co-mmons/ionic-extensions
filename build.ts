import * as packager from "ng-packagr";
import {readJsonSync, writeJsonSync, removeSync} from "fs-extra";

const modules = [
    "buttons",
    "select",
    "scroll",

    "datetime-picker",
    "dialog",
    "expanding-searchbar",
    "form-helper",
    "helpers",
    "lazy-image",
    "image-loader",
    "ionic-fix",
    "loader",
    "modal",
    "popover",
    "pseudo-input",
    "spinner",
    "textarea-autosize",
    "toggle-labels"
];

(async () => {

    try {

        for (const module of modules) {

            try {
                await packager
                    .ngPackagr()
                    .forProject(`src/${module}/package.json`)
                    .withTsConfig("tsconfig.lib.json")
                    .build();
            } catch (error) {
                console.error(error);
                process.exit(0);
            }

            const json = readJsonSync(`dist/${module}/package.json`);
            for (const prop of ["main", "module", "es2015", "esm5", "esm2015", "fesm5", "fesm2015"]) {
                delete json[prop];
            }

            json["main"] = `esm2015/${module}-module.js`;

            writeJsonSync(`dist/${module}/package.json`, json);
            removeSync(`dist/${module}/esm5`);
        }

    } catch (error) {
        console.error(error);
        process.exit(0);
    }

})();
