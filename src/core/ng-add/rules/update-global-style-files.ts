import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {Rule, SchematicContext} from "@angular-devkit/schematics";
import {Logger} from "../../../utils/logger";
import {Scss} from "../../../utils/scss";

const LOG_SCOPE = 'Rules::ng-add::updateGlobalStyles';

const GLOBAL_SCSS_FILES = [
    '/src/styles.scss',
    '/src/app/app.scss'
];

/**
 * Rule for global SCSS files updates.<br>
 * <br>
 * actions :
 * <ul>
 *     <li>
 *         for each global css file :
 *         <ul>
 *             <li>get the file into angular project</li>
 *             <li>add use index</li>
 *             <li>save new content into the file</li>
 *         </ul>
 *     </li>
 * </ul>
 * @return The rule definition.
 */
export function updateGlobalStyleFiles(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        GLOBAL_SCSS_FILES.forEach((path) => updateStyleFile(tree, context, path));
        Logger.info(context, LOG_SCOPE, 'Injected "@use \'index\';" into all global style files.');
        return tree;
    }
}

/**
 * Update a scss file with generator rules
 *
 * @param tree
 * @param context
 * @param filePath
 */
function updateStyleFile(tree: Tree, context: SchematicContext, filePath: string) {
    if (!tree.exists(filePath)) {
        Logger.warn(context, LOG_SCOPE, `'Style file "${filePath}" doesn't exist.'`);
        return;
    }
    const buffer = tree.read(filePath);
    if (!buffer) {
        Logger.warn(context, LOG_SCOPE, `'Style file "${filePath}" isn't writable.'`);
        return;
    }
    const original = buffer.toString();
    const modified = Scss.ensureUseIndex(original);
    if (original !== modified) {
        tree.overwrite(filePath, modified);
    }
    Logger.debug(context, LOG_SCOPE, `'Injected "@use \'index\';" into "${filePath}" style file.'`);
}
