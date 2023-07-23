import Process from "@/components/process";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="mt-20 sm:mt-24">
                <h1 className="text-4xl sm:text-7xl font-extrabold text-center mx-auto w-11/12 sm:w-9/12 text-zinc-700">
                    Generate <span className="text-sheets">spreadsheets</span> from <span className="text-leetcode">Leet</span><span className="text-gray-950">code</span> lists.
                </h1>
            </div>
            <Process />
        </main>
    );
}
