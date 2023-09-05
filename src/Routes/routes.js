const {Router} = require('express');
const { createNewPost, likePost, unlikePost, viewSinglePost, createSubcomment, createComment, editPost, deletePost, fetchPostsBasedOnPerfomance, fetchRecentPosts, updateComment, updateSubcomment, likeComment, unlikeComment, likeSubcomment, unlikeSubcomment } = require('../Controllers/postsController');
const { registerUser } = require('../Controllers/authControllers');
const { rankPostEngagement } = require('../Controllers/jobs');


// post router
linkUpPostsRouter = Router();


linkUpPostsRouter.post('/createpost',createNewPost);
linkUpPostsRouter.put('/editpost',editPost);
linkUpPostsRouter.put('/deletepost/:id',deletePost);
linkUpPostsRouter.post('/likepost',likePost);
linkUpPostsRouter.post('/unlikepost',unlikePost);
linkUpPostsRouter.post('/createComment',createComment);
linkUpPostsRouter.get('/viewSinglePost/:id',viewSinglePost);
linkUpPostsRouter.post('/createSubComment',createSubcomment);
linkUpPostsRouter.get('/fetchPostsBasedOnPerfomance',fetchPostsBasedOnPerfomance);
linkUpPostsRouter.get('/fetchRecentPosts',fetchRecentPosts);
linkUpPostsRouter.post('/updateComment',updateComment);
linkUpPostsRouter.post('/updateSubcomment',updateSubcomment);
linkUpPostsRouter.post('/likeComment',likeComment);
linkUpPostsRouter.post('/unlikeComment',unlikeComment);
linkUpPostsRouter.post('/likeSubcomment',likeSubcomment);
linkUpPostsRouter.post('/unlikeSubcomment',unlikeSubcomment);


// auth router
linkUpAuthRouter = Router();
linkUpAuthRouter.post('/registerUser',registerUser);



//cronjobs router should be deleted in the future
linkUpCronJobsRouter = Router();
linkUpCronJobsRouter.get('/rankPostEngagement',rankPostEngagement);


module.exports = {
    linkUpPostsRouter,
    linkUpAuthRouter
}
