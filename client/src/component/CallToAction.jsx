import { Button } from "flowbite-react";

const CallToAction = () => {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex-1 justify-center flex flex-col">
                <h2 className="text-2xl">Want to learn more about Javascript & React?</h2>
                <p className="text-gray-500 my-2">Checkout this resources with JavaScript & React Project</p>
                <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
                    <a href="https://github.com/mahi-giri" target="_blank" rel="noopener noreferrer">
                        JavaScript & React
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://blog.boot.dev/img/800/bestwaystolearnJavaScript.webp" alt="JS Image" />
            </div>
        </div>
    );
};

export default CallToAction;
