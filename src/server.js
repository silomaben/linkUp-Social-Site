const express = require('express');
const { linkUpPostsRouter } = require('./Routes/routes,js');
const { linkUpAuthRouter } = require('./Routes/routes');

const app = express();

app.use(express.json())
app.use('/posts', linkUpPostsRouter)
app.use('/auth', linkUpAuthRouter)

app.use((err,req,res,next)=>{
    res.json({Error: err})
})

app.listen(4500,()=>{
    console.log('server running on port 4500')
})