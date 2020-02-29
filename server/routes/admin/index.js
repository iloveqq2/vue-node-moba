module.exports = async app => {
    const express = require('express')
    const router = express.Router()
    const category = require('../../models/category')

    // 添加分类
    router.post('/categories',async(req,res)=>{
        const model = await category.create(req.body)
        res.send(model)
    })
    // 读取分类列表
    router.get('/categories',async(req,res)=>{
        const items = await category.find().limit(10)
        res.send(items)
    })
    // 读取某个分类
    router.get('/categories/:id',async(req,res)=>{
        const model = await category.findById(req.params.id)
        res.send(model)
    })
    // 修改某个分类
    router.put('/categories/:id',async(req,res)=>{
        const model = await category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    // 删除某个分类
    router.delete('/categories/:id',async(req,res)=>{
        await category.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })
    

    app.use('/admin/api',router)
}