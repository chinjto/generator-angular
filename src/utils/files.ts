import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {SchematicContext} from "@angular-devkit/schematics";
import {Logger} from "./logger";

/**
 * Util class for basic files operations.
 */
export class Files {

    /**
     * Create a specified file.
     *
     * @param tree The tree where the file could be found
     * @param context The current schematic context
     * @param filePath The path of the file to create
     */
    static create(tree: Tree, context: SchematicContext, filePath: string) {
        if (!tree.exists(filePath)) {
            tree.create(filePath, "");
            Logger.debug(context, 'Files::create', `File "${filePath}" created.`);
        } else {
            Logger.warn(context, 'Files::create', `File "${filePath}" already exists`);
        }
    }

}
