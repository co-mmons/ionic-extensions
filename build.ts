import * as packager from "ng-packagr";
import * as yargs from "yargs";

const modules = [
    "buttons",
    "select",
    "ionic-fix",
    "view-observer",

    "back-button",
    "datetime-picker",
    "dialog",
    "expanding-searchbar",
    "form-helper",
    "helpers",
    "lazy-image",
    "lazy-load",
    "image-loader",
    "loader",
    "modal",
    "popover",
    "pseudo-input",
    "spinner",
    "textarea-autosize",
    "toggle-labels",
    "tags-input",
    "html-editor",
    "virtual-scroll-helper"
];

(async () => {

    try {

        for (const module of modules) {

            if (yargs.argv._.length > 0 && yargs.argv._[0] !== module) {
                continue;
            }

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
        }

    } catch (error) {
        console.error(error);
        process.exit(0);
    }

})();
