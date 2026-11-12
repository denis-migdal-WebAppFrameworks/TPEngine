import { ARMultiTextWidget } from "./QMultiText";
import { ARTextWidget } from "./QText";
import { ARFileWidget } from "./QFile";
import { AnswerReviewRegistry } from "./@core";
import { QuestionModel } from "TPEngine@2026/models/Questions";

export { ARTextWidget, ARMultiTextWidget, ARFileWidget };

export type ARWidget = ARTextWidget|ARMultiTextWidget;

export function createAnswerReviewWidget<T extends QuestionModel>(
                                model: T
                            ): ARWidget {

    return new AnswerReviewRegistry[model.type](model) as any as ARWidget;
}