module.exports = options => {
    return async (req,res,next)=>{
        let modelName = require('inflection').classify(req.params.resource)
        console.log(modelName)
        req.Model = require(`../models/${modelName}`);   //这个地方有个疑问，我的modelname是带s的，但是models目录下的文件是不带s的，怎么也能正确读取？
        next()
    }
}