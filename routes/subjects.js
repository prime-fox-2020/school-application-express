const routes=require('express').Router()
const fs=require('fs')

routes.get('/',function(req,res){
    fs.readFile('./subjects.json','utf8',(err,data)=>{
    if(err){
        res.send(err)
    }else{
        data=JSON.parse(data)
        // res.send(data)
        res.render('./subjects.ejs',{data})
    }
})
})

routes.get('/:id',function(req,res){
    fs.readFile('./subjects.json','utf8',(err,data)=>{
    if(err){
        res.send(err)
    }else{
        data=JSON.parse(data)
        const found=data.some(data=>data.id===parseInt(req.params.id))
        if(found){
            // res.send(data.filter(data=>data.id===parseInt(req.params.id)))
            data=data.filter(data=>data.id===parseInt(req.params.id))
            res.render('./subjects.ejs',{data})
        }else {
            res.status(400).json({msg: `No member with id of ${req.params.id}`})
        }
        // res.send(data)
        // res.render('./subjects.ejs',{data})
    }
})
})

module.exports=routes