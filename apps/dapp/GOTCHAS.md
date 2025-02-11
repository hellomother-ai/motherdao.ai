# Vite plugin node polyfill issues

```sh
[vite]: Rollup failed to resolve import "vite-plugin-node-polyfills/shims/global" from "/Users/ed/code/axis/ui-libs/node_modules/isows/_esm/utils.js".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
```

## Solution

Issue only seems to surface in newer versions, ~0.17.0 works fine.

`package.json`

```json
"vite-plugin-node-polyfills": "^0.17.0"
```
