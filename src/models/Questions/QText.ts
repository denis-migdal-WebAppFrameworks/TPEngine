import { Properties } from "MWL@2026/modules/Reactive/Collections/Properties";
import {Constant, Value} from "MWL@2026/modules/Reactive/Property";

import { QProperties, QuestionsRegistry } from "./@core/interface";

// we assume empty string = null, avoid handling this special case.
const QTextModel = Properties({
    ...QProperties<string>(""),
    type   : Constant<string>("QText"),
    lang   : Value<string|null>(null),
});

type QTextModel = InstanceType<typeof QTextModel>;

QuestionsRegistry["QText"] = QTextModel;

export {QTextModel};