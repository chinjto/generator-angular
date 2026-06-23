import {
    Rule,
    Tree,
    SchematicContext
} from '@angular-devkit/schematics';

export function ngAdd(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Installing generator-angular');

        const angularJsonPath = '/angular.json';

        if (!tree.exists(angularJsonPath)) {
            context.logger.error('angular.json not found');
            return tree;
        }

        const content = tree.read(angularJsonPath);

        if (!content) {
            return tree;
        }

        const angularJson = JSON.parse(content.toString());

        angularJson.cli ??= {};
        angularJson.cli.schematicCollections ??= [];

        if (
            !angularJson.cli.schematicCollections.includes(
                '@chinjto/generator-angular'
            )
        ) {
            angularJson.cli.schematicCollections.unshift(
                '@chinjto/generator-angular'
            );
        }

        tree.overwrite(
            angularJsonPath,
            JSON.stringify(angularJson, null, 2)
        );

        context.logger.info(
            'Added @chinjto/generator-angular to schematicCollections'
        );

        return tree;
    };
}
