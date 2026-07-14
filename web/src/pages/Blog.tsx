import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

const samplePosts = [
  {
    id: 1,
    title: "Welcome to Trashverse",
    excerpt: "Introducing our new platform for waste management and sustainability.",
    image: "/images/blog1.png",
  },
  {
    id: 2,
    title: "Tips for Reducing Waste",
    excerpt: "Learn simple ways to minimize your environmental impact.",
    image: "/images/blog2.png",
  },
  {
    id: 3,
    title: "Upcoming Features",
    excerpt: "Exciting new updates coming soon to Trashverse.",
    image: "/images/blog3.png",
  },
];

export default function Blog() {
  return (
    <div className="pt-20">
      <Navbar />
      <section className="container mx-auto px-10 py-18 mt-30 h-100 mb-50">
        <h1 className="text-3xl font-bold text-center justify-center items-center h-20 text-green-600">
          Trash Coach
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {samplePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
