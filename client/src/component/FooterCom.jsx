import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";

const FooterCom = () => {
    return (
        <Footer container className="border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link
                            to="/"
                            className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
                        >
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                                Mahi's
                            </span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://github.com/Mahi-Giri/MERN_Auth"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    MERN-AUTH
                                </Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
                                    Mahi's Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="follow Us" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://github.com/Mahi-Giri/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </Footer.Link>
                                <Footer.Link
                                    href="https://discord.gg/xRqakJgZ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Mahi's Blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="https://www.instagram.com/mahi.__.giri/" icon={BsInstagram} />
                        <Footer.Icon href="https://twitter.com/Mahi_Giri_" icon={BsTwitter} />
                        <Footer.Icon href="https://github.com/Mahi-Giri/" icon={BsGithub} />
                        <Footer.Icon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default FooterCom;
