const express = require('express')
const { validatePosts } = require('../middlewares/model-validation')
const PostRouter = express.Router()

const { 
    showAll, 
    renderAddPage, 
    addNewPost, 
    renderEditPage, 
    showSingle, 
    updatePost, 
    deletePost 
} = require('../controllers/PostController')
const {isAuthenticated} = require('../middlewares/isAuthenticated');

const { upload } = require('../helpers/photoHandler.js')
const { catchAsync } = require('../helpers/catchAsync')
PostRouter.get('/', catchAsync(showAll))
PostRouter.get('/new', isAuthenticated, renderAddPage)
PostRouter.post('/', isAuthenticated, upload.array('image'), validatePosts, catchAsync(addNewPost))
PostRouter.get('/:id/edit', catchAsync(renderEditPage))
PostRouter.get('/:id', catchAsync(showSingle))
PostRouter.put('/:id', upload.array('image'), validatePosts, catchAsync(updatePost))
PostRouter.delete('/:id', catchAsync(deletePost))

module.exports = {PostRouter}