import { Rule } from '@angular-devkit/schematics';
import { uiComponent } from '../../core/ui-component';

interface Options {
    name: string;
}

export function card(options: Options): Rule {
    return uiComponent({
        ...options,
        type: 'card',
    });
}
