const {v4} = require('uuid');
const mssql = require ('mssql');
// const { createProjectsTable } = require('../Database/Tables/createTables');
const { sqlConfig } = require('../Config/config');



const createNewPost = async (req,res)=>{
    try {
        const id = v4();
        const options = { timeZone: 'Africa/Nairobi' };
        const timeposted = new Date().toLocaleString('en-US', options);
        
        const {user_id,image,body,tagged} = req.body
        console.log(timeposted);

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('post_id',mssql.VarChar, id)
            .input('image', mssql.VarChar,image)
            .input('body', mssql.VarChar, body)
            .input('tagged', mssql.VarChar, tagged)
            .input('timeposted',mssql.VarChar, timeposted)
            .execute('createPostProc')
            

            if(result.rowsAffected==1){
                return res.json({
                    message: "Posted successfully"
                })
            }else{
                return res.json({message: "Posting failed"})
            }

        }
        
    } catch (error) {
        return res.json({error})
    }
}




// update post

const editPost = async (req,res)=>{
    try {        
        const {user_id,post_id,body,tagged} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('post_id',mssql.VarChar, post_id)
            .input('body', mssql.VarChar, body)
            .input('tagged', mssql.VarChar, tagged)
            .execute('editPostProc')
            

            if(result.rowsAffected==1){
                return res.json({
                    message: "Post updated successfully"
                })
            }else{
                return res.json({message: "Post updating failed"})
            }

        }
        
    } catch (error) {
        return res.json({error})
    }
}


// delete post



const deletePost = async(req,res)=>{
    try {
        const post_id = req.params.id;

        const {user_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('post_id',mssql.VarChar, post_id)
            .input('user_id',mssql.VarChar, user_id)
            .execute('deletePostProc')
            
        
      
            if(result.rowsAffected == 1){
                res.json({
                        message: 'Post deleted successfully'
                })
            }else{
                res.json({
                    message: 'Post not found'
            })
            }
        }


    } catch (error) {
        return res.json({Error:error});
    }
}





// view all posts based on perfomance score 
const fetchPostsBasedOnPerfomance = async (req,res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const posts = await pool.request()
            .execute('fetchPostsBasedOnPerfomanceProc')
            

        return res.json({
            posts: posts.recordset
        })

        }
        
    } catch (error) {
        return res.json({error})
    }
}


// fetch all post based on time uploaded
const fetchRecentPosts = async (req,res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const posts = await pool.request()
            .execute('fetchRecentPosts')
            

        return res.json({
            posts: posts.recordset
        })

        }
        
    } catch (error) {
        return res.json({error})
    }
}

// update comment
const updateComment = async (req,res)=>{
    try {
        const {post_id,user_id,body} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('post_id',mssql.VarChar, post_id)
            .input('user_id',mssql.VarChar, user_id)
            .input('body', mssql.Text, body)
            .execute('updateCommentProc')
            

            if(result.rowsAffected==1){
                return res.json({
                    message: "comment updated"
                })
            }else{
                return res.json({message: "comment updating failed"})
            }

        }
        
    } catch (error) {
        return res.json({error})
    }
}



// update subcomment


const updateSubcomment = async (req, res) => {
    try {
        const { subcomment_id,comment_id, user_id, body } = req.body;

        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const result = await pool.request()
                .input('subcomment_id', mssql.Int, subcomment_id)
                .input('comment_id', mssql.Int, comment_id)
                .input('user_id', mssql.VarChar, user_id)
                .input('body', mssql.Text, body)
                .execute('updateSubcommentProc');

            if (result.rowsAffected == 1) {
                return res.json({
                    message: "subcomment updated"
                });
            } else {
                return res.json({ message: "subcomment updating failed" });
            }
        }
    } catch (error) {
        return res.json({ error });
    }
}

// delete comment




// delete subcomment


// like comment


// like subcomment


// unlike comment


// unlike subcomment


// register a user



// upload/edit user info(including user name....handle errors well to know if usernames have been taken or not)



// delete user(a suspended account cannot be deleted)


//login a user


// verify user


// disable user (for user to disable themselves)


// suspend user (only for network admin)


// keep email private


// reset password(send otp and after successful assertion allow to write password and confirm then save.)


// suspend post(for admin)


