import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // Markdown String content
    category: { type: String, default: 'General Notice' },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    images: [{
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    }],
    author: { type: String, default: 'Samity Management' },
    readTime: { type: String, default: '3 min read' }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);