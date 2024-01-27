import {
    EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine,
    drawSelection,
} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history } from "@codemirror/commands";
import { foldGutter, indentOnInput, defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { loadFromLocalStorage, persistToLocalStorage } from "./local-storage";
import { lost } from "./lost-lang";

import { parser } from "../build/grammar"

console.log(parser.parse(
    loadFromLocalStorage()
).toString());

let state = EditorState.create({
    doc: loadFromLocalStorage(),
    extensions: [
        keymap.of(defaultKeymap),
        lineNumbers(),
        history(),
        foldGutter(),
        indentOnInput(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        EditorState.tabSize.of(4),
        persistToLocalStorage,
        drawSelection(),
        syntaxHighlighting(defaultHighlightStyle),
        lost(),
    ],
});

let editor = new EditorView({
    state: state,
    parent: document.body,
});