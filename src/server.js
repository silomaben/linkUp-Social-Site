const express = require('express');
const cors = require('cors'); 
const { router } = require('./Routes/routes');

const app = express();

app.use(cors());

app.use(express.json())
app.use('', router)


app.use((err,req,res,next)=>{
    res.json({Error: err})
})

app.listen(4500,()=>{
    console.log('server running on port 4500')
})