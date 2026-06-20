"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/providers/LanguageToggle';
import { BLOG_TRANSLATIONS } from '@/translations/publicBlogTranslations';
import BlogCarousel from '../../../components/organisms/page/blogs/BlogCarousel';

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
    images: Array<{ url: string; publicId: string; }>;
}

const Blogs = () => {
    const { lang } = useLanguage();
    const t = BLOG_TRANSLATIONS[lang];
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    // Map internal keys to translated category names for the UI buttons
    const categories = [
        { key: "All", label: t.all },
        { key: "History", label: t.history },
        { key: "Festivals", label: t.festivals },
        { key: "Updates", label: t.updates }
    ];

    const { data: blogPosts = [], isLoading, error } = useQuery<BlogPost[]>({
        queryKey: ['public-blogs-feed'],
        queryFn: async () => {
            const res = await fetch('/api/blog');
            if (!res.ok) throw new Error('Failed to fetch chronicle data');
            return res.json();
        }
    });

    const filteredPosts = selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <section id="blogs" className="py-12 px-4 max-w-7xl mx-auto bg-stone-50 min-h-[500px]">
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
                    Mandir <span className="text-orange-600 font-normal font-sans">{t.sectionTitle}</span>
                </h2>
                <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2 rounded-full" />
                <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
                    {t.subtitle}
                </p>
            </div>

            <div className="mb-8 overflow-x-auto pb-2 scrollbar-none flex justify-start sm:justify-center">
                <div className="flex bg-stone-200/60 p-1 rounded-xl border border-stone-200">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 tracking-wide ${
                                selectedCategory === cat.key
                                    ? "bg-white text-stone-950 shadow-sm"
                                    : "text-stone-600 hover:text-stone-900"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-24 text-xs font-mono font-bold text-stone-400 tracking-widest uppercase">{t.loading}</div>
            ) : error ? (
                <div className="text-center py-16 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl max-w-md mx-auto">{t.error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                        <article key={post.id} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-stone-300 transition-all duration-300 hover:shadow-md">
                            <div>
                                <BlogCarousel images={post.images.map(img => img.url)} title={post.title} />
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[9px] uppercase font-bold tracking-widest text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                            {post.category}
                                        </span>
                                        <span className="text-[11px] font-mono text-stone-400">{post.readTime} {t.readTime}</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug group-hover:text-orange-600 transition-colors">
                                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                                    </h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed line-clamp-3">{post.excerpt}</p>
                                </div>
                            </div>
                            <div className="mx-5 mb-5 pt-3 border-t border-stone-100 flex justify-between items-center text-[11px] text-stone-400">
                                <div>{t.by} <span className="font-semibold text-stone-700">{post.author}</span></div>
                                <time className="font-medium font-mono">
                                    {new Date(post.publishedAt).toLocaleDateString(lang === 'ne' ? 'ne-NP' : 'en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                </time>
                            </div>
                        </article>
                    )) : (
                        <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-6">
                            <p className="text-sm text-stone-400">{t.noBlogs}</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Blogs;