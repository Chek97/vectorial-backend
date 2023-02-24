const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });

        console.log('DB connect succesfull');
    } catch (error) {
        console.error(error);
    }
}

module.exports = dbConection;