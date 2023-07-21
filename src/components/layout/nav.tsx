import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { githubURL } from "@/constants";
const Nav = () => {
    return (
        <nav className="flex pt-6 px-3 sm:px-10 justify-between font-bold">
            <Link href="/" className="text-xl">Leetcode Lists</Link>
            <div className="flex gap-x-3 text-md">
                <a href={githubURL} target="_blank">Github <GitHubLogoIcon className="inline-flex align-[-1px]" />  </a>
            </div>
        </nav>
    );
};

export default Nav;
