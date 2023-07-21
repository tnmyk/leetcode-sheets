"use client";
import { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ListResponse, Question } from "@/types";
import { utils as xlsx, writeFile } from 'xlsx';
const Process = () => {
    const [result, setResult] = useState<ListResponse | null>(null);

    const generateSheet = (rows: Question[]) => {
        const filtered = rows.map(r => { return { no: r.no, title: r.title } });
        const worksheet = xlsx.json_to_sheet(filtered);
        const workbook = xlsx.book_new();
        xlsx.book_append_sheet(workbook, worksheet, "Sheet 1");
        xlsx.sheet_add_aoa(worksheet, [["No.", "Problem"]], { origin: "A1" })
        rows.forEach((row, index) => {
            worksheet[`B${index + 2}`].l = { Target: row.url, Tooltip: "Open problem" }
        })
        writeFile(workbook, "Test.xlsx", { compression: true })
    }

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
        const jsonData = await res.json();
        const data: ListResponse | null = jsonData.data;
        if (!data) return;
        generateSheet(data.questions);
        setResult(data)
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
                <Input name="lcURL" placeholder="Public Leetcode list URL" className="text-lg w-1/2 px-3 py-5" />
                <Button className="w-fit mt-3">Get Spreadsheet</Button>
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
