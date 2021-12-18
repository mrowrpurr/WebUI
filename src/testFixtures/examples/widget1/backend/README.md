# sp-plugin-template
 Template for Skyrim Platform plugins

# Getting started
You need to edit path variables at
`tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "skyrimPlatform": ["D:/PATH/TO/SKYRIM/Data/Platform/Modules/skyrimPlatform"],
     }
  }
}
```
and at `rollup.config.js`
```js
...
const skyrimFolder = 'C:/PATH/TO/SKYRIM'
...
```

Put your mod info into `src/modInfo.ts`
```ts
export default {
  title: 'EXAMPLE-MOD-SP',
  esp: 'example-mod.esp',

  /* default values of mod settings */
  settings: {
    logLevel: 'info',
  },
  
  /* form addresses if you need them */
  forms: {
    quest: {
      basic: 0x17C1CC,
    },
  },
}
```

# Usage
Default entry point is `/src/index.ts` which can be configurd in `rollup.config.js`

By default after the bundle is built resulting files are copied to your Skyrim Platform plugins directory, if you dont want that behavior comment `copy()' plugin in `rollup.config.js`
```js
copy({
  targets: [{ src: bundleFile, dest: pluginsFolder }, { src: settingsFile, dest: pluginsFolder }],
  hook: 'closeBundle',
}),
```

Commands are:

```console
pnpm build
pnpm watch
```
