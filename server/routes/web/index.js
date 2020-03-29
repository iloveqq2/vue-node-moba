module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')
    router.get('/news/init', async (req,res)=>{
        const parent = await Category.findOne({
            name:'news'
        })
        const cats = await Category.find().where({
            parent:parent   // 亮点：这里查询条件直接把上面的parent对象传入，好像效果等同parent.id= new 对应的id
        }).lean()
        

        let newsTitles = ["新皮肤爆料丨灵猫化身刺客，不知火舞新装登场~", "体验服爆料丨亲密关系升级，战队荣耀再续~", "狄某有话说丨峡谷野区有状况！这种队友必须严惩！", "被CCTV记录的王者荣耀，国人自己的电竞舞台", "新皮肤爆料丨西子湖畔再续前缘，小乔换装化身青蛇~", "3月17日全服不停机更新公告", "3月21日体验服停机修复公告", "3月21日体验服停机更新公告", "【体验服】排位赛、巅峰赛临时关闭调优公告", "【体验服】关于体验服对局闪退异常问题说明", "峡谷寻宝——传说史诗皮肤自选夺活动开启", "【手Q用户专属】买小乔-青蛇 新皮肤，抽取免单奖励", "春暖花开聚峡谷 多重好礼领不停", "白色情人节【玫瑰芬芳，纸短情长】活动公告", "白色情人节 浪漫好礼来袭", "赛事战令功能开启公告", "2020年KPL春季赛云开赛，今日18点看成都AG和重庆QG揭幕战！", "【KPL今日预报】成都AG超玩会 vs 重庆QG，揭幕战宿敌再遇谁能首胜？", "关于王者荣耀国际轮回赛（KPLGT）积分年的计算规则", "王者荣耀国际巡回赛（KPLGT）2020年春季赛开赛时间公告"]
        const newsList = newsTitles.map(title=>{
            // 亮点 面试题
            const randomCats = cats.slice(0).sort((a,b)=>{Math.random()-0.5})
            return {
                categories:randomCats.slice(0,2),
                title:title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
        // const cats = await Category.find().lean();
    })

     // 新闻列表接口
  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = (cat.name === '热门')
          ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)

  })

    app.use('/web/api',router)
}