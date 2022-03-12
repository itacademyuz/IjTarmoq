const {Comment} = require('../Comment')
const createComment = async (postId, user_id, comment)=>{
    const commentObj = Comment.build(comment)
    commentObj.PostId = postId
    commentObj.UserId = user_id
    await commentObj.save()
}
const destroyComment = async(commentId)=>{
    await Comment.destroy({where: {_id:commentId}})
}

module.exports = {
    createComment,
    destroyComment
}