const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Mongodb connected successfully');
    } catch (e) {
        console.error('Failed to connect to db:', e); 
        process.exit(1);
    }
};

module.exports = connectToDB;