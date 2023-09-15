const {Router} = require('express');
const { createNewPost, likePost, unlikePost, viewSinglePost, createSubcomment, createComment, editPost, deletePost, fetchPostsBasedOnPerfomance, fetchRecentPosts, updateComment, updateSubcomment, likeComment, unlikeComment, likeSubcomment, unlikeSubcomment, fetchSingleUserPosts } = require('../Controllers/postsController');
const { registerUser, login, forgotPassword, verifyToken, resetPassword } = require('../Controllers/authControllers');
const { followUser, unfollowUser, viewUser, updateUserInformation, deactivateUserAccount, activateUserAccount } = require('../Controllers/userControllers');
const { barnUser, unbarnUser } =  require('../Controllers/adminControllers');
const { verifyLoginToken } = require('../Middleware/verifyLoginToken');


const router = Router();


// <!-- schedule posts for later -->
// also posts visibility

// ********* to d0 ********************
// suspend users violate prof whith banned timeout  || temporarily suspended for violating terms and conditions.

// posts routes
router.post('/posts/createpost', verifyLoginToken,createNewPost);
router.put('/posts/editpost',verifyLoginToken,editPost);
router.put('/posts/deletepost/:id',verifyLoginToken,deletePost);
router.post('/posts/likepost',verifyLoginToken,likePost);
router.post('/posts/unlikepost',verifyLoginToken,unlikePost);
router.post('/posts/viewSinglePost/:id',verifyLoginToken,viewSinglePost);
// create one to view all posts(recent[time most recent], trending[check all for best perfoming in past 8hrs], feed[randoms of most recent and and best perfoming in the last 3 days])    ><><>< load them with scroll length to avoid lagging and create the social media virtual loading look...
// fetch all posts for a specific user
router.get('/posts/fetchPostsBasedOnPerfomance/:id',fetchPostsBasedOnPerfomance);
router.get('/posts/fetchRecentPosts',fetchRecentPosts);
router.post('/posts/fetchSingleUserPosts/:username',fetchSingleUserPosts);


// comments routes
router.post('/posts/createComment',verifyLoginToken,createComment);
router.post('/posts/updateComment',verifyLoginToken,updateComment);
router.post('/posts/likeComment',verifyLoginToken,likeComment);
//delete comment
router.post('/posts/unlikeComment',verifyLoginToken,unlikeComment);

// subcomments routes
router.post('/posts/createSubComment',verifyLoginToken,createSubcomment);
router.post('/posts/updateSubcomment',verifyLoginToken,updateSubcomment);
router.post('/posts/unlikeSubcomment',verifyLoginToken,unlikeSubcomment);
//delete subcomment
router.post('/posts/likeSubcomment',verifyLoginToken,likeSubcomment);

// auth router
router.post('/auth/register',registerUser);
router.post('/auth/login',login);
router.post('/auth/deactivate',verifyLoginToken,deactivateUserAccount);
router.post('/auth/activate',activateUserAccount);
router.post('/auth/forgot-password',forgotPassword);
router.post('/auth/verify-token',verifyToken);
router.post('/auth/reset-password',resetPassword);


//admin maintenance
router.post('/auth/barn',verifyLoginToken,barnUser);
router.post('/auth/unbarn',verifyLoginToken,unbarnUser);



router.post('/user/follow',verifyLoginToken,followUser);
router.post('/user/unfollow',verifyLoginToken,unfollowUser);
router.post('/user/view-user',verifyLoginToken,viewUser);
router.post('/user/edit-profile',verifyLoginToken,updateUserInformation);




module.exports = {
    router
}
