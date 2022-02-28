const {Comment} = require('../Comment')
const createComment = async (postId, comment)=>{
    const commentObj = Comment.build(comment)
    commentObj.PostId = postId
    await commentObj.save()
}
const destroyComment = async(commentId)=>{
    await Comment.destroy({where: {_id:commentId}})
}

module.exports = {
    createComment,
    destroyComment
}