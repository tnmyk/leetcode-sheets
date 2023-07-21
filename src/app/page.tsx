import Process from "@/components/process";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="mt-24">
                <h1 className="text-7xl font-extrabold text-center mx-auto w-10/12">
                    Generate spreadsheets from Leetcode lists.
                </h1>
            </div>
            <Process />
        </main>
    );
}
