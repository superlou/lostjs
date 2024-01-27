import { EditorView } from "@codemirror/view";

export function loadFromLocalStorage() {
    return localStorage.getItem("doc") || "";
}

export let persistToLocalStorage = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
        let doc = update.state.doc.toString();
        localStorage.setItem("doc", doc);
    }
});