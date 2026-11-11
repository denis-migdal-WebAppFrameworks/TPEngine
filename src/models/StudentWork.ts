import { ReactiveAggregator } from "MWL@2026/modules/Reactive/Collections/ReactiveAggregator";
import { QuestionModel } from "./Questions";
import { addLink, ReactiveObject } from "MWL@2026/modules/Reactive/Reaction";

type Questions = Readonly<Record<string, QuestionModel>>;

export class StudentWork extends ReactiveObject {

    private readonly questionsAgg = new ReactiveAggregator();

    constructor(questions?: Questions) {
        super();

        if( questions !== undefined)
            this.questions = questions;

        addLink(this.questionsAgg, this);
    }

    private _questions: Questions = {};
    get questions() { return this._questions; }
    set questions(questions: Questions) {
        this._questions = questions;
        this.questionsAgg.replaceAll(...Object.values(questions));
    }
}