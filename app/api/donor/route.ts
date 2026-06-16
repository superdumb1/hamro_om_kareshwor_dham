import { NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Donor from '@/models/Donor';

// POST: Register a new donation with dual-side identity scans
export async function POST(request: Request) {
    try {
        await connect();
        const body = await request.json();
        
        const { 
            fullName, address, donationType, amount, 
            itemDonated, tributeItem, contactNumber, 
            isAnonymous, receivedDate, nagariktaFrontUrl, nagariktaBackUrl 
        } = body;

        // Validation based on donation type
        if (!fullName || !address || !donationType) {
            return NextResponse.json({ error: "Missing required identity fields" }, { status: 400 });
        }

        if (donationType === 'Cash' && (!amount || amount <= 0)) {
            return NextResponse.json({ error: "Please provide a valid cash amount" }, { status: 400 });
        }

        if (donationType === 'Material Asset' && !itemDonated) {
            return NextResponse.json({ error: "Please describe the material asset donated" }, { status: 400 });
        }

        const newDonor = await Donor.create({
            fullName,
            address,
            donationType,
            amount: donationType === 'Cash' ? Number(amount) : null,
            itemDonated: donationType === 'Material Asset' ? itemDonated : undefined,
            tributeItem,
            contactNumber,
            isAnonymous: Boolean(isAnonymous),
            receivedDate: receivedDate ? new Date(receivedDate) : new Date(),
            // Map our updated image keys safely
            nagariktaFrontUrl: nagariktaFrontUrl || '',
            nagariktaBackUrl: nagariktaBackUrl || ''
        });

        return NextResponse.json({ success: true, donorId: newDonor._id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// GET: Fetch all records (Keeps confidential files safe from raw public exposure layouts)
export async function GET() {
    try {
        await connect();
        
        const records = await Donor.find({}).sort({ receivedDate: -1 }).lean();

        const formattedRecords = records.map((doc: any) => ({
            id: doc._id.toString(),
            fullName: doc.isAnonymous ? "Anonymous (Spiritual Donor)" : doc.fullName,
            address: doc.address,
            donationType: doc.donationType,
            displayValue: doc.donationType === 'Cash' 
                ? `रू ${doc.amount?.toLocaleString('en-NP')}` 
                : doc.itemDonated,
            tributeItem: doc.tributeItem || 'General Fund',
            isAnonymous: doc.isAnonymous,
            receivedDate: new Date(doc.receivedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
            // NOTE: Identity URLs omitted here to keep public queries secure from scrapers
        }));

        return NextResponse.json(formattedRecords, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}