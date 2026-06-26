import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {parse} from "jsonc-parser";
import {Logger} from "../../../../utils/logger";
import {JsonFiles} from "../../../../utils/json-files";

const LOG_SCOPE = 'Rules::ng-add::updateAngularJson';
const ANGULAR_JSON_PATH = '/angular.json';

/**
 * Rule for angular.json file updates.<br>
 * <br>
 * actions :
 * <ul>
 *     <li>get angular.json into angular project</li>
 *     <li>add generator CLI collection into angular.json</li>
 *     <li>add shared styles into angular.json</li>
 *     <li>save new content into angular.json file</li>
 * </ul>
 * @return The rule definition.
 */
export function updateAngularJson(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        Logger.info(context, LOG_SCOPE, 'Update angular.json configuration...');
        const angularJsonContent = JsonFiles.read(tree, context, ANGULAR_JSON_PATH);
        addGeneratorCLI(context, angularJsonContent);
        addSharedStyles(context, angularJsonContent);
        JsonFiles.write(tree, context, ANGULAR_JSON_PATH, angularJsonContent)
        Logger.info(context, LOG_SCOPE, 'File angular.json updated.');
        return tree;
    }
}

/**
 * Get the angular.json file
 *
 * @param tree The tree where the angular.json could be found
 * @param context The current schematic context
 *
 * @return The JSON parsed file content
 */
function getFile(tree: Tree, context: SchematicContext) {
    // Récupération du fichier
    if (!tree.exists(ANGULAR_JSON_PATH)) {
        Logger.error(context, LOG_SCOPE, 'File angular.json not found.');
        return tree;
    }
    const content = tree.read(ANGULAR_JSON_PATH);
    if (!content) {
        return tree;
    }
    Logger.info(context, LOG_SCOPE, 'File "angular.json" found.');
    return parse(content.toString());
}

/**
 * Add the CLI collection into the specified angular.json file
 *
 * @param angularJson The angular.json file content
 * @param context The current schematic context
 */
function addGeneratorCLI(context: SchematicContext, angularJson: any) {
    angularJson.cli ??= {};
    angularJson.cli.schematicCollections ??= [];
    if (!angularJson.cli.schematicCollections.includes('@chinjto/generator-angular')) {
        angularJson.cli.schematicCollections.unshift('@chinjto/generator-angular');
    }
    Logger.info(context, LOG_SCOPE, 'Added "@chinjto/generator-angular" to "schematicCollections".');
}

/**
 * Add the shared styles into the specified angular.json file
 *
 * @param angularJson The angular.json file content
 * @param context The current schematic context
 */
function addSharedStyles(context: SchematicContext, angularJson: any) {
    Logger.debug(context, LOG_SCOPE, 'Looping into all declared projects...');
    for (const projectName of Object.keys(angularJson.projects ?? {})) {
        Logger.debug(context, LOG_SCOPE, `Working on "${projectName}" project...`);
        const project = angularJson.projects[projectName];
        const options = project?.architect?.build?.options;
        if (!options) {
            Logger.warn(context, LOG_SCOPE, `No build option found in "${projectName}" project.`);
            continue;
        }
        options.stylePreprocessorOptions ??= {};
        options.stylePreprocessorOptions.includePaths ??= [];
        const includePaths = options.stylePreprocessorOptions.includePaths;
        if (!includePaths.includes('src/app/shared/styles')) {
            includePaths.push('src/app/shared/styles');
        }
        Logger.info(context, LOG_SCOPE, `Added shared styles into stylePreprocessorOptions[${projectName}]`);
    }
    Logger.info(context, LOG_SCOPE, 'Added shared styles into all found stylePreprocessorOptions');
}
