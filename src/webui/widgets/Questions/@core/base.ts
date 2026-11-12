import { DeferredEffects } from "MWL@2026/modules/Widgets/";

export const baseStyle = __LOAD_FILE__("./index.css");

export function initializeMetaRendering(
                            ctx: {
                                readonly target: HTMLElement
                                readonly elements: {
                                    readonly grade: HTMLElement
                                }
                            },
                            effects: DeferredEffects<{
                                comment: string,
                                score  : null|number,
                                coeff  : null|number,
                            }>,
                            color: boolean) {

    const props = effects.target;

    effects.addRule(["comment"], () => {
        ctx.target.style.setProperty(
                                        '--comment',
                                        `"${props.comment}"`
                                    );
    });

    effects.addRule(["score", "coeff"], () => {

        const grade = ctx.elements.grade;
        const coeff = props.coeff;

        if( coeff === null) { // not graded.

            if( color )
                ctx.target.style.setProperty("--grade-color", 
                                                "transparent");
            grade.textContent = "";
            return;
        }

        const score = props.score;

        if( color )
            updateGradeColor(ctx.target, score);

        const points = score === null ? "" : `${score*coeff}`;
        ctx.elements.grade.textContent = `[${points}/${coeff}]`;
    });
}

// do not delay: should/could be included in a deferred callback.
export function updateGradeColor(target: HTMLElement, score: number|null) {
    
    let gradeColor = "transparent";
    if( score !== null)
        gradeColor = `hsl(${score * 120}, 100%, 50%)`

    target.style.setProperty("--grade-color", gradeColor);
}