const ESBuild = require('esbuild')
const path = require('path')
const config = require('./esbuild-config')

const PORT = process.env.PORT || 3000;

ESBuild.context({
    ...config
  }).then(ctx => {
    let { host, port } = ctx.serve({
      servedir: config.outdir,
      port: PORT,
      onRequest: (args) => {
        if (args.isInitial) {
            args.serve(config.outdir + '/index.html', 'text/html');
        }
    }
    }).then(()=> {
        console.log('Server started on http://localhost:' + PORT);
    }).catch(err => {
        console.error('Failed to start server:', err)
    })
  })