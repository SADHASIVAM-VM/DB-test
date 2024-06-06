const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const env = require('dotenv');
const router = require("./Routes/Login");
const cors = require("cors")

const logUser = require('./Routes/usersLog')
const app = express()

//config
env.config({path:path.join(__dirname,"config",'.env')});

const corsOptions = {
    origin: 'http://localhost:5173'
  };
app.use(cors(corsOptions));

app.use(express.json())

//// mongoDB Connect

mongoose.connect(process.env.DB_URL_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=> {
    if(res){
        console.log("DB Connected....")
        console.log("Host", mongoose.connection.host)
    }
} ).catch((err)=>{
    console.log(err)
})
mongoose.connection.once('open', () => {
    console.log('Mongoose connection is open');
});
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

////////////////////////////////

app.get('/', (req, res)=>{
    res.send('sd')
})
app.use('/',router)
app.use('/', logUser)

//server running space
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server Running @",port)
})