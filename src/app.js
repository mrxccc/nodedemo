const express = require("express"); 
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//1.所有错误，http status = 500
app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({
            message:err.message
        })
    }
})

//列表
app.get('/list', async (req, res, next)=>{
    // next(new Error(new Error('自定义异常')))
    res.json({
        list:[]
    })
})
//新增
app.post('/create', async (req, res ,next)=>{
    try {
        let {name, deadline,content} = req.body
        let todo = await models.Todo.create({
            name,
            deadline,
            content
        })
        res.json({
            todo:[],
            message: "创建成功"
        })
    } catch (error) {
        next(error)
    }
})

//修改
app.post('/update', async (req, res ,next)=>{
    let {id,name,deadline,content} = req.body
    res.json({
        todo:[],
        id,
        name,
        deadline,
        content
    })
})

//删除
app.post('/delete', async (req, res ,next)=>{
    let {id,status} = req.body
    res.json({
        todo:[],
        id,
    })
})

app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({
            message:err.message
        })
    }
})

app.listen(3000,()=>{
    console.log('服务启动成功')
})