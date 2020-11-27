import mongoose from '../database/connections';
import { IUser } from './User';

interface IForgotPassword extends mongoose.Document {
    user: IUser;
    token: String;
}

const ForgotPasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '15m' },
    },
});

export default mongoose.model<IForgotPassword>(
    'ForgotPassword',
    ForgotPasswordSchema
);
