import {SchematicContext, Source} from "@angular-devkit/schematics";
import {strings} from "@angular-devkit/core";
import {SchemaDeep, Templates} from "./templates";

const CORE_SERVICES_ROOT = 'app/core';

/**
 * Util class for core services operations.
 */
export class CoreServices {

    /**
     * Create a specified core service by copying this service template<br>
     * <br>
     * The speficied service needs to be present into /src/templates/app/core
     * @param context The current schematic context
     * @param serviceName The name of the core service to create
     * @param schemaDeep The deep of the calling schema
     */
    static create(context: SchematicContext, serviceName: string, schemaDeep: SchemaDeep): Source {
        const name = strings.dasherize(serviceName);
        const className = strings.classify(serviceName);
        const selector = `${name}`;
        const options = {name, className, selector}
        const templatePath = `${CORE_SERVICES_ROOT}/${serviceName}`;
        return Templates.copy(context, schemaDeep, templatePath, templatePath, options);
    }

}
