const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
const cookieParser = require('cookie-parser');


const port = process.env.PORT || 8080;
const connect = require('./config/db');

app.use(express.json());
app.use(cookieParser());
// setting all the routes
app.use("/auth", require('./routes/authHandler'));
app.use("/user", require('./routes/userHandler'));
app.use("/product", require('./routes/productHandler'));
app.use("/cart", require('./routes/cartHandler'));


// listen to the server only if databse connection is established
connect().then(()=>{
    try {
        app.listen(port, (err)=>{
            if(err) throw err;
            console.log(`listening on ${port}`);
        });
    } catch(err) {
        console.error(err);
    }
}).catch(err => {
    console.log("Cannot connect to database" + err.message);
})