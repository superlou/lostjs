import {
    EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine
} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history } from "@codemirror/commands";
import { foldGutter, indentOnInput } from "@codemirror/language";
import { loadFromLocalStorage, persistToLocalStorage } from "./localStorage";

import { parser } from "../build/grammar"
console.log(parser.parse("one 2 \"three\"").toString());

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
    ],
});

let editor = new EditorView({
    state: state,
    parent: document.body,
});