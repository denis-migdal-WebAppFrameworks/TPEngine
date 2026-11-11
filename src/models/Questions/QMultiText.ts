import { Properties } from "MWL@2026/modules/Reactive/Collections/Properties";
import {Constant, Fixed, Value, Computed} from "MWL@2026/modules/Reactive/Property";

import { QProperties, QuestionsRegistry } from "./@core/interface";

// we assume empty string = null, avoid handling this special case.
const QMultiTextModel = Properties({
    ...QProperties<null|readonly string[]>(null),
    type    : Constant<string>("QMultiText"),
    nbFields: Fixed<number>(2),
    nbCols  : Fixed<number|null>(null),
    scores  : Value<readonly number[]|null>(null),
    score   : Computed(["scores"], (scores: readonly number[]|null) => {

        if( scores === null)
            return null;

        let sum = 0;
        for(let i = 0; i < scores.length; ++i)
            sum += scores[i]

        return sum / scores.length;
    }),
});

type QMultiTextModel = InstanceType<typeof QMultiTextModel>;

QuestionsRegistry["QMultiText"] = QMultiTextModel;

export {QMultiTextModel};