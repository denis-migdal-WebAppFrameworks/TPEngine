import { CodeEditorWidget } from "MWL@2026/widgets/code/code-editor";
import {defineWidget, Coordinator, View, DeferredEffects} from "MWL@2026/@exports/Widget";
import { QTextModel } from "TPEngine@2026/models/Questions";
import { baseStyle, initializeMetaRendering } from "../@core/base";
import { syncProperties } from "MWL@2026/modules/Reactive/Property";

const QTextWidget = defineWidget("q-text",
    Coordinator(QTextModel),
    View({
        content: __LOAD_FILE__("./index.html"),
        style  : baseStyle,
        elements: {
            editorWidget: CodeEditorWidget,
            grade       : HTMLElement,
        },
        setup(ctrler) {

            const editor = this.elements.editorWidget.subject;
            syncProperties(ctrler, editor, [
                                            ["lang"  , "lang"],
                                            ["answer", "text"]
                                        ]);

            const effects = DeferredEffects(ctrler, this.renderer);
            initializeMetaRendering(this, effects, true);
        }
    }) );

export {QTextWidget}