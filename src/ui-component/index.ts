import {
    apply, applyTemplates,
    mergeWith,
    move,
    Rule,
    url,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

interface Options {
    name: string;
    type: 'page' | 'section' | 'card' | 'tile';
}

const NO_SUFFIX_TYPES = ["page"];

export function uiComponent(options: Options): Rule {
    return (tree, context) => {
        const basePaths = {
            page: 'src/app/pages',
            section: 'src/app/shared/components/sections',
            card: 'src/app/shared/components/cards',
            tile: 'src/app/shared/components/tiles',
        };

        const name = strings.dasherize(options.name);
        const className = generateClassName(options);
        const selector = `${options.type}-${name}`;
        const targetPath = `${basePaths[options.type]}/${name}`;

        context.logger.info(`Generating ${options.type} "${name}" in ${targetPath}`);

        const source = apply(url('../ui-component/files'), [
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
    const name = strings.classify(options.name);
    if (NO_SUFFIX_TYPES.includes(options.type)) {
        return name;
    }
    return name + strings.classify(options.type);
}
