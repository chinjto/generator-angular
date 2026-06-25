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
    const genIdx = process.argv.findIndex((a) => a === 'generate' || a === 'g');
    if (genIdx !== -1) {
        const positionals = process.argv
            .slice(genIdx + 2) // skip 'generate'/'g' and the schematic name
            .filter((a) => !a.startsWith('-'));
        if (positionals.length >= 1) options.page = positionals[0];
        if (positionals.length >= 2) options.name = positionals[1];
    }
    return uiComponent({
        ...options,
        type: 'section',
    });
}
