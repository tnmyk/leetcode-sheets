import { githubURL, personalWebsite } from "@/constants";

const Footer = () => {
    return (
        <footer className="flex justify-between p-4 pb-5  w-4/5 mx-auto border-t mt-24">
            <div>
                Built by{" "}
                <a href={personalWebsite} target="_blank" className="font-medium">
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
