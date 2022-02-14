const { Photo } = require("../models/Photo");
const sharp = require('sharp')

const createPhotos = async(files, post_id)=>{
    if(files){
        for(let file of files){
            const description = file.originalname
            const rawData = await sharp(file.buffer).resize({width: 544, height: 408, fit: sharp.fit.inside, withoutEnlargement: true}).png().toBuffer()
            const data = rawData.toString("base64");
            const PostId = post_id
            const photo = {data, description, PostId}
            await Photo.create(photo)
        }
    }
}
module.exports = {createPhotos}