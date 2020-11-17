import mongoose from 'mongoose';

mongoose.connect(process.env['DB_URL'], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

export default mongoose;
