export interface ListResponse {
    listMetadata: ListMetadata;
    questions: Question[];
}

export interface QuestionsList<QuestionType> {
    data: Data<QuestionType>;
}

export interface Data<QuestionType> {
    favoriteQuestionList: QuestionList<QuestionType>;
}

export interface QuestionList<QuestionType> {
    questions: QuestionType[];
}

export interface RawQuestion {
    difficulty: string;
    title: string;
    topicTags: TopicTag[];
    titleSlug: string;
}

export interface Question extends Omit<RawQuestion, "titleSlug"> {
    index: number;
    url: string;
}

export interface FrontendQuestion
    extends Omit<Question, "url" | "topicTags" | "index"> {
    topicTags: string;
    index: string;
}

export interface TopicTag {
    name: string;
    slug: string;
}

export interface MetaDataResponseRoot {
    data: {
        favoriteDetailV2: RawListMetadata;
    };
}

export interface RawListMetadata {
    coverUrl: any;
    coverEmoji: any;
    coverBackgroundColor: any;
    description: string;
    creator: Creator;
    hasCurrentQuestion: boolean;
    isPublicFavorite: boolean;
    lastQuestionAddedAt: any;
    name: string;
    questionNumber: number;
    slug: string;
    isDefaultList: boolean;
}

export type ListMetadata = Pick<
    RawListMetadata,
    "description" | "creator" | "name" | "questionNumber"
>;

export interface Creator {
    realName: string;
}

export interface QuestionsDifficultyDistribution {
    easy: number;
    medium: number;
    hard: number;
}
