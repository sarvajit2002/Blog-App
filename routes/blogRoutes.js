const express = require('express');
const {getAllBlogsController,createBlogsController,updateBlogsController,getBYIdBlogsController,deleteBlogsController,userBlogController} = require('../controllers/blogController')

const router = express.Router();
router.get('/all-blog',getAllBlogsController)
router.post('/create-blog',createBlogsController)
router.put('/update-blog/:id',updateBlogsController)
router.get('/get-blog/:id',getBYIdBlogsController)
router.delete('/delete-blog/:id',deleteBlogsController)
router.get('/user-blog/:id',userBlogController)
module.exports=router