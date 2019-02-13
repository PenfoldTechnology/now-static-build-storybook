# now-static-build-storybook

This package provides a
[builder](https://zeit.co/docs/v2/deployments/builders/overview#when-to-use-builders)
for Zeit's [Now 2.0](https://zeit.co/blog/now-2) that compiles [Storybooks](https://github.com/storybooks/storybook)

`now-static-build` always runs the `now-build` script, but we wanted to reuse our the `package.json` file to deploy a storybook

Based on https://github.com/zeit/now-builders/tree/master/packages/now-static-build

## Usage

Your `now.json` `"builds"` section should look something like this:

**Note**: don't forget to add `"version": 2` in your `now.json` file to use Now
2.0 explicitly.

```json
{
  "builds": [
    {
      "src": ".storybook/config.js",
      "use": "now-static-build-storybook"
    }
  ]
}
```

Your `package.json` needs a script named `now-build-storybook`. By default the `dist` directory gets merged with your site, so `dist/storybook` will mount it at `/storybook`

```json
{
  "scripts": {
    "now-build-storybook": "build-storybook -o dist/storybook"
  }
}
```
