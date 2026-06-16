import { NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Post from '@/models/Posts';

// Dynamic Slug Generator Helper function
function generateSlug(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

export async function POST(request: Request) {
    try {
        await connect();
        console.log("Received POST request to create a new blog post");
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const content = formData.get('content') as string;
        const category = formData.get('category') as string;
        const author = formData.get('author') as string;
        const readTime = formData.get('readTime') as string;

        // Validation for texts fields only while testing asset bypass modes
        if (!title || !excerpt || !content) {
            return NextResponse.json({ error: "Missing required text details" }, { status: 400 });
        }

        const slug = `${generateSlug(title)}-${Date.now().toString().slice(-4)}`;

        /* 
           🚧 CLOUDINARY TIMEOUT BYPASS:
           We mock a valid schema array shape inline so Mongoose doesn't throw validation errors 
           if your Post model is expecting objects containing { url, publicId }.
        */
        const mockUploadedImages = [
            {
                url: "https://images.unsplash.com/photo-1609137144813-7d68cd15579d?q=80&w=600",
                publicId: "mock_asset_reference_1"
            }
        ];
        
        // ✅ Fixed syntax: Comma placed right after images property value!
        const newPost = await Post.create({
            title,
            slug,
            excerpt,
            content,
            category,
            author: author || 'Samity Management',
            readTime: readTime || '3 min read',
            images: mockUploadedImages,    
            isPublished: true
        });

        return NextResponse.json({ success: true, postId: newPost._id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
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