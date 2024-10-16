const mongoose = require('mongoose');

// this function is used to connect to the database mongoDB
const connect = async () =>{
    try {
        await mongoose.connect(process.env.DBURL);
         console.log("Connected to database");
    } catch(err) {
        console.log("Error connecting to database" + err.message);
        process.exit(1);

    }
}

module.exports = connect;