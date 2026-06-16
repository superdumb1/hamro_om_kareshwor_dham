import { NextResponse } from 'next/server';
import { connect } from '@/lib/db'; 
import mongoose from 'mongoose';
import { uploadImage } from '@/lib/cloudinary'; // Bundled directly from your upload script

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    memberId: { type: String, required: true, unique: true }, // Added strict indexing
    joinedDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Active Member' },
    verificationDocs: {
        frontSide: {
            url: String,
            publicId: String
        },
        backSide: {
            url: String,
            publicId: String
        }
    }
});

const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema);

export async function GET(request: Request) {
    try {
        await connect();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const sortKey = searchParams.get('sortKey') || 'joinedDate';
        const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;

        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } },
                { memberId: { $regex: search, $options: 'i' } }
            ];
        }

        const dbResults = await Member.find(query).sort({ [sortKey]: sortOrder }).lean();

        const processedPayload = dbResults.map((doc: any) => ({
            id: doc._id.toString(),
            name: doc.name,
            address: doc.address,
            memberId: doc.memberId,
            status: doc.status || 'Active Member',
            verificationDocs: doc.verificationDocs || null,
            joinedDate: new Date(doc.joinedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            })
        }));

        return NextResponse.json(processedPayload, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connect();
        
        // Parse incoming multipart data profile map
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const address = formData.get('address') as string;
        const memberId = formData.get('memberId') as string;
        const status = formData.get('status') as string;
        
        const frontFile = formData.get('frontSide') as File | null;
        const backFile = formData.get('backSide') as File | null;

        if (!name || !address || !memberId || !frontFile || !backFile) {
            return NextResponse.json({ error: "Missing required core fields or verification files" }, { status: 400 });
        }

        // Check for conflicts before consuming Cloudinary bandwidth
        const existingMember = await Member.findOne({ memberId });
        if (existingMember) {
            return NextResponse.json({ error: "This Member ID Code already exists in system records" }, { status: 400 });
        }

        // Process buffers to feed directly into your Cloudinary engine helper
        const frontBuffer = Buffer.from(await frontFile.arrayBuffer());
        const backBuffer = Buffer.from(await backFile.arrayBuffer());

        // Concurrent upload pipelines executing together
        const [frontUpload, backUpload] = await Promise.all([
            uploadImage(`data:${frontFile.type};base64,${frontBuffer.toString('base64')}`, { folder: 'samity_verification' }),
            uploadImage(`data:${backFile.type};base64,${backBuffer.toString('base64')}`, { folder: 'samity_verification' })
        ]);

        const newDoc = await Member.create({
            name,
            address,
            memberId,
            status,
            joinedDate: new Date(),
            verificationDocs: {
                frontSide: { url: frontUpload.secure_url, publicId: frontUpload.public_id },
                backSide: { url: backUpload.secure_url, publicId: backUpload.public_id }
            }
        });

        return NextResponse.json({ success: true, docId: newDoc._id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}