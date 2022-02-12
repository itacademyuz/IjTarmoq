const { connect } = require("../../db/config");
const { Comment } = require("../Comment");
const { Post } = require("../Post");
const buildDB = async(forceOption=false)=>{
    Comment.belongsTo(Post, {onDelete: 'cascade'})
    Post.hasMany(Comment, {onDelete: 'cascade'})
    connect(forceOption)
}
module.exports = {buildDB}