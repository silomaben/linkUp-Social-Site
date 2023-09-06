const express = require('express');
const { router } = require('./Routes/routes');

const app = express();

app.use(express.json())
app.use('', router)

app.use((err,req,res,next)=>{
    res.json({Error: err})
})

app.listen(4500,()=>{
    console.log('server running on port 4500')
})