// archive post (for user)



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

                console.log(posts_details);
                
                //loop through the post engagement list and fetch the perfomance number and use for engament score calculation.
                // save the posts which post perfomance/engagemrnt have been calculated and saved successfully
                
            for (const post of posts_list){
                const likeWeight = 1;          
                    const commentWeight = 2;       
                    const subcommentWeight = 3;    
                
                    
                    const perfomanceScore = (post.like_count * likeWeight) +
                                            (post.comment_count * commentWeight) +
                                            (post.subcomment_count * subcommentWeight);
                    
                    // save the engagement score to the database it to the database
                    if(pool.connected){
                        const result = await pool.request()
                        .input('post_id',mssql.VarChar, post.post_id)
                        .input('perfomanceScore',mssql.Int, perfomanceScore)
                        .query(`UPDATE Posts
                        SET perfomance_scale = @perfomanceScore
                        WHERE post_id = @post_id;`)

                        console.log(result);
                        if(result.rowsAffected[0] === 1){
                            postsupdated.push(post.id)
                        }

                    }
            }
                

        }


        if(postsupdated.length==posts_list.length){
            //>>>>>>>>>>>>>>>>>>>>>>>>>to do<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            // log using winston when all posts engagement has been updated
            return res.json({message: "all post perfomance score have been updated"})
        }else{
            //>>>>>>>>>>>>>>>>>>>>>>>>>to do<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            // log using winston when all posts engagement has been updated
            //  email admin when this happens can be made optional only when its not 100% successfull
            return res.json({message: `${postsupdated.length} out of ${posts_list.length} posts perfomanceScore updated`})

        }


    } catch (error) {
        return res.json({Error:error.message})
    }
}









const likePost = async (req,res)=>{
    try {
        const {user_id,post_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('post_id', mssql.VarChar,post_id)
            .execute('LikePostProc')

            if(result.rowsAffected==1){
                return res.json({message: "liked"})
            }else{
                return res.json({message: "liking failed"})
            }

        }
    } catch (error) {
        return res.json({error})
    }
}

const unlikePost = async (req,res)=>{
    try {
        const {user_id,post_id} = req.body

        const pool = await mssql.connect(sqlConfig)


        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('post_id', mssql.VarChar,post_id)
            .execute('UnlikePostProc')
            

            if(result.rowsAffected==1){
                return res.json({
                    message: "unliked"
                })
            }else{
                return res.json({message: "post is not liked"})
            }

        }
        
    } catch (error) {
        return res.json({error})
    }
}





const createComment = async (req,res)=>{
    try {
        const timeposted = new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });

        const {post_id,user_id,body} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('post_id',mssql.VarChar, post_id)
            .input('body', mssql.Text, body)
            .input('timeposted', mssql.VarChar, timeposted)
            .execute('CreateCommentProc')
            

            if(result.rowsAffected==1){
                return res.json({
                    message: "comment added"
                })
            }else{
                return res.json({message: "commenting failed"})
            }

        }
        
    } catch (error) {
        return res.json({error})
    }
}


const createSubcomment = async (req, res) => {
    try {
        
        const options = { timeZone: 'Africa/Nairobi' };
        const timeposted = new Date().toLocaleString('en-US', options);
        
        const { comment_id, user_id, body } = req.body;

        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const result = await pool.request()
                .input('comment_id', mssql.Int, comment_id)
                .input('user_id', mssql.VarChar, user_id)
                .input('body', mssql.Text, body)
                .input('timeposted', mssql.VarChar, timeposted)
                .execute('CreateSubcommentProc');

            if (result.rowsAffected == 1) {
                return res.json({
                    message: "subcomment added"
                });
            } else {
                return res.json({ message: "subcommenting failed" });
            }
        }
    } catch (error) {
        return res.json({ error });
    }
}


const viewSinglePost = async (req, res) => {
    try {
        const post_id = req.params.id;
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const postDetails = await pool.request()
                .input('post_id', mssql.VarChar, post_id)
                .execute('fetchSinglePostProc');

            const comments = await pool.request()
                .input('post_id', mssql.VarChar, post_id)
                .query('SELECT comment_id, user_id, body, datetime FROM Comments WHERE post_id = @post_id');

            if (postDetails.recordset) {
                const commentObjects = [];

                for (const comment of comments.recordset) {
                    const subcomments = await pool.request()
                        .input('comment_id', mssql.Int, comment.comment_id)
                        .query('SELECT subcomment_id, user_id, body, datetime FROM Subcomments WHERE comment_id = @comment_id');

                    commentObjects.push({
                        comment_id: comment.comment_id,
                        user_id: comment.user_id,
                        body: comment.body,
                        datetime: comment.datetime,
                        subcomments: subcomments.recordset
                    });
                }

                return res.json({
                    post: postDetails.recordset,
                    comments: commentObjects
                });
            } else {
                return res.json({ message: "error fetching post" });
            }
        }
    } catch (error) {
        return res.json({ error });
    }
}


module.exports = {
    createNewPost,
    viewSinglePost,
    editPost,
    deletePost,
    likePost,
    unlikePost,
    createComment,
    createSubcomment,
    rankPostEngagement,
    fetchPostsBasedOnPerfomance,
    fetchRecentPosts,
    updateComment,
    updateSubcomment
}