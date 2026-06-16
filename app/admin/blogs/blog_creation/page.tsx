"use client";
import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BlogCreationForm = () => {
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Updates',
        author: 'Samity Management',
        readTime: '3 min read'
    });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    // Handle standard batch files additions and clear old object url references safely
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles(filesArray);

            // Generate clean temporary blobs for image grids previews UI feedback
            const previewUrls = filesArray.map(file => URL.createObjectURL(file));
            setPreviews(previewUrls);
        }
    };

    const addPostMutation = useMutation({
        mutationFn: async (payload: FormData) => {
            const res = await fetch('/api/blog', {
                method: 'POST',
                body: payload
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to submit notice log');
            }
            return res.json();
        },
        onSuccess: () => {
            alert('Journal entry and multi-carousel assets published live!');
            setForm({ title: '', excerpt: '', content: '', category: 'Updates', author: 'Samity Management', readTime: '3 min read' });
            setSelectedFiles([]);
            setPreviews([]);
            if (fileInputRef.current) fileInputRef.current.value = '';
            queryClient.invalidateQueries({ queryKey: ['admin-blogs-list'] });
        },
        onError: (err: Error) => {
            alert(`Error processing operation: ${err.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            alert('Please select at least one gallery image for the blog post.');
            return;
        }

        const data = new FormData();
        data.append('title', form.title);
        data.append('excerpt', form.excerpt);
        data.append('content', form.content);
        data.append('category', form.category);
        data.append('author', form.author);
        data.append('readTime', form.readTime);

        // Append files using the exact same key name to let next.js read it as an array
        selectedFiles.forEach((file) => {
            data.append('images', file);
        });

        addPostMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-sm max-w-2xl text-stone-800 text-xs">
            <h2 className="text-sm font-bold uppercase font-serif border-b border-stone-100 pb-2 text-stone-900">
                Compose New Media Post
            </h2>

            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Article Title</label>
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Mahashivaratri Construction Progress Logs"
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-medium"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Category Classification</label>
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none text-stone-700 font-semibold cursor-pointer bg-stone-50"
                    >
                        <option value="History">History</option>
                        <option value="Festivals">Festivals</option>
                        <option value="Updates">Updates</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Author Credit</label>
                    <input
                        type="text"
                        value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Brief Excerpt</label>
                <input
                    type="text"
                    required
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="Summarize the core premise of this article log snippet in two lines..."
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Body Context Content (Supports Markdown Syntax Layouts)</label>
                <textarea
                    rows={8}
                    required
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Use standard markdown formatting structure labels if desired. E.g., ## Subheading here or * Bullet points..."
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none font-mono text-stone-700 leading-relaxed"
                />
            </div>

            {/* Carousel Files Input Area */}
            <div className="pt-2 border-t border-stone-100">
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-2">
                    Media Gallery Pool Assets (Select single or multiple images to deploy carousel)
                </label>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    required
                    onChange={handleFileChange}
                    className="w-full text-stone-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-stone-900 file:text-stone-100 hover:file:bg-stone-800 cursor-pointer"
                />

                {/* Previews grid block renderer layout element */}
                {previews.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-3 p-2 bg-stone-50 border border-stone-200 rounded-lg">
                        {previews.map((src, idx) => (
                            <div key={idx} className="relative aspect-video rounded-md overflow-hidden border border-stone-200 group bg-stone-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt="Preview asset node slot" className="w-full h-full object-cover" />
                                <span className="absolute top-1 left-1 bg-stone-950/80 text-[8px] px-1 font-mono rounded text-white font-bold shadow-sm">
                                    Slot {idx + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={addPostMutation.isPending}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-40"
            >
                {addPostMutation.isPending ? 'Uploading Media Cluster & Syncing Engine...' : 'Publish Entry To Chronicle Feed'}
            </button>
        </form>
    );
};

export default BlogCreationForm;