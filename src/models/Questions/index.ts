import { QTextModel } from "./QText";
import { QMultiTextModel } from "./QMultiText";
import { QFileModel } from "./QFile";
import { QuestionsRegistry } from "./@core/interface";
import { PropertiesShape } from "MWL@2026/modules/Reactive/Property/@contract/@types/WithProperties";

export {QTextModel, QMultiTextModel, QFileModel};

export type QuestionModel = QTextModel|QMultiTextModel|QFileModel;

export function createQuestionModel<T extends QuestionModel>(
                                data: PropertiesShape<T>
                            ): QuestionModel {

    return new QuestionsRegistry[data.type](data) as QuestionModel;
}