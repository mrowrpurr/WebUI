import path from 'path'
import fs from 'fs'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import copy from 'rollup-plugin-copy'
import info from './src/modInfo.ts'

const skyrimFolder = 'C:\Users\mrowr\Desktop'

const bundleFile = `dist/${info.title}.js`
// const settingsFile = `dist/${info.title}-settings.txt`
// const pluginsFolder = path.resolve(skyrimFolder, 'Data/Platform/PluginsDev')

/* generate default settings */
// fs.writeFileSync(settingsFile, JSON.stringify(info.settings, null, 2))

export default defineConfig({
  input: 'src/index.ts',
  output: {
    format: 'umd',
    file: bundleFile,
  },
  external: ['skyrimPlatform'],
  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript()
    // copy({
    //   targets: [{ src: bundleFile, dest: pluginsFolder }, { src: settingsFile, dest: pluginsFolder }],
    //   hook: 'closeBundle',
    // }),
  ],
})
