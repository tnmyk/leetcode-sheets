import { Question, QuestionsDifficultyDistribution } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { RefObject } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const scrollToView = <T extends HTMLElement>(ref: RefObject<T>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
};

export const getQuestionsDifficultyDistribution = (
    questions: Question[] | undefined
): QuestionsDifficultyDistribution => {
    const initial = { easy: 0, hard: 0, medium: 0 };

    if (!questions) {
        return initial;
    }

    return questions.reduce(function (store, question) {
        if (question.difficulty === "EASY") {
            store.easy++;
        } else if (question.difficulty === "MEDIUM") {
            store.medium++;
        } else if (question.difficulty === "HARD") {
            store.hard++;
        }

        return store;
    }, initial);
};
