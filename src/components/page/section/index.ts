import { Rule } from '@angular-devkit/schematics';
import { uiComponent } from '../../../core/ui-component';

interface Options {
    page: string;
    name: string;
}

export function pageSection(options: Options): Rule {
    return uiComponent({
        ...options,
        type: 'section',
    });
}
