const mongoose = require('mongoose');

connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;