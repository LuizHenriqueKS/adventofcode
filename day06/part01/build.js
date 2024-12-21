const { build } = require("esbuild");
const { dependencies, devDependencies } = require('../../package.json')

const dir = "day06/part01/";

const sharedConfig = {
  entryPoints: [dir + "front.ts"],
  bundle: true,
  minify: true,
  external: Object.keys(dependencies).concat(Object.keys(devDependencies)),
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: dir + "dist/front.js",
});

build({
  ...sharedConfig,
  outfile: dir + "dist/front.esm.js",
  platform: 'neutral', // for ESM
  format: "esm",
});