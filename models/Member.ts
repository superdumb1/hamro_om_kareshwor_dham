import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IMember extends Document {
    name: string;
    address: string;
    memberId: string;
    joinedDate: Date;
    status: string;
}

const MemberSchema = new Schema<IMember>({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    memberId: { type: String, required: true, unique: true, trim: true },
    joinedDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Active Member' }
});

// Avoid re-compiling the model if it already exists during hot-reloads
export const Member = models.Member || model<IMember>('Member', MemberSchema);