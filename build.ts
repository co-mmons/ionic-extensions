import * as packager from "ng-packagr";
import * as yargs from "yargs";

const modules = [
    "buttons",
    "select",
    "scroll",
    "ionic-fix",

    "back-button",
    "datetime-picker",
    "dialog",
    "expanding-searchbar",
    "form-helper",
    "helpers",
    "lazy-image",
    "image-loader",
    "lazy-load",
    "loader",
    "modal",
    "popover",
    "pseudo-input",
    "spinner",
    "textarea-autosize",
    "toggle-labels",
    "html-editor"
];

const argv = yargs
    .option("module", {description: "Extension module to be build"})
    .argv;

(async () => {

    try {

        for (const module of modules) {

            if (argv.module && argv.module !== module) {
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
