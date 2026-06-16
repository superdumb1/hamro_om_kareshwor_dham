import { NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Event from '@/models/Event';

// POST Method: Save new administrative events
export async function POST(request: Request) {
    try {
        await connect();
        const body = await request.json();
        const { title, date, time, location, description, tagType } = body;

        if (!title || !date || !time || !location || !description) {
            return NextResponse.json({ error: "Missing required event fields" }, { status: 400 });
        }

        const newEvent = await Event.create({
            title,
            date: new Date(date),
            time,
            location,
            description,
            tagType
        });

        return NextResponse.json({ success: true, eventId: newEvent._id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// GET Method: Fetch and automatically partition events chronologically
export async function GET() {
    try {
        await connect();
        
        // Use the start of today as the milestone threshold line
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const allEvents = await Event.find({}).lean();

        // Helper mapper to translate schema fields to frontend formats
        const formatPayload = (docs: any[]) => docs.map(doc => ({
            id: doc._id.toString(),
            title: doc.title,
            time: doc.time,
            location: doc.location,
            description: doc.description,
            tag: doc.tagType,
            // Format to a clean human-readable date
            date: new Date(doc.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            rawDate: doc.date
        }));

        // Query database partitions
        const upcomingDocs = await Event.find({ date: { $gte: today } }).sort({ date: 1 }).lean();
        const pastDocs = await Event.find({ date: { $lt: today } }).sort({ date: -1 }).lean();

        return NextResponse.json({
            upcoming: formatPayload(upcomingDocs),
            past: formatPayload(pastDocs)
        }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}