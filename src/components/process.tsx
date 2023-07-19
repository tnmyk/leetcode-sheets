"use client";
import { FormEventHandler } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "./ui/card";

const Process = () => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        const url = e.target.lcURL.value;
        e.preventDefault();
    };
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
                <Input name="lcURL" placeholder="Public Leetcode list URL" className="text-lg w-1/2" />
                <Button className="w-fit mt-3">Submit</Button>
            </form>
            <Card className="p-4 w-10/12 mt-8 mx-auto">
                <CardContent className="pb-0 flex justify-between">
                    <div><strong>Creator:</strong> username</div>
                    <div><strong>Number of problem:</strong> 777</div>
                    <div><strong>Easy:</strong> 777</div>
                    <div><strong>Medium:</strong> 777</div>
                    <div><strong>Hard:</strong> 777</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Process;
