
const mongoose=require('mongoose');
const express=require('express');
const app = express();

const routes = require('./routes/routes');
const {meet,validatemeet}=require('./Meeting/meeting');

const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes);
const uri = "mongodb://localhost/yie";

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("connected to db");
    })
    .catch(()=>{
        console.log("not connected");
    });

const port=8000;
app.listen(8000,()=>{
    console.log(`listening at ${port}`);
})

