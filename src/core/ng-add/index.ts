import {Rule, SchematicContext} from '@angular-devkit/schematics';
import {Tree} from "@angular-devkit/schematics/src/tree/interface";
import { parse } from 'jsonc-parser';

export function ngAdd(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Installing generator-angular');
        updateAngularJson(tree, context);
        updateTsConfigPaths(tree, context);
        addSharedIndexScss(tree, context);
        updateGlobalStyles(tree, context);
        return tree;
    };
}
function updateAngularJson(tree: Tree, context: SchematicContext) {
    // Récupération du fichier
    const angularJsonPath = '/angular.json';
    if (!tree.exists(angularJsonPath)) {
        context.logger.error('angular.json not found');
        return tree;
    }
    const content = tree.read(angularJsonPath);
    if (!content) {
        return tree;
    }
    const angularJson = parse(content.toString());

    // Ajout du CLI du générateur
    angularJson.cli ??= {};
    angularJson.cli.schematicCollections ??= [];
    if ( !angularJson.cli.schematicCollections.includes('@chinjto/generator-angular')) {
        angularJson.cli.schematicCollections.unshift('@chinjto/generator-angular');
    }
    context.logger.info('Added @chinjto/generator-angular to schematicCollections');

    // Ajout des shared styles
    for (const projectName of Object.keys(angularJson.projects ?? {})) {
        const project = angularJson.projects[projectName];

        const options = project?.architect?.build?.options;
        if (!options) continue;

        options.stylePreprocessorOptions ??= {};
        options.stylePreprocessorOptions.includePaths ??= [];

        const includePaths = options.stylePreprocessorOptions.includePaths;

        if (!includePaths.includes('src/app/shared/styles')) {
            includePaths.push('src/app/shared/styles');
        }
        context.logger.info('Added shared styles to stylePreprocessorOptions ['+projectName+']');
    }

    // Persistance du nouveau Json
    tree.overwrite(angularJsonPath, JSON.stringify(angularJson, null, 2));
}

function updateTsConfigPaths(tree: Tree, context: SchematicContext) {
    const tsconfigPath = '/tsconfig.json';
    if (!tree.exists(tsconfigPath)) {
        context.logger.warn('tsconfig.json not found');
        return tree;
    }
    const buffer = tree.read(tsconfigPath);
    if (!buffer) return tree;
    const tsconfig = parse(buffer.toString());
    tsconfig.compilerOptions ??= {};
    tsconfig.compilerOptions.baseUrl ??= './src';
    tsconfig.compilerOptions.paths ??= {};
    const paths = tsconfig.compilerOptions.paths;
    const aliases = {
        '@app/*': ['app/*'],
        '@core/*': ['app/core/*'],
        '@shared/*': ['app/shared/*'],
        '@pages/*': ['app/pages/*'],
        '@sections/*': ['app/shared/components/sections/*'],
        '@cards/*': ['app/shared/components/cards/*'],
        '@tiles/*': ['app/shared/components/tiles/*']
    };
    for (const [alias, value] of Object.entries(aliases)) {
        paths[alias] = value;
    }
    tree.overwrite(
        tsconfigPath,
        JSON.stringify(tsconfig, null, 2)
    );
    context.logger.info('Added TypeScript path aliases');
    return tree;
}

function addSharedIndexScss(tree: Tree, context: SchematicContext) {
    // Création du fichier
    const sharedIndexScssPath = '/src/app/shared/styles/_index.scss';
    if (!tree.exists(sharedIndexScssPath)) {
        tree.create(sharedIndexScssPath, "");
        context.logger.info('Added _index.scss to shared');
    } else {
        context.logger.warn('_index.scss already exists');
    }
}

function updateGlobalStyles(tree: Tree, context: SchematicContext) {
    const targets = [
        '/src/styles.scss',
        '/src/app/app.scss'
    ];
    let updated = false;
    for (const path of targets) {
        if (!tree.exists(path)) continue;
        const buffer = tree.read(path);
        if (!buffer) continue;
        const original = buffer.toString();
        const modified = ensureUseIndex(original);
        if (original !== modified) {
            tree.overwrite(path, modified);
            updated = true;
        }
    }
    if (updated) {
        context.logger.info("Injected @use 'index' into global styles");
    }
    return tree;
}

function ensureUseIndex(content: string): string {
    const line = `@use 'index' as *;`;
    return content.includes(line) ? content : `${line}\n${content}`;
}
