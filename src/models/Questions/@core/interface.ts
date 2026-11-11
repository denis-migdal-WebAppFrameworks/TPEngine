import { PropertiesCstr } from "MWL@2026/modules/Reactive/Collections/Properties/@contract/@types/def";
import {Fixed, Value} from "MWL@2026/modules/Reactive/Property";

export function QProperties<T>(initialAnswer: T) {
    return {
        type   : Fixed<string>(""),
        qid    : Fixed<string|null>(null),
        comment: Value<string>(""),
        answer : Value(initialAnswer),
        score  : Value<number|null>(null),
        coeff  : Fixed<number|null>(null),
    }
}

export const QuestionsRegistry: Record<string, PropertiesCstr<{readonly type: string}>> = {};