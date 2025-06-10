import log from 'fancy-log';
import { generateBindingsAndDefinitions } from './core';
import { resolve as resolvePath, join as joinPath, dirname } from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readFileSync } from 'node:fs';

async function main() {
    const argv = await yargs(hideBin(process.argv))
        .option('input', {
            alias: 'i',
            type: 'string',
            description: 'Path to the input C++ header file to process.',
            demandOption: true,
        })
        .option('output', {
            alias: 'o',
            type: 'string',
            description: 'Directory where the generated binding.h and definition.d.ts files will be saved.',
        })
        .option('clang', {
            type: 'string',
            description: 'Optional path to the clang++ executable.',
        })
        .option('cppBindingOutputFile', {
            type: 'string',
            description: 'Name of the generated C++ binding file.',
            default: 'binding_qjs.h',
        })
        .option('tsDefinitionOutputFile', {
            type: 'string',
            description: 'Name of the generated TypeScript definition file.',
            default: 'binding_types.d.ts',
        })
        .option('tsModuleName', {
            type: 'string',
            description: 'Name of the TypeScript module.',
            default: 'BreezeJS',
        })
        .option('extTypesPath', {
            type: 'string',
            description: 'Path to additional type definitions.',
            default: '',
        })
        .option('nameFilter', {
            type: 'string',
            description: 'Clang AST dump filter for names (e.g., "breeze::js").',
            default: 'breeze::js',
        })
        .help()
        .alias('h', 'help')
        .parse();

    try {
        const inputFile = resolvePath(argv.input);
        let outputDir = argv.output;

        if (!outputDir) {
            const inputFilePath = resolvePath(inputFile);
            const inputFileDir = dirname(inputFilePath);
            outputDir = joinPath(inputFileDir, 'generated_bindings');
            log(`Output directory not specified, defaulting to: ${outputDir}`);
        }

        const absoluteOutputDir = resolvePath(outputDir);

        log(`Starting binding generation...`);
        log(`Input C++ file: ${inputFile}`);
        log(`Output directory: ${absoluteOutputDir}`);
        if (argv.clang) {
            log(`Using clang++ at: ${argv.clang}`);
        }

        generateBindingsAndDefinitions({
            cppFilePath: inputFile,
            outputDir: absoluteOutputDir,
            clangPath: argv.clang,
            cppBindingOutputFile: argv.cppBindingOutputFile,
            tsDefinitionOutputFile: argv.tsDefinitionOutputFile,
            additionalTypes: argv.extTypesPath ? readFileSync(resolvePath(argv.extTypesPath), 'utf-8') : '',
            nameFilter: argv.nameFilter + '::',
            tsModuleName: argv.tsModuleName,
        });

        log("Binding generation finished successfully.");

    } catch (error: any) {
        log.error("Error during binding generation:", error.message);
        if (error.stack && process.env.DEBUG) {
            log.error(error.stack);
        }
        process.exit(1);
    }
}

main();