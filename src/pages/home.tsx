
import Header from "../components/header.tsx";
import Sidebar from "../components/Sidebar.tsx";




// Main Content Component
export const ForYou = () => {
    const posts = [
        { id: 1, title: "Post Title 1", content: "This is a sample content for post 1." },
        { id: 2, title: "Post Title 2", content: "This is a sample content for post 2." },
        { id: 3, title: "Post Title 3", content: "This is a sample content for post 3." },
    ];

    return (
        <main className="flex-1 p-4">
            {posts.map((post) => (
                <div key={post.id} className="mb-4 p-4 border rounded shadow">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </main>
    );
};

// Home Page Component
const Home = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <ForYou />
            </div>
        </div>
    );
};

export default Home;
