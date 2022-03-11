const { connect } = require("../../db/config");
const { Comment } = require("../Comment");
const { Post } = require("../Post");
const {Photo} = require('../Photo');
const { User } = require("../User");
const buildDB = async(forceOption=false)=>{
    Comment.belongsTo(Post, {onDelete: 'cascade'})
    Post.hasMany(Comment, {onDelete: 'cascade'})

    Photo.belongsTo(Post, {onDelete: 'cascade'})
    Post.hasMany(Photo, {onDelete: 'cascade'})

    User.hasMany(Post, {onDelete: 'cascade'})
    Post.belongsTo(User, {onDelete: 'cascade'})

    User.hasMany(Comment, {onDelete: 'cascade'})
    Comment.belongsTo(User, {onDelete: 'cascade'})

    connect(forceOption)
}
module.exports = {buildDB}