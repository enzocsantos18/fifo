import mongoose from 'mongoose';

after(function (done) {
    mongoose.connection.db.dropDatabase().then(() => {
        done();
    });
});
