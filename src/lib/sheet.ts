import { FrontendQuestion, ListResponse, Question } from "@/types";
import { utils as xlsx, writeFile, WorkSheet } from "xlsx";
import { getQuestionsDifficultyDistribution } from "./utils";

const MIN_WIDTH = 12;
const QUESTIONS_STARTING_POSTITION = 8;

const calculateWidth = (
    questions: FrontendQuestion[],
    key: keyof FrontendQuestion
) => {
    const width = questions.reduce(
        (w, r) => Math.max(w, r[key].toString().length),
        MIN_WIDTH
    );

    return width;
};

const addMetadata = (
    worksheet: WorkSheet,
    data: ListResponse,
    frontendQuestions: FrontendQuestion[]
) => {
    const questionDistribution = getQuestionsDifficultyDistribution(
        frontendQuestions as unknown as Question[]
    );

    xlsx.sheet_add_aoa(
        worksheet,
        [
            ["Sheet Name", data.listMetadata.name],
            ["Creator", data.listMetadata.creator.realName],
            ["Description", data.listMetadata.description],
            [
                "Number of Questions",
                `${data.listMetadata.questionNumber.toString()} (Easy: ${
                    questionDistribution.easy
                }, Medium: ${questionDistribution.medium}, Hard: ${
                    questionDistribution.hard
                })`,
            ],
        ],
        { origin: "D2" }
    );
};

const addQuestions = (
    worksheet: WorkSheet,
    data: ListResponse,
    filtered: FrontendQuestion[]
) => {
    xlsx.sheet_add_aoa(
        worksheet,
        [["Index", "Difficulty", "Problems", "Topic Tags"]],
        {
            origin: `B${QUESTIONS_STARTING_POSTITION - 1}`,
        }
    );
    xlsx.sheet_add_json(worksheet, filtered, {
        origin: `B${QUESTIONS_STARTING_POSTITION}`,
        skipHeader: true,
    });

    data.questions.forEach((row, index) => {
        worksheet[`D${QUESTIONS_STARTING_POSTITION + index}`].l = {
            Target: row.url,
            Tooltip: "Open problem",
        };
    });

    worksheet["!cols"] = [
        { wch: MIN_WIDTH },
        ...Object.keys(filtered[0]).map((key) => {
            return {
                wch: calculateWidth(filtered, key as keyof FrontendQuestion),
            };
        }),
    ];
};

export const generateSheet = (data: ListResponse) => {
    const filtered: FrontendQuestion[] = data.questions.map((r) => {
        return {
            index: (r.index + 1).toString(),
            difficulty: r.difficulty,
            title: r.title,
            topicTags: r.topicTags
                .map((tag) => tag.name)
                .sort()
                .join(", "),
        };
    });

    const workbook = xlsx.book_new();
    const worksheet = xlsx.json_to_sheet([]);

    addQuestions(worksheet, data, filtered);
    addMetadata(worksheet, data, filtered);

    xlsx.book_append_sheet(workbook, worksheet, "Sheet 1");
    writeFile(workbook, `${data.listMetadata.name}.xlsx`, {
        compression: true,
    });
};
