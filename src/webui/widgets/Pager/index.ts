import { pauseReactions, resumeReactions, requestReaction } from "MWL@2026/modules/Reactive/Reaction";
import { Coordinator, DeferredEffects, defineWidget, View } from "MWL@2026/modules/Widgets/";
import { Properties } from "MWL@2026/modules/Reactive/Collections/Properties";
import { Value, resetProperties } from "MWL@2026/modules/Reactive/Property";

class BoundedCounter extends Properties({
        value: Value(0),
        max  : Value(0) //TODO: Output(max).
    }) {

    reset(max: number) {

        pauseReactions(this);

        resetProperties(this, {
            value: 0,
            max,
        });

        // ensure trigger.
        requestReaction(this);

        resumeReactions(this);
    }

    decr() {
        let value = this.value;
        if( value === 0)
            return;

        this.value = --value;
    }
    incr() {

        let value = this.value;
        if( value >= this.max - 1)
            return;

        this.value = ++value;
    }

}

const Pager = defineWidget(
    "w-pager",
    Coordinator(BoundedCounter),
    View({
        content: __LOAD_FILE__("./index.html"),
        elements: {
            prevBtn : HTMLElement,
            nextBtn : HTMLElement,
            curText : HTMLElement,
            maxText  : HTMLElement,
        },
        setup(ctrler) {

            const effects = DeferredEffects(ctrler, this.renderer);

            effects.addRule(["value"], () => {
                this.elements.curText.textContent = `${ctrler.value+1}`;
            })
            effects.addRule(["max"], () => {
                this.elements.maxText.textContent = `${ctrler.max}`;
            })

            this.elements.prevBtn.addEventListener("click",
                                                        () => ctrler.decr());
            this.elements.nextBtn.addEventListener("click",
                                                        () => ctrler.incr());
        }
    })
);

type Pager = InstanceType<typeof Pager>;

export {Pager};