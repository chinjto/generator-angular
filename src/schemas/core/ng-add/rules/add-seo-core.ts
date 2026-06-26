import {chain, mergeWith, Rule} from "@angular-devkit/schematics";
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
 *     <li>add SEO core service</li>
 *     <li>add SEO metadata interface</li>
 * </ul>
 * @return The rule definition.
 */
export function addSeoCore(): Rule {
    return chain([
        createCore,
        finish()
    ]);
}

/**
 * Creation of the core service and its metadata.
 *
 * @return the rule definition
 */
function createCore(): Rule {
    return (_, context) => mergeWith(
        CoreServices.create(context, SERVICE_NAME, SchemaDeep.deep1)
    );
}

/**
 * Simple rule for end actions.
 *
 * @return the rule definition
 */
function finish(): Rule {
    return (_, context) => Logger.info(context, LOG_SCOPE, `Service ${SERVICE_NAME} created.`);
}
