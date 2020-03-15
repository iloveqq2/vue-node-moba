module.exports = async app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')

    const router = express.Router({
        mergeParams:true
    })

    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    // const req.Model = require('../../models/req.Model')

    // 添加分类
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 读取分类列表
    router.get('/', async(req,res)=>{
        const queryOptions = {};
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        // const items = await req.Model.find().populate('parent').limit(10)
        res.send(items)
    })
    // 读取某个分类
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 修改某个分类
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    // 删除某个分类
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })
    
    
    app.use('/admin/api/rest/:resource',resourceMiddleware,router)
    const multer = require('multer')  // 这个中间件的作用是将上传的文件添加到req上，通过req.file便能获取
    const upload = multer({dest:__dirname+'/../../uploads'})
    app.post('/admin/api/upload',authMiddleware,upload.single('file'),async (req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login',async(req,res)=>{
        const {username,password} = req.body;
        // 根据用户名找用户
        
        const user= await AdminUser.findOne({username}).select('+password')//前面的时候指定了 select；false  默认取不出来  前缀-强制排除 前缀+强制选择
        assert(user,422,'用户名不存在')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        // 校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,'密码错误')
        
        // if(!isValid){
        //     return res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        // 返回token
        
        const token = jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

    // 错误处理
    app.use(async (err,req,res,next)=>{
        console.log(err)
        res.status(err.statusCode || 500).send({
            message:err.message
        })

    })
}