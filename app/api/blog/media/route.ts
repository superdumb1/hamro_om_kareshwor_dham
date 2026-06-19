import { NextResponse } from 'next/server';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// POST: Upload an individual image to Cloudinary instantly
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file || file.size === 0) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

        const cloudinaryResult = await uploadImage(base64Data, {
            folder: 'hamro_om_kareshwor_dham_blogs',
        });

        return NextResponse.json({
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id
        }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
    }
}

// DELETE: Remove an individual asset from Cloudinary when "X" is clicked
export async function DELETE(request: Request) {
    try {
        const { publicId } = await request.json();
        if (!publicId) {
            return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
        }

        const result = await deleteImage(publicId);
        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Deletion failed" }, { status: 500 });
    }
}