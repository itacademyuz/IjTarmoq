const { createPhotos, deletePhotos } = require("../../helpers/photoHandler")
const { Photo } = require("../Photo")
const { Post } = require("../Post")
const {Comment} = require('../Comment')
const getAllPosts = async ()=>{
    return await Post.findAll({
        include:[
            {
                model: Photo,
                attributes: ['data', 'description']
            }
        ]
    })
}

const createPost = async (post, files, user_id) =>{
    const postData =  Post.build(post);
    post.UserId = user_id
    await postData.save()
    await createPhotos(files, postData._id)
}

const findById = async (id) =>{
    return await Post.findByPk(id, {
        include: [
            {
                model: Photo,
                attributes: ['_id', 'data', 'description']
            }
        ]
    })
}

const findSingleWithComments = async(id)=>{
    return await Post.findByPk(id,{
        include:[
            {
               model: Comment,
               attributes: ['_id', 'content', 'createdAt', 'updatedAt'] 
            },{
                model: Photo,
                attributes: ["data", "description"]
            }
        ]
    })
}

const alterPost = async (post_id, post, newPhotos, deletedPhotos)=>{
    await Post.update({...post}, {where: {_id: post_id}})
    await createPhotos(newPhotos, post_id)
    await deletePhotos(deletedPhotos)
}

const destroyPost = async(id)=>{
    await Post.destroy({where:{
        _id:id
    }})
}

module.exports = {
    getAllPosts,
    createPost,
    findById,
    findSingleWithComments,
    alterPost,
    destroyPost
}