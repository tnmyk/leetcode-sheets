"use client";
import {
    FormEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    FrontendQuestion,
    ListResponse,
    Question,
    QuestionsDifficultyDistribution,
} from "@/types";
import { generateSheet } from "@/lib/sheet";
import { Skeleton } from "./ui/skeleton";
import { DownloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { getQuestionsDifficultyDistribution, scrollToView } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { exampleListURL } from "@/constants";

const Process = () => {
    const [result, setResult] = useState<ListResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [listURL, setListURL] = useState<string>("");

    const infoCardRef = useRef(null);
    const { toast } = useToast();

    useEffect(() => {
        if (loading) {
            scrollToView(infoCardRef);
        }
    }, [loading]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault();
            setResult(null);
            setLoading(true);
            toast({
                title: "Fetching",
                description: "Getting the data from Leetcode.",
            });
            scrollToView(infoCardRef);

            try {
                const match = listURL.match(/\/list\/(.+?)(?:\/|$)/);
                if (!listURL || !match || !match[1]) {
                    throw new Error("Please enter valid list URL.");
                }
                const id = match[1];
                const res = await fetch(`/api/list?id=${id}`);
                const jsonData = await res.json();
                if (!res.ok) {
                    throw new Error(
                        jsonData.message || "Failed to fetch data."
                    );
                }
                const data: ListResponse | null = jsonData.data;
                if (!data) return;
                setResult(data);
                toast({
                    title: "Success",
                    description: "Fetched the data from Leetcode.",
                });
            } catch (e: any) {
                toast({
                    variant: "destructive",
                    title: "Failed",
                    description: e.message,
                });
            }
            setLoading(false);
            return false;
        },
        [listURL, toast]
    );

    const difficultyDistribution: QuestionsDifficultyDistribution =
        useMemo(() => {
            return getQuestionsDifficultyDistribution(
                result?.questions as Question[]
            );
        }, [result]);

    const handleDownload = useCallback(() => {
        try {
            generateSheet(result!);
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Failed",
                description: "Something went wrong while generating the sheet",
            });
        }
    }, [result, toast]);

    const handleUseExample = useCallback(() => {
        setListURL(exampleListURL);
    }, []);

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center mt-10"
            >
                <Input
                    name="listURL"
                    placeholder="Public Leetcode list URL"
                    className="text-md w-full sm:w-1/2 px-3 py-5"
                    value={listURL}
                    onChange={(e) => {
                        setListURL(e.target.value);
                    }}
                />
                <div className="mt-3 flex gap-x-3 items-center">
                    <Button type="submit" className="w-fit" disabled={loading}>
                        Get Spreadsheet
                    </Button>
                    <button
                        className="text-sm underline text-zinc-500"
                        onClick={handleUseExample}
                        disabled={loading}
                    >
                        Use example
                    </button>
                </div>
            </form>
            {(loading || result) && (
                <Card
                    ref={infoCardRef}
                    className="py-4 w-11/12 sm:w-9/12 2xl:w-7/12 mt-10 mx-auto scroll-m-20 animate-fade-in"
                >
                    <CardContent className="pb-0 flex flex-col md:flex-row gap-y-2 justify-between">
                        <div className="flex flex-1 justify-center items-center gap-x-2">
                            <strong>Creator:</strong>{" "}
                            {result ? (
                                <span className="animate-fade-in">
                                    {result.listMetadata.creator.realName}
                                </span>
                            ) : (
                                <Skeleton className="inline-flex w-[100px] h-[20px] rounded-full" />
                            )}
                        </div>
                        <div className="flex flex-1 justify-center items-center gap-x-2">
                            <strong>Number of problem:</strong>{" "}
                            {result ? (
                                <span className="animate-fade-in">
                                    {result.questions.length
                                        ? `${result.questions.length} (Easy: ${difficultyDistribution.easy}, Medium: ${difficultyDistribution.medium}, Hard: ${difficultyDistribution.hard})`
                                        : 0}
                                </span>
                            ) : (
                                <Skeleton className="inline-flex w-[100px] h-[20px] rounded-full" />
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {(loading || result) && (
                <Card className="mt-10 mx-auto w-11/12 sm:w-96 py-3 animate-fade-in">
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle>Download Spreadsheet</CardTitle>
                        <CardDescription className="text-center">
                            Edit the sheet for custom changes
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-3">
                        <div className="relative w-20 h-20 mx-auto">
                            {result ? (
                                <Image
                                    src="/sheet.png"
                                    alt="sheet icon"
                                    fill={true}
                                    className="animate-fade-in"
                                />
                            ) : (
                                <Skeleton className="w-full h-full rounded" />
                            )}
                        </div>
                        <h3 className="text-center text-sm font-semibold mt-3">
                            {result ? (
                                result.listMetadata.name + ".xlxs"
                            ) : (
                                <Skeleton className="inline-flex align-bottom w-20 h-5 rounded" />
                            )}
                        </h3>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="mx-auto"
                            onClick={handleDownload}
                            disabled={!result}
                        >
                            Download <DownloadIcon className="ml-2" />{" "}
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default Process;
