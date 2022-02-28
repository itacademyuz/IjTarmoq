
const { createComment, destroyComment } = require('../models/DAL/CommentRepository')

const addComment = async(req, res)=>{
        const {id} = req.params
        const {comment} = req.body
        await createComment(id, comment)
        res.redirect(`/posts/${id}`)
}
const deleteComment = async(req, res)=>{
    const {id, commentId} = req.params
    await destroyComment(commentId)
    res.redirect(`/posts/${id}`)
}
module.exports = {addComment, deleteComment}
