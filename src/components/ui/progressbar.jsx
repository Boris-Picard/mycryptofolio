export default function Progressbar({ steps }) {
    return (
        <div className="my-5 w-full">
            <div className="w-full bg-black rounded-full dark:bg-gray-700">
                <div
                    className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-out ${steps === 1 ? "bg-blue-600 w-0" : "bg-blue-600 w-1/2"
                        }`}
                >
                    {steps === 1 ? "0%" : "50%"}
                </div>
            </div>
        </div>
    );
}
