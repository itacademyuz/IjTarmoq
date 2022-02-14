const { connect } = require("../../db/config");
const { Comment } = require("../Comment");
const { Post } = require("../Post");
const {Photo} = require('../Photo')
const buildDB = async(forceOption=false)=>{
    Comment.belongsTo(Post, {onDelete: 'cascade'})
    Post.hasMany(Comment, {onDelete: 'cascade'})

    Photo.belongsTo(Post, {onDelete: 'cascade'})
    Post.hasMany(Photo, {onDelete: 'cascade'})

    connect(forceOption)
}
module.exports = {buildDB}