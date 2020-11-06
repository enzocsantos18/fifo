import mongoose from 'mongoose';

mongoose.connect(
    'mongodb+srv://squad2:squad2@cluster0.iy1dd.mongodb.net/fifo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

export default mongoose;