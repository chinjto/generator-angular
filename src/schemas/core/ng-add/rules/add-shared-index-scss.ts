import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Files} from "../../../../utils/files";
import {Logger} from "../../../../utils/logger";

const LOG_SCOPE = 'Rules::ng-add::addSharedIndexScss';
const INDEX_SCSS_PATH = '/src/app/shared/styles/_index.scss';

/**
 * Rule for shared _index.scss add.<br>
 * <br>
 * actions :
 * <ul>
 *     <li>create _index.scss shared styles</li>
 * </ul>
 * @return The rule definition.
 */
export function addSharedIndexScss() : Rule {
    return (tree: Tree, context: SchematicContext) => {
        Files.create(tree, context, INDEX_SCSS_PATH);
        Logger.info(context, LOG_SCOPE, 'Shared index created.');
        return tree;
    }
}
