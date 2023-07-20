import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    try {
        const id = searchParams.get("id");
        /** const all = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            , body: JSON.stringify({ "query": "\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList: questionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    total: totalNum\n    questions: data {\n      difficulty\n       title\n      titleSlug\n      topicTags {\n        name\n        id\n        slug\n      }\n      }\n  }\n}\n    ", "variables": { "categorySlug": "", "skip": 0, "limit": 3000, "filters": {} }, "operationName": "problemsetQuestionList" })
        })
        const allData = await all.json();
        const indexes = new Map();
        allData.data.problemsetQuestionList.questions.forEach((q, index) => {
            indexes[q.titleSlug] = index;
        })
        **/
        const res = await fetch(
            `https://leetcode.com/list/api/get_list/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();

        if (!data.name || !data.creator || !data.questions) {
            return NextResponse.json({
                message: "List not found.",
                success: false,
            });
        }

        console.log(data);
        return NextResponse.json({ data, success: true });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error occurred", success: false });
    }
}
