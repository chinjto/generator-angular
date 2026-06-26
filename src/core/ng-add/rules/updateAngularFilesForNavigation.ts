import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

const LOG_SCOPE = 'Rules::ng-add::updateAngularFilesForNavigation';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li></li>
 * </ul>
 * @return The rule definition.
 */
export function updateAngularFilesForNavigation(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // TODO update all app.routes.ts entries with withNavigationMetadata() wrapper
        return tree;
    }
}
