import { githubURL, personalWebsite } from "@/constants";

const Footer = () => {
    return (
        <footer className="flex justify-between pt-4 px-3 sm:px-7 pb-4  w-full border-t">
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
                <u>Source</u>
            </a>
        </footer>
    );
};

export default Footer;
