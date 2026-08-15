import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IPrivacyGuideOrder extends Document {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  currentAddress: string;
  previousAddresses: string[];
  stripeSessionId?: string;
  status: 'pending_payment' | 'paid' | 'delivered' | 'failed';
  paidAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
}

const PrivacyGuideOrderSchema = new Schema<IPrivacyGuideOrder>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  currentAddress: { type: String, required: true },
  previousAddresses: [{ type: String }],
  stripeSessionId: { type: String },
  status: {
    type: String,
    enum: ['pending_payment', 'paid', 'delivered', 'failed'],
    default: 'pending_payment',
  },
  paidAt: { type: Date },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default models.PrivacyGuideOrder ||
  model<IPrivacyGuideOrder>('PrivacyGuideOrder', PrivacyGuideOrderSchema);
