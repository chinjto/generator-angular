import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Logger} from "../../../../utils/logger";
import {JsonFiles} from "../../../../utils/json-files";

const LOG_SCOPE = 'Rules::ng-add::updateTsConfigPaths';
const TS_CONFIG_JSON_PATH = '/tsconfig.json';

/**
 * Rule for ts-config.json paths updates.<br>
 * <br>
 * actions :
 * <ul>
 *     <li>get angular.json into angular project</li>
 *     <li>add custom paths aliases</li>
 *     <li>save new content into angular.json file</li>
 * </ul>
 * @return The rule definition.
 */
export function updateTsConfigPaths(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        Logger.info(context, LOG_SCOPE, 'Update ts-config.json paths...');
        const tsConfigContent = JsonFiles.read(tree, context, TS_CONFIG_JSON_PATH);
        addCustomPathsAliases(context, tsConfigContent);
        JsonFiles.write(tree, context, TS_CONFIG_JSON_PATH, tsConfigContent);
        Logger.info(context, LOG_SCOPE, 'ts-config.json paths updated.');
        return tree;
    }
}

function addCustomPathsAliases(context: SchematicContext, tsconfig: any) {
    tsconfig.compilerOptions ??= {};
    tsconfig.compilerOptions.baseUrl ??= './src';
    tsconfig.compilerOptions.paths ??= {};
    const paths = tsconfig.compilerOptions.paths;
    const aliases = {
        '@app/*': ['app/*'],
        '@core/*': ['app/core/*'],
        '@shared/*': ['app/shared/*'],
        '@pages/*': ['app/pages/*'],
        '@sections/*': ['app/shared/components/sections/*'],
        '@cards/*': ['app/shared/components/cards/*'],
        '@tiles/*': ['app/shared/components/tiles/*']
    };
    for (const [alias, value] of Object.entries(aliases)) {
        paths[alias] = value;
        Logger.debug(context, LOG_SCOPE, `Alias "${alias}":"${value}" added into ts-config.json paths aliases.`);
    }
    Logger.info(context, LOG_SCOPE, 'Paths aliases added into ts-config.json.');
}
