const mongoose = require ('mongoose')

const imageSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    }
})

const imageModel = mongoose.model("image" , imageSchema)

module.exports = imageModel