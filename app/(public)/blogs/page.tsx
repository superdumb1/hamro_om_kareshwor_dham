"use client";
import React, { useState } from 'react';
import BlogCarousel from '../../../components/organisms/page/blogs/BlogCarousel';

const Blogs = () => {
    // Modified blog datasets to accommodate arrays of custom image paths
    const blogPosts = [
        {
            id: 1,
            title: "The Sacred History of Om Kareshwor Siwalaya",
            excerpt: "Discover the spiritual lineage and origins of our beloved community mandir in Jyamirgadhi, and how it grew into a center for worship.",
            date: "May 24, 2026",
            author: "Samity Management",
            category: "History",
            readTime: "4 min read",
            slug: "sacred-history",
            images: [
                "https://images.unsplash.com/photo-1609137144813-7d68cd15579d?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop"
            ]
        },
        {
            id: 2,
            title: "Mahashivaratri 2026: A Grand Celebration Recapped",
            excerpt: "A heartfelt thank you to the thousands of devotees who joined us for worship, night vigils, and partook in the holy prasad distribution.",
            date: "March 20, 2026",
            author: "Pooja Committee",
            category: "Festivals",
            readTime: "3 min read",
            slug: "mahashivaratri-2026-recap",
            images: [
                "https://images.unsplash.com/photo-1630948332155-27a3c7540cb7?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1561361531-99522c3a1211?q=80&w=600&auto=format&fit=crop"
            ]
        },
        {
            id: 3,
            title: "Temple Preservation and Future Construction Updates",
            excerpt: "An open review of our ongoing infrastructural improvements, boundary wall restoration, and how the donor fund allocations are being managed.",
            date: "January 15, 2026",
            author: "Nirman Samity",
            category: "Updates",
            readTime: "5 min read",
            slug: "construction-updates-jan-2026",
            images: [
                "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop"
            ]
        }
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "History", "Festivals", "Updates"];

    const filteredPosts = selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <section id="blogs" className="py-10 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px]">
            {/* Section Title */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
                    Mandir <span className="text-orange-600 font-normal font-sans">Blogs & Musings</span>
                </h2>
                <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
                <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
                    Read spiritual reflections, cultural heritage stories, and regular official journals published by our Samity.
                </p>
            </div>

            {/* Category Pills Navigation */}
            <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
                <ul className="flex items-center justify-start sm:justify-center m-0 p-0 list-none whitespace-nowrap">
                    {categories.map((cat) => (
                        <li key={cat} className="p-1">
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 tracking-wide ${selectedCategory === cat
                                        ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-100"
                                    }`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-stone-300 transition-colors duration-150"
                        >
                            <div>
                                {/* Embedded Carousel Handler Instead of static image element */}
                                <BlogCarousel images={post.images} title={post.title} />

                                {/* Card Content Pad */}
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-2.5">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                                            {post.category}
                                        </span>
                                        <span className="text-[11px] text-stone-400 font-medium">
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug hover:text-orange-600 transition-colors">
                                        <a href={`#blogs/${post.slug}`}>
                                            {post.title}
                                        </a>
                                    </h3>

                                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer Detail */}
                            <div className="mx-5 mb-5 pt-3 border-t border-stone-100 flex justify-between items-center text-[11px] text-stone-400">
                                <div>
                                    By <span className="font-semibold text-stone-700">{post.author}</span>
                                </div>
                                <time className="font-medium">{post.date}</time>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-stone-200/60 p-6">
                        <p className="text-sm text-stone-500">No journals found in this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blogs;