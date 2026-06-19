"use client";
import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BLOG_TRANSLATIONS } from '@/translations/blogTranslations';
import { useLanguage } from '@/providers/LanguageToggle';

interface CloudinaryImage {
    url: string;
    publicId: string;
}

interface LocalPreview {
    id: string;
    url: string;
    isUploading: boolean;
    publicId?: string;
}

const BlogCreationForm = () => {
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Connect to global language context and translation dictionary
    const { lang } = useLanguage();
    const t = BLOG_TRANSLATIONS[lang];

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Updates', // Default matching backend enum
        author: 'Samity Management',
        readTime: '3 min read'
    });

    const [images, setImages] = useState<LocalPreview[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);

        const newUploads: LocalPreview[] = filesArray.map(file => ({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            url: URL.createObjectURL(file),
            isUploading: true
        }));

        setImages(prev => [...prev, ...newUploads]);

        await Promise.all(
            filesArray.map(async (file, index) => {
                const correspondingTarget = newUploads[index];
                if (file.size === 0) return;

                const data = new FormData();
                data.append('image', file);

                try {
                    const res = await fetch('/api/blog/media', {
                        method: 'POST',
                        body: data
                    });
                    if (!res.ok) throw new Error('Upload failed');
                    
                    const uploadedAsset: CloudinaryImage = await res.json();

                    setImages(prev => 
                        prev.map(img => 
                            img.id === correspondingTarget.id 
                                ? { ...img, isUploading: false, url: uploadedAsset.url, publicId: uploadedAsset.publicId }
                                : img
                        )
                    );
                } catch (err) {
                    setImages(prev => prev.filter(img => img.id !== correspondingTarget.id));
                    alert(`${t.alertUploadFail} ${file.name}`);
                }
            })
        );

        if (fileInputRef.current) fileInputRef.current.value = ''; 
    };

    const handleRemoveImage = async (id: string, publicId?: string) => {
        setImages(prev => prev.filter(img => img.id !== id));

        if (!publicId) return;

        try {
            const res = await fetch('/api/blog/media', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId })
            });
            if (!res.ok) console.error("Cloudinary asset deletion failed.");
        } catch (err) {
            console.error("Network problem reaching media removal api:", err);
        }
    };

    const addPostMutation = useMutation({
        mutationFn: async (payload: any) => {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to submit post');
            }
            return res.json();
        },
        onSuccess: () => {
            alert(t.alertSuccess);
            images.forEach(img => { if (img.url.startsWith('blob:')) URL.revokeObjectURL(img.url); });
            
            setForm({ title: '', excerpt: '', content: '', category: 'Updates', author: 'Samity Management', readTime: '3 min read' });
            setImages([]);
            queryClient.invalidateQueries({ queryKey: ['admin-blogs-list'] });
        },
        onError: (err: Error) => {
            alert(`${t.alertError}: ${err.message}`);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const finalizedImages = images
            .filter(img => !img.isUploading && img.publicId && img.url)
            .map(img => ({ url: img.url, publicId: img.publicId! }));

        if (finalizedImages.length === 0) {
            alert(t.alertMinImages);
            return;
        }

        addPostMutation.mutate({
            ...form,
            images: finalizedImages
        });
    };

    const processingMedia = images.some(img => img.isUploading);

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-sm max-w-2xl text-stone-800 text-xs">
            <h2 className="text-sm font-bold uppercase font-serif border-b border-stone-100 pb-2 text-stone-900">
                {t.formHeader}
            </h2>

            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelTitle}</label>
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:border-orange-500 font-medium"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelCategory}</label>
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none text-stone-700 font-semibold cursor-pointer bg-stone-50"
                    >
                        <option value="History">{t.catHistory}</option>
                        <option value="Festivals">{t.catFestivals}</option>
                        <option value="Updates">{t.catUpdates}</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelAuthor}</label>
                    <input
                        type="text"
                        value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelExcerpt}</label>
                <input
                    type="text"
                    required
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">{t.labelContent}</label>
                <textarea
                    rows={6}
                    required
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none font-mono text-stone-700 leading-relaxed"
                />
            </div>

            <div className="pt-2 border-t border-stone-100">
                <label className="block text-[10px] font-bold uppercase text-stone-500 mb-2">
                    {t.labelMedia} {processingMedia && <span className="text-orange-600 normal-case ml-2 animate-pulse">{t.uploadingMsg}</span>}
                </label>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="w-full text-stone-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-stone-900 file:text-stone-100 hover:file:bg-stone-800 cursor-pointer"
                />

                {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-3 p-2 bg-stone-50 border border-stone-200 rounded-lg">
                        {images.map((img, idx) => (
                            <div key={img.id} className="relative aspect-video rounded-md overflow-hidden border border-stone-200 bg-stone-200 group">
                                <img src={img.url} alt="Gallery item" className={`w-full h-full object-cover transition-opacity duration-200 ${img.isUploading ? 'opacity-40 shadow-inner' : 'opacity-100'}`} />
                                
                                {img.isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900/10 backdrop-blur-[1px]">
                                        <div className="w-5 h-5 border-2 border-stone-300 border-t-orange-600 rounded-full animate-spin"></div>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(img.id, img.publicId)}
                                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center text-[9px] shadow cursor-pointer transition-colors z-10"
                                    title="Delete image asset"
                                >
                                    ✕
                                </button>
                                
                                <span className="absolute bottom-1 left-1 bg-stone-950/80 text-[8px] px-1 font-mono rounded text-white font-bold">
                                    {t.slotText} {idx + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={addPostMutation.isPending || processingMedia}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-40"
            >
                {addPostMutation.isPending ? t.btnPending : t.btnSubmit}
            </button>
        </form>
    );
};

export default BlogCreationForm;