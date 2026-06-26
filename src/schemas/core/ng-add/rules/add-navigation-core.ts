import {chain, mergeWith, Rule} from "@angular-devkit/schematics";
import {CoreServices} from "../../../../utils/core-services";
import {SchemaDeep} from "../../../../utils/templates";
import {Logger} from "../../../../utils/logger";

const LOG_SCOPE = 'Rules::ng-add::addNavigationCore';
const SERVICE_NAME = 'navigation';

/**
 * Rule for SEO core adds.<br>
 * <br>
 * actions :
 * <ul>
 *     <li>add navigation core service</li>
 *     <li>add navigation metadata interface</li>
 * </ul>
 * @return The rule definition.
 */
export function addNavigationCore(): Rule {
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
 * @return the rule definition.
 */
function finish(): Rule {
    return (_, context) => Logger.info(context, LOG_SCOPE, `Service ${SERVICE_NAME} created.`);
}
