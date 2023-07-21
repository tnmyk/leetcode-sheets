export interface ListResponse {
    creator: string;
    name: string;
    view_count: number;
    questions: Question[];
}
export interface RawListResponse extends Omit<ListResponse, "questions"> {
    questions: RawQuestion[];
}

export interface Question {
    no: number;
    title: string;
    url: string;
}

export interface RawQuestion extends Question {
    id: number;
    title_slug: string;
}
