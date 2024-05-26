export default function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex arguments-between-elements">
                {/*Logo*/}
                <div className="text-white text-xl font-bold">Your logo</div>

                {/* Navigation links */}
                <div className="hidden md:flex space-x-4">
                    <a href="#" className="text-white">Home</a>
                    <a href="#" className="text-white"> About </a>
                    <a href="#" className="text-white">Service</a>
                    <a href="#" className="text-white">Communication</a>
                </div>
            </div>
        </nav>
    );
}