# now-static-build-node

This package provides a
[builder](https://zeit.co/docs/v2/deployments/builders/overview#when-to-use-builders)
for Zeit's [Now 2.0](https://zeit.co/blog/now-2) that compiles static files with a custom npm script name (not `now-build`)

`now-static-build` always runs the `now-build` script, but we wanted to use the same `package.json` file to deploy a storybook

Based on https://github.com/zeit/now-builders/tree/master/packages/now-static-build

## Usage

Your `now.json` `"builds"` section should look something like this:

**Note**: don't forget to add `"version": 2` in your `now.json` file to use Now
2.0 explicitly.

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "now-static-build-node",
      "config": {
        "packageJsonScript": "now-build-storybook"
      }
    }
  ]
}
```
