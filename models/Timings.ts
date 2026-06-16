// models/Timings.js
import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
    start: { type: String, required: true }, // e.g., "05:00"
    end: { type: String, required: true },
    label: { type: String, required: true }
}, { _id: false });

const WeeklySchema = new mongoose.Schema({
    dayIndex: { type: Number, required: true, min: 0, max: 6 }, // 0 = Sunday
    slots: [SlotSchema],
    isClosed: { type: Boolean, default: false }
}, { _id: false });

const TimingsSchema = new mongoose.Schema({
    effectiveDate: { type: Date, required: true, index: true }, 
    weeklyTemplate: [WeeklySchema],
    version: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

// Compound index to quickly find the latest active schedule
TimingsSchema.index({ effectiveDate: -1 });

export default mongoose.models.Timings || mongoose.model('Timings', TimingsSchema);