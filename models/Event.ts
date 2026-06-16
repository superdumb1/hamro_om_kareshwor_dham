import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true }, // 🗓️ Actual date used for chronology engines
    time: { type: String, required: true }, // e.g., "4:00 PM onwards"
    location: { type: String, required: true },
    description: { type: String, required: true },
    tagType: { 
        type: String, 
        enum: ['Weekly', 'Festival', 'Sanitation', 'General', 'Meeting'], 
        default: 'General' 
    }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);