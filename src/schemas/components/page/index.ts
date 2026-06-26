import { Rule } from '@angular-devkit/schematics';
import { uiComponent } from '../../core/ui-component';

interface Options {
    name: string;
}

export function page(options: Options): Rule {
    return uiComponent({
        ...options,
        type: 'page',
    });
}
