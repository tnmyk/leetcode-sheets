"use client";
import { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ListResult {
    creator: string,
    name: string,
    questions: any[],
    view_count: number
}
const Process = () => {
    const [result, setResult] = useState<ListResult>(null);
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        // @ts-ignore
        const url: string = e.target.lcURL.value;
        const match = url.match(/\/list\/(.+?)(?:\/|$)/);
        if (!url || !match || !match[1]) {
            return;
        }
        const id = match[1];
        const res = await fetch(`/api/list?id=${id}`)
        const resData = await res.json()
        console.log(resData)
        setResult(resData.data)
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
                <Input name="lcURL" placeholder="Public Leetcode list URL" className="text-lg w-1/2" />
                <Button className="w-fit mt-3">Submit</Button>
            </form>
            <Card className="p-4 w-10/12 mt-8 mx-auto">
                <CardContent className="pb-0 flex justify-between">
                    <div><strong>Creator:</strong> {result?.creator ?? "-"}</div>
                    <div><strong>Number of problem:</strong> {result?.questions?.length ?? "-"}</div>
                    <div><strong>View count:</strong> {result?.view_count ?? "-"}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Process;
