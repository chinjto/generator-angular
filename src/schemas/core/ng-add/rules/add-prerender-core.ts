import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

const LOG_SCOPE = 'Rules::ng-add::addPrerenderHelper';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li></li>
 * </ul>
 * @return The rule definition.
 */
export function addPrerenderCore(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // TODO copy pre-render core service
        // TODO copy app.routes.server.ts
        return tree;
    }
}
