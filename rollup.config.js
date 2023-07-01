import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
  input: 'ui/app.js',
  plugins: [
    // Resolve bare module specifiers to relative paths
    resolve({
      browser: true
    }),
    commonjs(),
    // Minify JS
    terser({
      module: true,
      warnings: true
    })
  ],
  output: [{
    format: 'esm',
    file: 'public/js/app.js'
  }],
  preserveEntrySignatures: false
}
