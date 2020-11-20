import mongoose from '../database/connections';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    imageURL: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
});

UserSchema.pre('save', async function (this: IUser, next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

export default mongoose.model<IUser>('User', UserSchema);
