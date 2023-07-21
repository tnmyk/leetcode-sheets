import Process from "@/components/process";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="mt-20 sm:mt-24">
                <h1 className="text-4xl sm:text-7xl font-extrabold text-center mx-auto w-11/12 sm:w-9/12">
                    Generate spreadsheets from Leetcode lists.
                </h1>
            </div>
            <Process />
        </main>
    );
}
