import {Rule, SchematicContext} from '@angular-devkit/schematics';
import {Tree} from "@angular-devkit/schematics/src/tree/interface";

interface Options {
    name: string;
}

export function style(options: Options): Rule {
    const name = options.name;
    return (tree: Tree, context: SchematicContext) => {
        const basePath = 'src/app/shared/styles';
        // Création du fichier
        const newScssPath = `${basePath}/_${name}.scss`;
        context.logger.info(`Generating _${name}.scss in ${basePath}`);
        if (!tree.exists(newScssPath)) {
            tree.create(newScssPath, "");
        }
        // Ajout dans _index.scss
        const indexPath = `${basePath}/_index.scss`;
        const oldIndexContent = tree.read(indexPath).toString();
        const line = `@forward '${name}';`;
        const newIndexContent = oldIndexContent.includes(line) ? oldIndexContent : `${oldIndexContent}${line}\n`;
        tree.overwrite(indexPath, newIndexContent);
        return tree;
    };
}
