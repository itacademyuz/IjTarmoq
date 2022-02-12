const express = require('express')
const { Comment } = require('../models/Comment')
const CommentRouter = express()

CommentRouter.post('/posts/:id/comment/', async(req, res)=>{
    const {id} = req.params
    const {comment} = req.body
    const commentObj = Comment.build(comment)
    commentObj.PostId = id
    await commentObj.save()
    res.redirect(`/posts/${id}`)
})
CommentRouter.delete('/posts/:id/comment/:commentId', async(req, res)=>{
    const {id, commentId} = req.params
    await Comment.destroy({where: {_id:commentId}})
    res.redirect(`/posts/${id}`)
})

module.exports = {CommentRouter}