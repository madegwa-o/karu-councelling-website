import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import icon from "../assets/dark.png";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-2 bg-black text-white sticky top-0 z-10 shadow-md">
            {/* Left Section: Logo */}
            <div className="flex items-center gap-4">
                <img
                    src={icon}
                    alt="icon"
                    className="h-12 w-12 rounded-lg hover:scale-105 transition-transform duration-300"
                    style={{ height: "50px", width: "50px" }}
                />
                <span className="font-bold text-lg">kc club</span>
            </div>

            {/* Middle Section: Search Bar */}
            <div className="flex items-center bg-gray-800 text-gray-400 rounded-full px-3 py-1 flex-grow max-w-md">
                <FaSearch className="mr-2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent focus:outline-none text-sm text-white w-full"
                />
            </div>

            {/* Right Section: Navigation & User Profile */}
            <nav className="flex items-center gap-4">
                <a href="#" className="hover:text-gray-300">Home</a>
                <a href="#" className="hover:text-gray-300">Popular</a>
                <a href="#" className="hover:text-gray-300">Explore</a>
                <a href="#" className="hover:text-gray-300">Create</a>
                <FaBell className="text-gray-400 hover:text-white cursor-pointer" />
                <FaUserCircle className="text-gray-400 hover:text-white cursor-pointer text-2xl" />
            </nav>
        </header>
    );
}
