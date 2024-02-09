import {
    EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine,
    drawSelection,
} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentUnit } from "@codemirror/language";
import { defaultKeymap, history, indentWithTab } from "@codemirror/commands";
import { foldGutter, indentOnInput, defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { loadFromLocalStorage, persistToLocalStorage } from "./local-storage";
import { logTree } from "./print-lezer-tree";
import { lost } from "./lost-lang";

let startText = loadFromLocalStorage();

// import { markdown } from "@codemirror/lang-markdown";
// const LostMarkExtension = {
//     remove: ["IndentedCode"]
// }
// let md = markdown({
//     extensions: [LostMarkExtension],
// });
// logTree(md.language.parser.parse(startText), startText);

let lostLang = lost();
logTree(lostLang.language.parser.parse(startText), startText);


let state = EditorState.create({
    doc: startText,
    extensions: [
        keymap.of(defaultKeymap),
        keymap.of(indentWithTab),
        indentUnit.of("    "),
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
        lostLang,
    ],
});

let editor = new EditorView({
    state: state,
    parent: document.body,
});