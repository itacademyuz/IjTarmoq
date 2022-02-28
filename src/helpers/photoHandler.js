const multer = require('multer')
const sharp = require('sharp');
const { addPhotos, destroyPhotos } = require("../models/DAL/PhotoRepository");

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new BlogError(`Iltimos faqat rasmlar yuklang`, 405))
        }
        cb(undefined, true)
    }
})
const createPhotos = async(files, post_id)=>{
    if(files){
        for(let file of files){
            const description = file.originalname
            const rawData = await sharp(file.buffer).resize({width: 544, height: 408, fit: sharp.fit.inside, withoutEnlargement: true}).png().toBuffer()
            const data = rawData.toString("base64");
            const PostId = post_id
            const photo = {data, description, PostId}
            await addPhotos(photo);
        }
    }
}
const deletePhotos = async(photoIds=[])=>{
    for (const id of photoIds) {
        await destroyPhotos(id)
    }
}
module.exports = {createPhotos, deletePhotos, upload}