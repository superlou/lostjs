import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { lezer } from "@lezer/generator/rollup";

export default [{
    input: "src/lost.grammar",
    output: {
        file: "build/grammar.js",
        format: "es",
    },
    external: ["@lezer/lr", "@lezer/highlight"],
    plugins: [lezer()],
}, {
    input: "src/main.js",
    output: {
        file: "public/index.js",
        format: "iife"
    },
    plugins: [nodeResolve(), typescript()],
}]