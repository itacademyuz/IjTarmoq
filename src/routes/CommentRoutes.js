const express = require('express')
const { addComment, deleteComment } = require('../controllers/CommentController')
const { catchAsync } = require('../helpers/catchAsync')
const CommentRouter = express()

CommentRouter.post('/posts/:id/comment/', catchAsync(addComment))
CommentRouter.delete('/posts/:id/comment/:commentId', catchAsync(deleteComment))
module.exports = {CommentRouter}