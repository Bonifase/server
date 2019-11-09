require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.URL;

const dbConnection = async () => {
    try {
        if(process.env.NODE_ENV === 'test'){
            await mongoose.connect(process.env.TEST_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
        }
        else{
            await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
            console.log("Database connection is established...")
        }
        
    } catch (error) {
        console.log(error.message)
        process.exit(1);
        
    }
};

module.exports = dbConnection;

