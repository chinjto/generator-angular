import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

const LOG_SCOPE = 'Rules::ng-add::updateAngularFilesForPreRender';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li></li>
 * </ul>
 * @return The rule definition.
 */
export function updateAngularFilesForPreRender(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // TODO inject app.routes.server.ts into app.config.server.ts with @angular/ssr/withRoutes() wrapper
        return tree;
    }
}
