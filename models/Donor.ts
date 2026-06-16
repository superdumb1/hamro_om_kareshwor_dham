import mongoose from 'mongoose';

const DonorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    donationType: { 
        type: String, 
        enum: ['Cash', 'Material Asset'], 
        default: 'Cash' 
    },
    amount: { type: Number, default: null }, // Only populated if donationType is 'Cash'
    itemDonated: { type: String, default: '' }, // e.g., "50 Bags of OPC Cement"
    tributeItem: { type: String, default: '' }, // Dedicated infrastructure notes
    contactNumber: { type: String, default: '' },
    isAnonymous: { type: Boolean, default: false },
    receivedDate: { type: Date, default: Date.now },
    // 🇳🇵 Separated Identity Verification URLs
    nagariktaFrontUrl: { type: String, default: '' },
    nagariktaBackUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Donor || mongoose.model('Donor', DonorSchema);