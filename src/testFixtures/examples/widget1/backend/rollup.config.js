import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';

// const includePathOptions = {
//     include: {},
//     paths: ['../../../../@skyrim-webui/backend/dist'],
//     external: [],
//     extensions: ['.js']
// };

export default defineConfig({
  input: 'src/index.ts',
  output: {
    format: 'umd',
    // format: 'iife',
    file: 'rollup/output.js',
  },
  external: ['skyrimPlatform'],
  plugins: [
    nodeResolve(),
    // includePaths(includePathOptions),
    resolve({
      extensions: ['.ts', '.js'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript()
  ],
})
