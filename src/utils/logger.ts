import c from 'ansi-colors';
import {SchematicContext} from "@angular-devkit/schematics";

export class Logger {

    static isDebug: boolean = false;

    static info(context: SchematicContext, scope: string, message: string): void {
        context.logger.info(`${c.green('[INFO]')} [${scope}] ${message}`);
    }

    static warn(context: SchematicContext, scope: string, message: string): void {
        context.logger.warn(`${c.yellow('[WARN]')} [${scope}] ${message}`);
    }

    static error(context: SchematicContext, scope: string, message: string): void {
        context.logger.error(`${c.red('[ERROR]')} [${scope}] ${message}`);
    }

    static debug(context: SchematicContext, scope: string, message: string): void {
        if (this.isDebug) {
            context.logger.info(`${c.cyan('[DEBUG]')} [${scope}] ${message}`);
        }
    }

}
