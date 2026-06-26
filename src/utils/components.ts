import {SchematicContext, Source} from "@angular-devkit/schematics";
import {strings} from "@angular-devkit/core";
import {SchemaDeep, Templates} from "./templates";

interface Component {
    page?: string;
    name: string;
    type: 'page' | 'section' | 'card' | 'tile';
}

interface TemplatesData {
    name: string;
    className: string;
    selector: string;
    targetPath: string;
    schemaDeep: SchemaDeep;
}

const NO_SUFFIX_TYPES = ["page"];

const basePaths = {
    page: 'app/pages',
    section: 'app/shared/components/sections',
    card: 'app/shared/components/cards',
    tile: 'app/shared/components/tiles',
};

const COMPONENTS_TEMPLATES_PATH = 'app/shared/components/ui-component';

/**
 * Util class for components operations.
 */
export class Components {

    static create(context: SchematicContext, component: Component): Source {
        const templatesData = toTemplatesData(component);
        const templatesOptions = {name: templatesData.name, className: templatesData.className, selector: templatesData.selector, type: component.type}
        return Templates.copy(context, templatesData.schemaDeep, COMPONENTS_TEMPLATES_PATH, templatesData.targetPath, templatesOptions);
    }

}

function toTemplatesData(component: Component): TemplatesData {
    const dasherizedName= strings.dasherize(component.name);
    if (component.page) {
        return {
            name: dasherizedName,
            className: generateClassName(component),
            selector: `page-${component.page}-${component.type}-${dasherizedName}`,
            targetPath: `${basePaths["page"]}/${strings.dasherize(component.page)}/${dasherizedName}`,
            schemaDeep: SchemaDeep.deep2
        };
    }
    return {
        name: dasherizedName,
        className: generateClassName(component),
        selector: `${component.type}-${dasherizedName}`,
        targetPath: `${basePaths[component.type]}/${dasherizedName}`,
        schemaDeep: SchemaDeep.deep1
    };
}

function generateClassName(component: Component): string {
    const name = strings.classify(component.name);
    const page = component.page ? strings.classify(component.page) : '';
    const type = isExcludedType(component.type) ? strings.classify(component.type) : "";
    return `${name}${page}${type}`;
}

function isExcludedType(type: string) {
    return !NO_SUFFIX_TYPES.includes(type);
}
