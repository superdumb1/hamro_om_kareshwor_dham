import { NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Post from '@/models/Posts';

function generateSlug(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}


export async function POST(request: Request) {
    try {
        await connect();
        const body = await request.json();
        
        const { title, excerpt, content, category, author, readTime, images } = body;

        if (!title || !excerpt || !content) {
            return NextResponse.json({ error: "Missing required text details" }, { status: 400 });
        }

        if (!images || images.length === 0) {
            return NextResponse.json({ error: "Please upload at least one image" }, { status: 400 });
        }

        const slug = `${generateSlug(title)}-${Date.now().toString().slice(-4)}`;

        const newPost = await Post.create({
            title,
            slug,
            excerpt,
            content,
            category,
            author: author || 'Samity Management',
            readTime: readTime || '3 min read',
            images, // Array of { url, publicId } passed directly from state
            isPublished: true
        });

        return NextResponse.json({ success: true, postId: newPost._id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Internal failure" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connect();
        
        // Fetch published blogs, newest first
        const posts = await Post.find({ isPublished: true })
            .sort({ publishedAt: -1 })
            .lean();

        const formattedPosts = posts.map((doc: any) => ({
            id: doc._id.toString(),
            title: doc.title,
            slug: doc.slug,
            excerpt: doc.excerpt,
            content: doc.content,
            category: doc.category,
            author: doc.author,
            readTime: doc.readTime,
            images: doc.images || [],
            publishedAt: doc.publishedAt
        }));

        return NextResponse.json(formattedPosts, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}