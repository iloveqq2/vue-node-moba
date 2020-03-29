const mongoose = require('mongoose')

const schema= new mongoose.Schema({
    title:{type:String},
    body:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
},{
    timestamps:true  //亮点 自动带上时间
})

module.exports = mongoose.model('Article',schema)