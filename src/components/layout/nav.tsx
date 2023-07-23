import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { githubURL } from "@/constants";
const Nav = () => {
    return (
        <nav className="flex h-14 pt-1 border-b px-3 sm:px-10 justify-between items-center bg-white text-zinc-700">
            <Link href="/" className="text-lg font-bold">
                <span className="text-leetcode">Leet</span><span >code</span> <span className="text-sheets">Sheets</span>
            </Link>
            <div className="flex gap-x-3 font-medium text-sm">
                <a href={githubURL} target="_blank">
                    Github{" "}
                    <GitHubLogoIcon className="inline-flex align-[-2px]" />{" "}
                </a>
            </div>
        </nav>
    );
};

export default Nav;
