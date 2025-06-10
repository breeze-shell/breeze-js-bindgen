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

      --version                 Show version number                    [boolean]
  -i, --input                   Path to the input C++ header file to process.
                                                             [string] [required]
  -o, --output                  Directory where the generated binding.h and
                                definition.d.ts files will be saved.    [string]
      --clang                   Optional path to the clang++ executable.[string]
      --cppBindingOutputFile    Name of the generated C++ binding file.
                                             [string] [default: "binding_qjs.h"]
      --tsDefinitionOutputFile  Name of the generated TypeScript definition
                                file.   [string] [default: "binding_types.d.ts"]
      --tsModuleName            Name of the TypeScript module.
                                                  [string] [default: "BreezeJS"]
      --extTypesPath            Path to additional type definitions.
                                                          [string] [default: ""]
      --nameFilter              Clang AST dump filter for names (e.g.,
                                "breeze::js").  [string] [default: "breeze::js"]
  -h, --help                    Show help                              [boolean]

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
