# Installation and Setup

## Pre-requisites

[React Native setup documentation](https://reactnative.dev/docs/set-up-your-environment).

- Install Xcode
- Install Xcode Command Line Tools
- Install Homebrew
- Install Mise
- Install Node via Mise
- Install Watchman via Homebrew
- Install a Java Development Kit (JDK), Android Studio, the Android SDK: follow [the multistep directions](https://reactnative.dev/docs/set-up-your-environment?platform=android)

## Setting up the first time

Install the Expo CLI Globally

```shell
# sh
npm install -g @expo/cli
```

Create the app

```shell
# sh
npx create-expo-app CribbageBoardApp && cd CribbageBoardApp
```

Reset the project to move the starter code to an app demo directory (per the Readme file)

```shell
# sh
npm run reset-project
```

Create a mise.toml file

```shell
# sh
mise use node@lts
```

Install the react-native-svg package

```shell
# sh
npm install react-native-svg
```

Reset the project

```shell
# sh
npm run reset-project
```

Edit the `app/(tabs)/index.ts` file.

Make a `components` directory at the same level as `app`.

Add the CribbageBoard component to that directory as `CribbageBoard.tsx`.

Edit the `mise.toml` file to pin Node and npm and add tasks (run `mise tasks` to see a list of tasks or `mise run start` to run the Expo Go start task for example).

Configure prettier, add as a dev dependency:

```shell
# sh
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser @eslint/eslintrc
```

Create a `.prettierrc` file in the project root:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": false,
  "arrowParens": "avoid"
}
```

Create a `.prettierignore` file to exclude certain files:

```shell
node_modules
.expo
.expo-shared
*.log
.DS_Store
*.tgz
*.tar.gz
.cache
dist
build
```

Update the `eslint.config.js` file, adding to the `defineConfig` array arg:

```
{
files: ['**/*.{js,jsx,ts,tsx}'],
plugins: {
  prettier: require('eslint-plugin-prettier'),
},
rules: {
  // Prettier integration
  'prettier/prettier': 'error',
  
  // Unused imports - TypeScript projects
  '@typescript-eslint/no-unused-vars': ['error', { 
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_',
    ignoreRestSiblings: true 
  }],
  
  // For JavaScript files
  'no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_',
    ignoreRestSiblings: true
  }],
},
},
// This should come last to disable conflicting rules
require('eslint-config-prettier'),
```

Update the scripts section of the `package.json` to include:

```
"lint:fix": "eslint . --fix",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

### Configure PHPStorm/PyCharm

Open Settings, navigate Language & Frameworks -> JavaScript -> Code Quality Tools -> ESLint. Automatic ESLint configuration should be selected by default. Tick the option to "Run eslint --fix on save."