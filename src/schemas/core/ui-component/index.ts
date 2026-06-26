import {chain, mergeWith, Rule, SchematicContext,} from '@angular-devkit/schematics';
import {Components} from "../../../utils/components";
import {Logger} from "../../../utils/logger";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

const LOG_SCOPE = "Rules::uiComponent";

interface Options {
    page?: string;
    name: string;
    type: 'page' | 'section' | 'card' | 'tile';
}

export function uiComponent(options: Options): Rule {
    return chain([
        createComponent(options),
        finish(options)
    ]);
}

/**
 * Rule for Component creation.
 *
 * @param options The schema options
 * @return the rule definition
 */
function createComponent(options: Options): Rule {
    return (tree, context) => {
        Logger.debug(context, LOG_SCOPE, `options: {page: "${options.page}", name: "${options.name}", type: "${options.type}"}`);
        const create = Components.create(context, options);
        return mergeWith(create)(tree, context);
    };
}

/**
 * Simple rule for end actions.
 *
 * @param options The schema options
 * @return the rule definition.
 */
function finish(options: Options): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        Logger.info(context, LOG_SCOPE, `Component ${options.type} "${options.name}" created.`);
    };
}
