import Link from "next/link";
const Nav = () => {
    return (
        <nav className="flex justify-between font-bold">
            <Link href="/" className="text-xl">Leetcode Lists</Link>
            <div className="flex gap-x-3 text-md">
                <a href="" target="_blank">Github</a>
            </div>
        </nav>
    );
};

export default Nav;
