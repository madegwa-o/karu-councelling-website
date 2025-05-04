import { FaPlus, FaFireAlt, FaUserFriends } from "react-icons/fa";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 sticky top-16">
            {/* Custom Feeds Section */}
            <div>
                <h2 className="text-gray-900 font-semibold text-lg mb-3">Custom Feeds</h2>
                <ul className="space-y-2">
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
                        >
                            <FaPlus className="text-gray-400" />
                            Create a custom feed
                        </a>
                    </li>
                </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Communities Section */}
            <div>
                <h2 className="text-gray-900 font-semibold text-lg mb-3">Communities</h2>
                <ul className="space-y-2">
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
                        >
                            <FaUserFriends className="text-gray-400" />
                            r/LearnSpringBoot
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
                        >
                            <FaUserFriends className="text-gray-400" />
                            r/ProgrammerHumor
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
                        >
                            <FaUserFriends className="text-gray-400" />
                            r/rust
                        </a>
                    </li>
                </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Trending Section */}
            <div>
                <h2 className="text-gray-900 font-semibold text-lg mb-3">Trending</h2>
                <ul className="space-y-2">
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition"
                        >
                            <FaFireAlt className="text-red-500" />
                            Trending Posts
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
