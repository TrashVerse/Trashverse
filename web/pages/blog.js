import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${BASE_URL}/api/blog`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="pt-20">
      <Navbar />
      <section className="container mx-auto px-10 py-18 mt-30 h-100 mb-50">
        <h1 className="text-3xl font-bold text-center text-green-600">
          Blog Updates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}