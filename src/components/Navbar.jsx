import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-xl font-bold">#</div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="text-white">Add a coin</Link>
                    <Link to="/seecoins" className="text-white">See my coins</Link>
                    <Link to="/signin" className="text-white">Sign In</Link>
                    <Link to="/signup" className="text-white">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}
