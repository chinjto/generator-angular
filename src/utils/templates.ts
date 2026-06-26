import {apply, applyTemplates, move, SchematicContext, Source, url} from "@angular-devkit/schematics";
import {strings} from "@angular-devkit/core";
import {Logger} from "./logger";

export enum SchemaDeep {
    deep1=1,
    deep2=2
}

const TEMPLATE_ROOT = {
    1: '../../../templates',
    2: '../../../../templates'
}

/**
 * Util class for templates operations.
 */
export class Templates {

    /**
     * Copy a specified templates folder
     *
     * @param context The current schematic context
     * @param schemaDeep The actif schema deep from root
     * @param templatesSrc The specified templates folder path
     * @param templatesTarget The specified templates folder path
     * @param options The applyTemplates options
     */
    static copy(context: SchematicContext, schemaDeep: SchemaDeep, templatesSrc: string, templatesTarget: string, options: any): Source {
        const srcPath = `${TEMPLATE_ROOT[schemaDeep]}/${templatesSrc}`;
        const targetPath = `src/${templatesTarget}`;
        Logger.debug(context, 'Templates::copy', `data{srcPath: "${srcPath}", targetPath: "${targetPath}"}`);
        return apply(url(srcPath), [
            applyTemplates({...strings, ...options}),
            move(targetPath),
        ]);
    }

}
