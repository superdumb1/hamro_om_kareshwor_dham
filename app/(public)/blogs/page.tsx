"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BlogCarousel from '../../../components/organisms/page/blogs/BlogCarousel';

// TypeScript interface describing our dynamic database blog properties
interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    readTime: string;
    slug: string;
    publishedAt: string;
    images: Array<{
        url: string;
        publicId: string;
    }>;
}

const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "History", "Festivals", "Updates"];

    // 🌟 Fetch live entries straight from your MongoDB cluster stream
    const { data: blogPosts = [], isLoading, error } = useQuery<BlogPost[]>({
        queryKey: ['public-blogs-feed'],
        queryFn: async () => {
            const res = await fetch('/api/blog');
            if (!res.ok) throw new Error('Failed to fetch chronicle data records');
            return res.json();
        }
    });

    // Handle internal filter parsing based on category selection
    const filteredPosts = selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <section id="blogs" className="py-12 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px]">
            {/* Section Title */}
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
                    Mandir <span className="text-orange-600 font-normal font-sans">Blogs & Musings</span>
                </h2>
                <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
                <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
                    Read spiritual reflections, cultural heritage stories, and regular official journals published by our Samity.
                </p>
            </div>

            {/* Category Pills */}
            <div className="mb-8 overflow-x-auto pb-2 scrollbar-none flex justify-start sm:justify-center">
                <div className="flex bg-stone-200/60 p-1 rounded-xl border border-stone-200">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 tracking-wide ${
                                selectedCategory === cat
                                    ? "bg-white text-stone-950 shadow-sm"
                                    : "text-stone-600 hover:text-stone-900"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Display Grid */}
            {isLoading ? (
                <div className="text-center py-24 text-xs font-mono font-bold text-stone-400 tracking-widest uppercase">
                    Syncing with Om Kareshwor Chronicle Feed...
                </div>
            ) : error ? (
                <div className="text-center py-16 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl max-w-md mx-auto">
                    An error occurred while building the news feed layer. Please try reloading.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => {
                            // Extract raw string asset locations out of the upload array structure safely
                            const carouselImageUrls = post.images.map(img => img.url);

                            return (
                                <article
                                    key={post.id}
                                    className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-stone-300 transition-all duration-300 hover:shadow-md"
                                >
                                    <div>
                                        {/* Dynamic Carousel initialized with uploaded Cloudinary assets */}
                                        <BlogCarousel images={carouselImageUrls} title={post.title} />

                                        <div className="p-5">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-[9px] uppercase font-bold tracking-widest text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                                    {post.category}
                                                </span>
                                                <span className="text-[11px] font-mono text-stone-400">
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug group-hover:text-orange-600 transition-colors">
                                                <a href={`/blog/${post.slug}`}>
                                                    {post.title}
                                                </a>
                                            </h3>

                                            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mx-5 mb-5 pt-3 border-t border-stone-100 flex justify-between items-center text-[11px] text-stone-400">
                                        <div>
                                            By <span className="font-semibold text-stone-700">{post.author}</span>
                                        </div>
                                        <time className="font-medium font-mono">
                                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </time>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-6">
                            <p className="text-sm text-stone-400">No journals found matching this category parameters.</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Blogs;