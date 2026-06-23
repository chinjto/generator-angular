import { Rule } from '@angular-devkit/schematics';
import { uiComponent } from '../ui-component';

interface Options {
    name: string;
}

export function section(options: Options): Rule {
    return uiComponent({
        ...options,
        type: 'section',
    });
}
