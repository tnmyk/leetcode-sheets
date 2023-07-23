import { githubURL, personalWebsite } from "@/constants";

const Footer = () => {
    return (
        <footer className="h-14 flex text-sm text-gray-700 items-center justify-between px-3 sm:px-7 w-full border-t">
            <div>
                Built by{" "}
                <a
                    href={personalWebsite}
                    target="_blank"
                    className="font-medium"
                >
                    <u>tnmyk</u>
                </a>
            </div>
            <a href={githubURL} target="_blank" className="font-medium">
                <>Contribute on Github</>
            </a>
        </footer>
    );
};

export default Footer;
