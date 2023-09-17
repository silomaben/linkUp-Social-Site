const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');
const { youWereTagged } = require('../EmailService/sendResetToken');

// cron job
// rank posts(for admin)=>{query all posts for number of likes and comments and on a give the post with the highest engagement ratio a rank from 1 to 10 }
const rankPostEngagement= async (req,res)=>{
    try {

        let postsupdated = []  //track updated posts
        let posts_details = []
        
        // get posts and store in a list
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            posts_details = await pool.request()
                .execute('fetchPostsPerfomance');

                posts_list = posts_details.recordset;

                // console.log(posts_details);
                
                //loop through the post engagement list and fetch the perfomance number and use for engament score calculation.
                // save the posts which post perfomance/engagemrnt have been calculated and saved successfully
                
            for (const post of posts_list){
                const likeWeight = 1;          
                    const commentWeight = 2;       
                    const subcommentWeight = 3;    
                
                    
                    const perfomanceScore = (post.like_count * likeWeight) +
                                            (post.comment_count * commentWeight) +
                                            (post.subcomment_count * subcommentWeight);
                    
                    // save the engagement score to db
                    if(pool.connected){
                        const result = await pool.request()
                        .input('post_id',mssql.VarChar, post.post_id)
                        .input('perfomanceScore',mssql.Int, perfomanceScore)
                        .query(`UPDATE Posts
                        SET perfomance_scale = @perfomanceScore
                        WHERE post_id = @post_id;`)

                        // console.log(result);
                        if(result.rowsAffected[0] === 1){
                            postsupdated.push(post.id)
                        }

                    }
            }
                

        }


        // if(postsupdated.length==posts_list.length){
        //     //>>>>>>>>>>>>>>>>>>>>>>>>>to do<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //     // log using winston when all posts engagement has been updated
        //     return res.json({message: "all post perfomance score have been updated"})
        // }else{
        //     //>>>>>>>>>>>>>>>>>>>>>>>>>to do<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //     // log using winston when all posts engagement has been updated
        //     //  email admin when this happens can be made optional only when its not 100% successfull
        //     return res.json({message: `${postsupdated.length} out of ${posts_list.length} posts perfomanceScore updated`})

        // }


    } catch (error) {
        // <<<<<<<<<<<<<<>>>>>>>>>>>>>>>  log errors   <<<<<<<<<<<<<<<<<<<<<<<<<<<>?????</>
        // return res.json({Error:error.message})
        console.log({Error:error.message});
    }
}


function notify(emails,post_id) {
    
    console.log(emails);
    const [, [{ username }]] = emails

    for (const email of emails[0]) {
        youWereTagged(email,post_id,username)
      console.log(`Sending notification to ${email}`);
    }
}

async function fetchEmailsForTaggedUsers(tagged, id) {
    console.log(tagged);
    const taggedUsers = tagged.toString()
    const usernames = taggedUsers.split(',').map((username) => username.trim());
    const emails = [];
    let username = ''
  
    for (const usernem of usernames) {
      try {

        const pool = await mssql.connect(sqlConfig)



        if(pool.connected){
            const result = await pool.request()
            .input('username', mssql.VarChar, usernem)
            .execute('fetchEmailByUsernameProc');

            const user_name = await pool.request()
            .input('user_id', mssql.VarChar, id.toString())
            .execute('fetchUsernameByidProc');

            if (result.recordset.length > 0) {
            const email = result.recordset[0].email; 
            emails.push(email);
            }

            username = user_name.recordset
        }
      } catch (error) {
        console.error(`Error fetching email for ${username}:`, error);
      }
    }
  
    return [emails, username];
  }





module.exports = {
    rankPostEngagement,
    notify,
    fetchEmailsForTaggedUsers

}
