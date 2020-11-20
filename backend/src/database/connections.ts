import mongoose from 'mongoose';

mongoose.connect(
    process.env.NODE_ENV == 'test'
        ? 'mongodb://localhost:27017/fifo-test'
        : process.env['DB_URL'],
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
);

export default mongoose;
