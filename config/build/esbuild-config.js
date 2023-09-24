const ESBuild = require('esbuild')
const path = require('path')

const mode = process.env.REACT_APP_MODE || 'development';

const isDev = mode === 'development';
const isProd = mode === 'production';

function resolveRoot(...segments) {
    return path.resolve(__dirname, '..', '..', ...segments)
}

module.exports = {
    outdir: resolveRoot('build'),
    entryPoints: [resolveRoot('src', 'index.js')],
    entryNames: 'bundle',
    loader: {
        '.js': 'jsx',
        '.otf': 'file'
    },
    bundle: true,
    target: ['es6'],
    platform: 'browser',
    minify: isProd,
    sourcemap: isDev,
    define: {
        'process.env.REACT_APP_MODE': `"${mode}"`,
    },
}