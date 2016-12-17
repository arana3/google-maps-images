import babel  from 'rollup-plugin-babel';  // rollupjs.org/guide/#using-rollup-with-babel
import flow   from 'rollup-plugin-flow';
import uglify from 'rollup-plugin-uglify';

export default {
    entry:   'src/index.js',
    dest:    'dist/google-maps-images.min.js',
    format:  'cjs',
    external: [
        'query-string'  // www.npmjs.com/package/query-string
    ],
    plugins: [
        flow(),
        babel({
            exclude: 'node_modules/**',
            presets: 'es2015-rollup',  // www.npmjs.com/package/babel-preset-es2015-rollup
            plugins: [
                'transform-object-rest-spread'  // www.npmjs.com/package/babel-plugin-transform-object-rest-spread
            ]
        }),
        uglify()
    ]
};
