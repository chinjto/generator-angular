import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

const LOG_SCOPE = 'Rules::ng-add::addSEOCore';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li></li>
 * </ul>
 * @return The rule definition.
 */
export function addSeoCore(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // TODO copy SEO core service
        // TODO copy SEO metadata
        return tree;
    }
}
