
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
    input: 'lib/index.js',
    name:'Tumbling',
    output: {
      file: 'dist/tumbling.js',
      format: 'umd',
      sourcemap: true
    },
    plugins:[
        commonjs()
    ]
  };