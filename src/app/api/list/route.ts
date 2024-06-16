import {
    getUserDetailsQueryBody,
    getQuestionListQueryBody,
} from "@/lib/queries";
import {
    ListMetadata,
    ListResponse,
    MetaDataResponseRoot,
    Question,
    QuestionsList,
    RawQuestion,
} from "@/types";
import { NextResponse } from "next/server";

const fetchQuestionList = async (listId: string): Promise<Question[]> => {
    const questionsListResponse = await fetch("https://leetcode.com/graphql/", {
        headers: {
            "content-type": "application/json",
        },
        body: getQuestionListQueryBody(listId),
        method: "POST",
    });

    const rawQuestions: QuestionsList<RawQuestion> =
        await questionsListResponse.json();

    if (!rawQuestions?.data?.favoriteQuestionList) {
        return new Promise(() => null);
    }

    const processedQuestions: Question[] =
        rawQuestions?.data?.favoriteQuestionList?.questions?.map(
            (question: RawQuestion, index: number) => {
                return {
                    index,
                    difficulty: question.difficulty,
                    title: question.title,
                    topicTags: question.topicTags,
                    url: `https://leetcode.com/problems/${question.titleSlug}`,
                };
            }
        );

    return processedQuestions;
};

const fetchListMetadata = async (listId: string): Promise<ListMetadata> => {
    const metadataResponse = await fetch("https://leetcode.com/graphql/", {
        headers: {
            "content-type": "application/json",
        },
        body: getUserDetailsQueryBody(listId),
        method: "POST",
    });

    const metadataRoot: MetaDataResponseRoot = await metadataResponse.json();

    const metadata = metadataRoot?.data?.favoriteDetailV2;

    if (!metadata) {
        return new Promise(() => null);
    }

    const filteredMetadata: ListMetadata = {
        name: metadata.name,
        questionNumber: metadata.questionNumber,
        creator: metadata.creator,
        description: metadata.description,
    };

    return filteredMetadata;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    try {
        const id = searchParams.get("id");

        if (id == null || id.trim().length == 0) {
            return NextResponse.json({ message: "Invalid List ID", success: false });
        }

        const [questions, listMetadata] = await Promise.all([
            fetchQuestionList(id),
            fetchListMetadata(id),
        ]);
        
        if(!questions || !listMetadata){
            throw new Error();
        }
        const data: ListResponse = { listMetadata, questions };
        return NextResponse.json({ data, success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong while fetching the list", success: false });
    }
}
