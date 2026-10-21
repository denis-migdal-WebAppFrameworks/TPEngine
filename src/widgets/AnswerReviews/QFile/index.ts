import { AnswerReviewRegistry, baseStyle, initializeComment } from "../@core/";
import { defineWidget, Coordinator, View } from "MWL@2026/@exports/Widget";
import { updateGradeColor } from "TPEngine@2026/widgets/Questions/@core/base";
import { QFileModel } from "TPEngine@2026/models/Questions";

const ARFileWidget = defineWidget(
    "ar-file",
    Coordinator(QFileModel),
    View({
        content   : __LOAD_FILE__("./index.html"),
        style     : [baseStyle, __LOAD_FILE__("./index.css")],
        elements: {
            comment    : HTMLInputElement,
            score      : HTMLInputElement,
            answer     : HTMLElement,
            content    : HTMLIFrameElement,
            expandBtn  : HTMLElement,
            expandModal: HTMLDialogElement,
        },
        setup(ctrler) {

            // no sync: WE are the one pushing changes.
            initializeComment(this.elements.comment, ctrler);

            const scoreInput = this.elements.score;

            const score = ctrler.properties.score;
            updateGradeColor(this.target, score);
            scoreInput.value = `${score}`;

            scoreInput.addEventListener("input", () => {
                const score = +scoreInput.value;
                ctrler.properties.score = score;
                updateGradeColor(this.target, score);
            });

            /////
            //TODO: factoriser certaines parties du code ci-dessous
            /////

            const answerViewer = this.elements.content;


            // handle expansion
            const modal = this.elements.expandModal;
            const answerArea = this.elements.answer;

            this.elements.expandBtn.addEventListener("click", () => {
                modal.append(answerViewer);
                modal.showModal();
            })

            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    answerArea.append(answerViewer);
                    modal.close();
                }
            });

            // RO
            const answer = ctrler.properties.answer;

            if( answer === null) {
                // about:blank generate browser warnings.
                // we could use a BlankPage (then do not set style)
                // after load.
                answerViewer.removeAttribute("src");
                return;
            }

            const file = new Blob([answer.content], {type: answer.type});

            answerViewer.src = URL.createObjectURL(file);

            // resize image...
            answerViewer.addEventListener("load", () => {
                const content = answerViewer.contentDocument!;
                
                if( content.body !== null) {
                    const style = content.body.style;

                    style.setProperty('height'         , '100vh')
                    style.setProperty('width'          , '100vw')
                    style.setProperty('margin'         , '0')
                    style.setProperty('display'        , 'flex');
                    style.setProperty('align-items'    , 'center');
                    style.setProperty('justify-content', 'center');
                } else {
                    const style = content.documentElement.style;
                    style.setProperty("width" , "100vw")
                    style.setProperty("height", "100vh")
                }
            });
        }
    }),
);

type ARFileWidget = InstanceType<typeof ARFileWidget>;

export {ARFileWidget};

AnswerReviewRegistry["QFile"] = ARFileWidget;