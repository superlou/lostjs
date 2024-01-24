import {EditorView, lineNumbers, highlightActiveLineGutter} from "@codemirror/view";
import {EditorState} from "@codemirror/state";

let editor = new EditorView({
    extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        EditorState.tabSize.of(4)
    ],
    parent: document.body,
});