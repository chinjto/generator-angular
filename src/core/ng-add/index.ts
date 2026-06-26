import {chain, Rule, SchematicContext} from '@angular-devkit/schematics';
import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {Logger} from "../../utils/logger";
import {updateAngularJson} from "./rules/update-angular-json";
import {updateTsConfigPaths} from "./rules/update-tsconfig-paths";
import {addSharedIndexScss} from "./rules/add-shared-index-scss";
import {updateGlobalStyleFiles} from "./rules/update-global-style-files";
import {addSeoCore} from "./rules/addSeoCore";
import {addNavigationCore} from "./rules/addNavigationCore";
import {addPrerenderCore} from "./rules/addPrerenderCore";
import {updateAngularFilesForSeo} from "./rules/updateAngularFilesForSeo";
import {updateAngularFilesForNavigation} from "./rules/updateAngularFilesForNavigation";
import {updateAngularFilesForPreRender} from "./rules/updateAngularFilesForPreRender";

const LOG_SCOPE = 'Rules::ng-add::core';

/**
 * Meta rule needed on ng add call.<br>
 * <br>
 * Composed of different chained rules.
 * @return A rule that contains all rules to run on ng add call.
 */
export function ngAdd(): Rule {
    return chain([
        startInstall(),
        // Global rules
        updateAngularJson(),
        updateTsConfigPaths(),
        // SCSS rules
        addSharedIndexScss(),
        updateGlobalStyleFiles(),
        // Routing rules
        addSeoCore(),
        addNavigationCore(),
        addPrerenderCore(),
        updateAngularFilesForSeo(),
        updateAngularFilesForNavigation(),
        updateAngularFilesForPreRender(),
        finishInstall(),
    ]);
    // TODO update page generator to add generated pages into app.routes.ts
}

/**
 * Simple rule for beginning actions.
 *
 * @return The rule definition.
 */
function startInstall(): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        Logger.info(context, LOG_SCOPE, 'Installing "@chinjto/generator-angular"...');
    };
}

/**
 * Simple rule for end actions.
 *
 * @return the rule definition.
 */
function finishInstall(): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        Logger.info(context, LOG_SCOPE, '"@chinjto/generator-angular" installed with success.');
    };
}
