import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl mt-16 transition duration-300 ease-in-out">
      <div className="w-full h-60 relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 text-center flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

        <Link
          to={`/blog/${post.id}`}
          className="text-green-600 font-semibold hover:underline mt-2"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
