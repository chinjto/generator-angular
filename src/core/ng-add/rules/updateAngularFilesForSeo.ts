import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

const LOG_SCOPE = 'Rules::ng-add::updateAngularFilesForSeo';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li></li>
 * </ul>
 * @return The rule definition.
 */
export function updateAngularFilesForSeo(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        // TODO update all app.routes.ts entries with withSeoMetadata() wrapper
        // TODO inject SEO core service into app class
        return tree;
    }
}
