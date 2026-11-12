import { Widget } from "MWL@2026/modules/Widgets/";
import { Properties } from "MWL@2026/modules/Reactive/Collections/Properties";

type ARWidgetCstr = {new(opts?: Partial<{readonly type: string}>): Widget<{readonly type: string}>};

export const AnswerReviewRegistry: Record<string, ARWidgetCstr> = {};

export const baseStyle = __LOAD_FILE__("./index.css");

export function initializeComment(comment: HTMLInputElement,
                                   ctrler: Properties<{comment: string}>) {
    comment.value = ctrler.comment;
    comment.addEventListener("input", () => {
        ctrler.comment = comment.value;
    });
}