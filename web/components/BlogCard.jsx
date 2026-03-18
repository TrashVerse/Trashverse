import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl mt-16 transition duration-300 ease-in-out">
      <div className="w-full h-60 relative">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-5 text-center flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">
          {post.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.id}`}
          className="text-green-600 font-semibold hover:underline mt-2"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
