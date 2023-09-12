const {Router} = require('express');
const { createNewPost, likePost, unlikePost, viewSinglePost, createSubcomment, createComment, editPost, deletePost, fetchPostsBasedOnPerfomance, fetchRecentPosts, updateComment, updateSubcomment, likeComment, unlikeComment, likeSubcomment, unlikeSubcomment } = require('../Controllers/postsController');
const { registerUser, login, forgotPassword, verifyToken, resetPassword } = require('../Controllers/authControllers');
const { rankPostEngagement } = require('../Controllers/jobs');
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
router.put('/posts/editpost',editPost);
router.put('/posts/deletepost/:id',deletePost);
router.post('/posts/likepost',likePost);
router.post('/posts/unlikepost',unlikePost);
router.post('/posts/viewSinglePost/:id',viewSinglePost);
// create one to view all posts(recent[time most recent], trending[check all for best perfoming in past 8hrs], feed[randoms of most recent and and best perfoming in the last 3 days])    ><><>< load them with scroll length to avoid lagging and create the social media virtual loading look...
// fetch all posts for a specific user
router.get('/posts/fetchPostsBasedOnPerfomance/:id',fetchPostsBasedOnPerfomance);
router.get('/posts/fetchRecentPosts',fetchRecentPosts);


// comments routes
router.post('/posts/createComment',verifyLoginToken,createComment);
router.post('/posts/updateComment',updateComment);
router.post('/posts/likeComment',likeComment);
//delete comment
router.post('/posts/unlikeComment',unlikeComment);

// subcomments routes
router.post('/posts/createSubComment',createSubcomment);
router.post('/posts/updateSubcomment',updateSubcomment);
router.post('/posts/unlikeSubcomment',unlikeSubcomment);
//delete subcomment
router.post('/posts/likeSubcomment',likeSubcomment);

// auth router
router.post('/auth/register',registerUser);
router.post('/auth/login',login);
router.post('/auth/deactivate',deactivateUserAccount);
router.post('/auth/activate',activateUserAccount);
router.post('/auth/forgot-password',forgotPassword);
router.post('/auth/verify-token',verifyToken);
router.post('/auth/reset-password',resetPassword);


//admin maintenance
router.post('/auth/barn',barnUser);
router.post('/auth/unbarn',unbarnUser);



router.post('/user/follow',followUser);
router.post('/user/unfollow',unfollowUser);
router.post('/user/view-user',viewUser);
router.post('/user/edit-profile',updateUserInformation);

//cronjobs router should be deleted in the future

router.get('/rankPostEngagement',rankPostEngagement);


module.exports = {
    router
}
