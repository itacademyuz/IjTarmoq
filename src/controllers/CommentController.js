const {Comment} = require('../models/Comment')

const addComment = async(req, res)=>{
        const {id} = req.params
        const {comment} = req.body
        const commentObj = Comment.build(comment)
        commentObj.PostId = id
        await commentObj.save()
        res.redirect(`/posts/${id}`)
        console.log(`${e}`);
}
const deleteComment = async(req, res)=>{
    const {id, commentId} = req.params
    await Comment.destroy({where: {_id:commentId}})
    res.redirect(`/posts/${id}`)
}
module.exports = {addComment, deleteComment}