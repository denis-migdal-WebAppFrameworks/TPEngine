import { html } from "MWL@2026/@exports/DOM/";
import { CodeEditorWidget } from "MWL@2026/widgets/code/code-editor";

import { baseStyle, initializeMetaRendering, updateGradeColor } from "../@core/base";
import { Coordinator, DeferredEffects, defineWidget, View } from "MWL@2026/@exports/Widget";
import { QMultiTextModel } from "TPEngine@2026/models/Questions";

import { Property } from "MWL@2026/modules/Reactive/Property/@contract/@types/def";
import { ValueProperty, getProperty } from "MWL@2026/modules/Reactive/Property";
import { addLink } from "MWL@2026/modules/Reactive/Reaction";

const QMultiTextWidget = defineWidget(
    "q-multitext",
    Coordinator(QMultiTextModel),
    View({
        content: __LOAD_FILE__("./index.html"),
        style  : [baseStyle, __LOAD_FILE__("./index.css")],
        elements: {
            grade      : HTMLElement,
            answersList: HTMLElement
        },
        setup(ctrler) {


            const nbFields = ctrler.nbFields;
            const   nbCols = ctrler.nbCols ?? nbFields;

            this.target.style.setProperty("--nbCols", `${nbCols}`);

            const fields = new Array<CodeEditorWidget>(nbFields);
            const texts  = new Array<ValueProperty<string>>(nbFields);

            for(let i = 0; i < fields.length; ++i) {
                //TODO: create/init function ?
                const item = html`<div>(${i+1})</div>`;

                const field = new CodeEditorWidget();
                field.classList.add("graded", "compact");

                fields [i] = field;
                texts[i] = getProperty(field.subject, "text");

                this.elements.answersList.append( item, field );
            }

            const answers = getProperty(ctrler, "answer");

            //TODO: debug...
            link1_N( answers, texts, (array, idx) => {
                if( array === null) return "";

                return array[idx];
            });
            linkN_1( texts, answers, (array) => array);

            // UI...
            const effects = DeferredEffects(ctrler, this.renderer);

            initializeMetaRendering(this, effects, false);

            effects.addRule(["scores"], () => {

                const scores = ctrler.scores;
                
                for(let i = 0; i < fields.length; ++i) {
                    updateGradeColor(fields[i], scores === null ? null : scores[i]);
                }
            });
        }
    })
);

function linkN_1<T, U>(
            src: readonly Property<T>[],
            dst: ValueProperty<U>,
            merge: (v: readonly T[]) => U
    ) {

    let result!: U;

    const valProvider = {
        get() {
            return result;
        },
        isResolved: true
    }

    const onPropagate = () => {
        result = merge(src.map( s => s.get() ));
        dst._setSource(valProvider);
    }

    for(let i = 0; i < src.length; ++i)
        addLink(src[i], dst, onPropagate);
}

function link1_N<T, U>(
            src: Property<T>,
            dst: readonly ValueProperty<U>[],
            callback: (v: T, idx: number) => U 
        ) {

    for(let i = 0; i < dst.length; ++i) {

        //TODO: cache...
        const valProvider = {
            get() {
                return callback(src.get(), i)
            },
            isResolved: false,
        };

        const dsti = dst[i];

        addLink(src, dsti, () => {
            dsti._setSource(valProvider);
        });
    }
}

export {QMultiTextWidget};