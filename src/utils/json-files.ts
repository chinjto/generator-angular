import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {SchematicContext} from "@angular-devkit/schematics";
import {Logger} from "./logger";
import {parse} from "jsonc-parser";
import {Files} from "./files";

/**
 * Util class for basic JSON files operations.
 */
export class JsonFiles extends Files {

    /**
     * Read the content on a specified file.
     *
     * @param tree The tree where the file could be found
     * @param context The current schematic context
     * @param filePath The path of the file to read
     * @return The JSON parsed file content
     */
    static read(tree: Tree, context: SchematicContext, filePath: string) {
        if (!tree.exists(filePath)) {
            Logger.error(context, 'JsonFiles::read', `File "${filePath}" not found.`);
            throw new ReferenceError(`File ${filePath} does not exist.`);
        }
        const content = tree.read(filePath);
        if (!content) {
            Logger.warn(context, 'JsonFiles::read', `File "${filePath}" found, but with empty content.`);
            return tree;
        }
        Logger.debug(context, 'JsonFiles::read', `File "${filePath}" readed.`);
        return parse(content.toString());
    }

    /**
     * Write a specified content into a specified file.
     *
     * @param tree The tree where the file could be found
     * @param context The current schematic context
     * @param filePath The path of the file to read
     * @param jsonContent The JSON content to write into the specified file.
     */
    static write(tree: Tree, context: SchematicContext, filePath: string, jsonContent: any) {
        Logger.debug(context, 'JsonFiles::write', `Writing new content into "${filePath}" file...`);
        tree.overwrite(filePath, JSON.stringify(jsonContent, null, 2));
        Logger.debug(context, 'JsonFiles::write', `New content written into "${filePath}" file.`);
    }

}
