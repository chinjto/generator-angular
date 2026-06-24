import {
    apply, applyTemplates,
    mergeWith,
    move,
    Rule,
    url,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import {page} from "../../components/page";

interface Options {
    page?: string;
    name: string;
    type: 'page' | 'section' | 'card' | 'tile';
}

const NO_SUFFIX_TYPES = ["page"];

const basePaths = {
    page: 'src/app/pages',
    section: 'src/app/shared/components/sections',
    card: 'src/app/shared/components/cards',
    tile: 'src/app/shared/components/tiles',
};

export function uiComponent(options: Options): Rule {
    return (tree, context) => {
        context.logger.info(`options: {page: "${options.page}", name: "${options.name}", type: "${options.type}"}`);
        let filesPath;
        let name;
        let className;
        let selector;
        let targetPath;
        if (options.page) {
            filesPath = '../../../core/ui-component/files';
            const page = strings.dasherize(options.page);
            name = strings.dasherize(options.name);
            className = generateClassName(options);
            selector = `page-${options.page}-${options.type}-${name}`;
            targetPath = `${basePaths["page"]}/${page}/${name}`;
        } else {
            filesPath = '../../core/ui-component/files';
            name = strings.dasherize(options.name);
            className = generateClassName(options);
            selector = `${options.type}-${name}`;
            targetPath = `${basePaths[options.type]}/${name}`;
        }

        context.logger.info(`Generating ${options.type} "${name}" in ${targetPath}`);

        const source = apply(url(filesPath), [
            applyTemplates({
                ...strings,
                name,
                className,
                selector,
                type: options.type,
            }),
            move(targetPath),
        ]);

        return mergeWith(source)(tree, context);
    };
}

function generateClassName(options: Options): string {
    let className = "";
    const name = strings.classify(options.name);
    className += name;
    if (!options.page) {
        const page = strings.classify(options.name);
        className += page;
    }
    if (!NO_SUFFIX_TYPES.includes(options.type)) {
        const type = strings.classify(options.type);
        className += type;
    }
    return className;
}
