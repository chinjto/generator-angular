import {chain, mergeWith, Rule, SchematicContext} from "@angular-devkit/schematics";
import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import {Logger} from "../../../../utils/logger";
import {CoreServices} from "../../../../utils/core-services";
import {SchemaDeep} from "../../../../utils/templates";

const LOG_SCOPE = 'Rules::ng-add::addSEOCore';
const SERVICE_NAME = 'seo';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li></li>
 * </ul>
 * @return The rule definition.
 */
export function addSeoCore(): Rule {
    return chain([
        createSeoCore,
        finish()
    ]);
}

function createSeoCore(): Rule {
    return (_, context) => mergeWith(
        CoreServices.create(context, SERVICE_NAME, SchemaDeep.deep1)
    );
}

/**
 * Simple rule for end actions.
 *
 * @return the rule definition.
 */
function finish(): Rule {
    return (_, context) => Logger.info(context, LOG_SCOPE, `Service ${SERVICE_NAME} created.`);
}
