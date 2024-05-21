// build.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['built/index.js'], // Your entry file
  bundle: true,
  minify: true, // Optional: to minify the output
  platform: 'node', // Specify 'node' platform
  outfile: 'dist/bundle.js', // Output file
}).catch(() => process.exit(1));
