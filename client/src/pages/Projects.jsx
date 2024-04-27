import CallToAction from "../component/CallToAction";

const Projects = () => {
    return (
        <div className=" pb-32 max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
            <h1 className="text-3xl font-semibold">Projects</h1>
            <p className="text-md text-gray-500 italic">
                Build fun and engaging projects while learning HTML, CSS, and JavaScript!
            </p>
            <CallToAction />
        </div>
    );
};

export default Projects;
