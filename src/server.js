const express = require('express');
const cors = require('cors'); 
const { router } = require('./Routes/routes');
const { rankPostEngagement } = require('./Controllers/jobs');
const cron = require('node-cron');

const app = express();

app.use(cors());

app.use(express.json())
app.use('', router)


app.use((err,req,res,next)=>{
    res.json({Error: err})
})

//node-mailer cron job here
cron.schedule("*/5 * * * * *", async () => {
    //runs every 5 seconds
  
    // console.log("running a task every 5 seconds");
    await rankPostEngagement();
    // console.log("ranked posts");
  }); 


app.listen(4500,()=>{
    console.log('server running on port 4500')
})