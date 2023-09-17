const {v4} = require('uuid');
const mssql = require ('mssql');

// const { createProjectsTable } = require('../Database/Tables/createTables');
const { sqlConfig } = require('../Config/config');
const Filter = require('bad-words');

const filter = new Filter();



// suspend post(for admin)


// archive post (for user)


// delete comment




// delete subcomment



const createNewPost = async (req,res)=>{
    try {
        const id = v4();
        const options = { timeZone: 'Africa/Nairobi' };
        const timeposted = new Date().toLocaleString('en-US', options);
        
        const {user_id,image,body,tagged} = req.body
        console.log(timeposted);

        // Check for profanity in the post body
        if (filter.isProfane(body)) {
            return res.json({ message: "Posting failed due to profanity" });
        }

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

        if (filter.isProfane(body)) {
            return res.json({ message: "Updating post failed due to profanity" });
        }

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('post_id',mssql.VarChar, post_id)
            .input('body', mssql.VarChar, body)
            .input('tagged', mssql.VarChar, tagged)
            .execute('editPostProc')

            console.log(result);
            

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
                    message: 'run into an error'
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

        const user_id = req.params.id;
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const posts = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .execute('fetchPostsBasedOnPerfomanceProc')
        
        return res.json({
            posts: posts.recordset
        })

        }
        
    } catch (error) {
        return res.json({error})
    }
}

// fetch single user post
const fetchSingleUserPosts = async (req,res)=>{
    try {

        const viewed_username = req.params.username;
        const {viewer_userId} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const posts = await pool.request()
            .input('viewed_username',mssql.VarChar, viewed_username)
            .input('viewer_userId',mssql.VarChar, viewer_userId)
            .execute('fetchPostsForSingleUserProc')
            

        
        return res.json({
            posts: posts.recordset
        })

        }
        
    } catch (error) {
        return res.json({Error:error.message})
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
        const {comment_id,post_id,user_id,body} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('comment_id',mssql.VarChar, comment_id)
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
        return res.json({error:error.message})
    }
}



// update subcomment


const updateSubcomment = async (req, res) => {
    try {
        const { subcomment_id,comment_id, user_id, body } = req.body;
        
        console.log(subcomment_id,comment_id, user_id, body );
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
        return res.json({error:"already liked"})
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
                return res.json({error: "post is not liked"})
            }

        }
        
    } catch (error) {
        return res.json({error})
    }
}

// like comment


const likeComment= async (req,res)=>{
    try {
        const {user_id,comment_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('comment_id', mssql.VarChar,comment_id)
            .execute('LikeCommentProc')

            if(result.rowsAffected==1){
                return res.json({message: "comment was liked"})
            }else{
                return res.json({message: "failed to like comment"})
            }

        }
    } catch (error) {
        return res.json({Error:error.message})
    }
}






// unlike comment

const unlikeComment = async (req,res)=>{
    try {
        const {user_id,comment_id} = req.body
        console.log(user_id,comment_id);

        const pool = await mssql.connect(sqlConfig)


        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('comment_id',comment_id)
            .execute('UnlikeCommentProc')
            
            console.log(result);
            if(result.rowsAffected==1){
                return res.json({
                    message: "unliked comment"
                })
            }else{
                return res.json({error: "comment is not liked"})
            }

        }
        
    } catch (error) {
        return res.json({error})
    }
}

// like subcomment
const likeSubcomment= async (req,res)=>{
    try {
        const {user_id,subcomment_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('subcomment_id', mssql.VarChar,subcomment_id)
            .execute('likeSubcommentProc')

            if(result.rowsAffected==1){
                return res.json({message: "subcomment was liked"})
            }else{
                return res.json({message: "failed to like subcomment"})
            }

        }
    } catch (error) {
        return res.json({Error:error.message})
    }
}



// unlike subcomment
const unlikeSubcomment = async (req,res)=>{
    try {
        const {user_id,subcomment_id} = req.body
        console.log(user_id,subcomment_id);

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('subcomment_id',subcomment_id)
            .execute('UnlikeSubcommentProc')
            
            console.log(result);
            if(result.rowsAffected==1){
                return res.json({
                    message: "unliked subcomment"
                })
            }else{
                return res.json({error: "subcomment is not liked"})
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

        if (filter.isProfane(body)) {
            return res.json({ message: "Posting failed due to profanity" });
        }


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

        if (filter.isProfane(body)) {
            return res.json({ message: "Posting failed due to profanity" });
        }

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

        const { user_id} = req.body;
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const postDetails = await pool.request()
                .input('post_id', mssql.VarChar, post_id)
                .input('user_id', mssql.VarChar, user_id)
                .execute('fetchSinglePostProc');

            const comments = await pool.request()
                .input('post_id', mssql.VarChar, post_id)
                .input('user_id', mssql.VarChar, user_id)
                .execute('fetchCommentsForSpecificPostProc');

            if (postDetails.recordset) {
                const commentObjects = [];

                for (const comment of comments.recordset) {
                    const subcomments = await pool.request()
                        .input('comment_id', mssql.Int, comment.comment_id)
                        .input('user_id', mssql.VarChar, user_id)
                        .execute('fetchSubCommentsForSpecificPostProc');
                        console.log(subcomments.recordset);

                    commentObjects.push({
                        comment_id: comment.comment_id,
                        full_name: comment.full_name,
                        user_id: comment.user_id,
                        username: comment.username,
                        user_dp: comment.profile_pic_url,
                        has_liked: comment.has_liked,
                        body: comment.body,
                        datetime: comment.datetime,
                        like_count: comment.like_count,
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
    likeComment,
    unlikeComment,
    createComment,
    likeSubcomment,
    unlikeSubcomment,
    createSubcomment,
    fetchPostsBasedOnPerfomance,
    fetchRecentPosts,
    updateComment,
    updateSubcomment,
    fetchSingleUserPosts
}