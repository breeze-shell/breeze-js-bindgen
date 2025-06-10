[Donate Me](./DONATE.md) [Discord](https://discord.gg/MgpHk8pa3d)

<div align=center>
  <img src=./resources/icon.webp width=300 />
<h1>Breeze.JS Bindgen</h1>
</div>

## Description

Breeze JS Bindgen is a command-line tool that generates C++ bindings and TypeScript definitions for Breeze.JS from C++ header files. It uses Clang to parse the C++ code and generates the necessary files to interface C++ code with QuickJS.

## Installation

You can install Breeze JS Bindgen globally using Yarn:

```bash
yarn global add breeze-bindgen
```

Or add it as a development dependency to your project:

```bash
yarn add --dev breeze-bindgen
```

Or use it with `npx`

```bash
npx breeze-bindgen
```

## Usage

The `breeze-bindgen` command-line tool can be used to generate bindings and definitions.

```bash
breeze-bindgen -i <input_header_file> [options]
```

**Options:**

*   `-i, --input <input_header_file>`: Path to the input C++ header file to process. (Required)
*   `-o, --output <output_directory>`: Directory where the generated `binding_qjs.h` and `binding_types.d.ts` files will be saved. Defaults to `generated_bindings` in the input file's directory if not specified.
*   `--clang <clang_executable_path>`: Optional path to the `clang++` executable.
*   `--cppBindingOutputFile <filename>`: Name of the generated C++ binding file. Defaults to `binding_qjs.h`.
*   `--tsDefinitionOutputFile <filename>`: Name of the generated TypeScript definition file. Defaults to `binding_types.d.ts`.
*   `--astJsonTempFile <filename>`: Temporary file name for the clang AST JSON output. Defaults to `ast.temp.json`.
*   `--quickjsTypesPath <filepath>`: Path to the `quickjs-types.txt` file relative to the bindgen directory. Defaults to `quickjs-types.txt`.
*   `--nameFilter <filter>`: Clang AST dump filter for names (e.g., "breeze::js"). Defaults to "breeze::js".

**Example:**

```bash
breeze-bindgen -i ./src/my_module.h -o ./generated
```

This will generate `binding_qjs.h` and `binding_types.d.ts` in the `./generated` directory based on the definitions found in `./src/my_module.h` that match the default name filter.

## Development

*   `yarn build`: Builds the project (CommonJS and ES modules for index and ES module for cli).
*   `yarn cli`: Runs the CLI using `esbuild-register`.
*   `yarn typegen`: Runs the type generation script using `esbuild-register`.
*   `yarn parser-test`: Runs the C type parser test script using `esbuild-register`.
