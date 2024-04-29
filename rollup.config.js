import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
const packageJson = require("./package.json");

export default [
  {
    input: "src/index.js",
    output: [
      { file: packageJson.main, format: "cjs" },
      { file: packageJson.module, format: "esm" },
    ],
    plugins: [
      resolve(),
      commonjs({ include: ["node_modules/**"] }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/env", "@babel/preset-react"],
        babelHelpers: "bundled",
      }),
      postcss(),
      external([
        "@salt-ds/core",
        "@salt-ds/icons",
        "@salt-ds/lab",
        "@salt-ds/theme"
      ]),
      terser()
    ],
  },
];
