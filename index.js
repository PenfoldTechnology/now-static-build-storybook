const download = require("@now/build-utils/fs/download.js"); // eslint-disable-line import/no-extraneous-dependencies
const glob = require("@now/build-utils/fs/glob.js"); // eslint-disable-line import/no-extraneous-dependencies
const path = require("path");
const { existsSync, readdirSync } = require("fs");
const {
  runNpmInstall,
  runPackageJsonScript
} = require("@now/build-utils/fs/run-user-scripts.js"); // eslint-disable-line import/no-extraneous-dependencies

function validateDistDir(distDir) {
  if (!existsSync(distDir)) {
    const distDirName = path.basename(distDir);
    const message =
      `Build was unable to create the distDir: ${distDirName}.` +
      "\nMake sure you mentioned the correct dist directory: https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build/#configuring-the-dist-directory";
    throw new Error(message);
  }
}

exports.build = async ({ files, entrypoint, workPath, config }) => {
  if (path.basename(entrypoint) !== "config.js") {
    throw new Error("Storybook config.js must be specified as entrypoint");
  }

  console.log("downloading user files...");
  await download(files, workPath);

  console.log("running now-build-storybook script...");
  const mountpoint = path.join(entrypoint, "..", "..");
  const entrypointFsDirname = path.join(workPath, mountpoint);

  await runNpmInstall(entrypointFsDirname, ["--prefer-offline"]);

  if (await runPackageJsonScript(entrypointFsDirname, "now-build-storybook")) {
    const distPath = path.join(
      workPath,
      mountpoint,
      (config && config.distDir) || "dist"
    );
    validateDistDir(distPath);
    return glob("**", distPath, mountpoint);
  }
  throw new Error(`An error running "now-build" script in "${entrypoint}"`);
};
