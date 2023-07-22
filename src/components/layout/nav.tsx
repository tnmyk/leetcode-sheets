import Link from "next/link";
import { GitHubLogoIcon, ViewGridIcon } from "@radix-ui/react-icons";
import { githubURL } from "@/constants";
const Nav = () => {
    return (
        <nav className="flex pt-5 pb-4 border-b px-3 sm:px-10 justify-between items-center bg-white">
            <Link href="/" className="text-lg font-bold tracking-wide">
                <ViewGridIcon className="inline-flex align-[-4px] w-5 h-5 mr-1" />{"  "}
                Leetcode Lists
            </Link>
            <div className="flex gap-x-3 font-medium">
                <a href={githubURL} target="_blank">
                    Github{" "}
                    <GitHubLogoIcon className="inline-flex align-[-1px]" />{" "}
                </a>
            </div>
        </nav>
    );
};

export default Nav;
