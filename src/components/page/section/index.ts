import { Rule } from '@angular-devkit/schematics';
import { uiComponent } from '../../../core/ui-component';

// Minimal declaration to access process.argv without importing the full @types/node globally.
declare const process: { argv: readonly string[] };

interface Options {
    page: string;
    name: string;
}

export function pageSection(options: Options): Rule {
    // Angular CLI assigns positional arguments alphabetically by schema property name,
    // ignoring the `index` field in `$default.$source: argv`.
    // Since 'name' (n) sorts before 'page' (p), the CLI would incorrectly assign
    // name=<first_arg> and page=<second_arg> for `ng g page-section <page> <name>`.
    // We fix this by reading positional args directly from process.argv.
    // Named args (--page=foo --name=bar) are unaffected because they start with '-'
    // and are excluded by the filter, leaving the options object unchanged.
    const argv = process.argv;
    // Locate the schematic name to avoid misinterpreting flags before it (e.g. --dry-run).
    const schematicIdx = argv.findIndex(
        (a) => a === 'page-section' || a.endsWith(':page-section')
    );
    if (schematicIdx !== -1) {
        const positionals = argv
            .slice(schematicIdx + 1)
            .filter((a) => !a.startsWith('-'));
        if (positionals.length >= 1) options.page = positionals[0];
        if (positionals.length >= 2) options.name = positionals[1];
    }
    return uiComponent({
        ...options,
        type: 'section',
    });
}
