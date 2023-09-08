const {Router} = require('express');
const { createNewPost, likePost, unlikePost, viewSinglePost, createSubcomment, createComment, editPost, deletePost, fetchPostsBasedOnPerfomance, fetchRecentPosts, updateComment, updateSubcomment, likeComment, unlikeComment, likeSubcomment, unlikeSubcomment } = require('../Controllers/postsController');
const { registerUser, deactivateUserAccount, activateUserAccount, login, barnUser, unbarnUser, forgotPassword, verifyToken, resetPassword } = require('../Controllers/authControllers');
const { rankPostEngagement } = require('../Controllers/jobs');
const { followUser, unfollowUser, viewUser } = require('../Controllers/userControllers');



const router = Router();


// <!-- schedule posts for later -->
// also posts visibility


// posts routes
router.post('/createpost',createNewPost);
router.put('/editpost',editPost);
router.put('/deletepost/:id',deletePost);
router.post('/likepost',likePost);
router.post('/unlikepost',unlikePost);
router.get('/viewSinglePost/:id',viewSinglePost);
// create one to view all posts(recent[time most recent], trending[check all for best perfoming in past 8hrs], feed[randoms of most recent and and best perfoming in the last 3 days])    ><><>< load them with scroll length to avoid lagging and create the social media virtual loading look...
// fetch all posts for a specific user
router.get('/fetchPostsBasedOnPerfomance',fetchPostsBasedOnPerfomance);
router.get('/fetchRecentPosts',fetchRecentPosts);


// comments routes
router.post('/createComment',createComment);
router.post('/updateComment',updateComment);
router.post('/likeComment',likeComment);
//delete comment
router.post('/unlikeComment',unlikeComment);

// subcomments routes
router.post('/createSubComment',createSubcomment);
router.post('/updateSubcomment',updateSubcomment);
router.post('/unlikeSubcomment',unlikeSubcomment);
//delete subcomment
router.post('/likeSubcomment',likeSubcomment);

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

//cronjobs router should be deleted in the future

router.get('/rankPostEngagement',rankPostEngagement);


module.exports = {
    router
}
