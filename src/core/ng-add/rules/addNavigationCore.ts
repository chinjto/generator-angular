import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

const LOG_SCOPE = 'Rules::ng-add::addNavigationCore';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li></li>
 * </ul>
 * @return The rule definition.
 */
export function addNavigationCore(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // TODO copy navigation core service
        // TODO copy navigation metadata
        return tree;
    }
}
