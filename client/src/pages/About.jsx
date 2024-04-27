const About = () => {
    return (
        <div className="pb-20 flex items-center justify-center">
            <div className="max-w-2xl mx-auto p-3 text-center">
                <div>
                    <h1 className="text-3xl font-semibold text-center my-7">About Mahi's Blog</h1>
                    <div className="text-md text-gray-500 flex flex-col gap-6 italic">
                        <p>
                            Welcome to Mahi's Blog! This blog was created by Mahesh Giri as a personal project to share
                            his thoughts and ideas with the world. Mahi is a passionate developer who loves to write
                            about technology, coding, and everything in between.
                        </p>
                        <p>
                            On this blog, you'll find weekly articles and tutorials on topics such as web development,
                            software engineering, and programming languages. Mahi is always learning and exploring new
                            technologies, so be sure to check back often for new content!
                        </p>
                        <p>
                            We encourage you to leave comments on our posts and engage with other readers. You can like
                            other people's comments and reply to them as well. We believe that a community of learners
                            can help each other grow and improve.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
