const routes=require('express').Router()
const fs=require('fs')

routes.get('/',function(req,res){
    fs.readFile('./students.json','utf8',(err,data)=>{
    if(err){
        res.send(err)
    }else{
        data=JSON.parse(data)
        // res.send(data)
        res.render('./students.ejs',{data})
    }
})
})

routes.get('/:id/edit',function(req,res){
    fs.readFile('./students.json','utf8',(err,data)=>{
        if(err){
            res.send(err)
        }else{
            data=JSON.parse(data) 
            const found=data.some(data=>data.id===parseInt(req.params.id))
            if(found){
                data=data.filter(data=>data.id===parseInt(req.params.id))
                res.render('./add.ejs',{data})
            }  
        }
    })  
})

routes.post('/:id/edit',function(req,res){
    fs.readFile('./students.json','utf8',(err,data)=>{
        if(err){
            res.send(err)
        }else{
            data=JSON.parse(data) 
            const found=data.some(data=>data.id===parseInt(req.params.id))
            if(found){
                // res.send(data[req.params.id])
                data[req.params.id-1].first_name=req.body.fname
                data[req.params.id-1].last_name=req.body.lname
                data[req.params.id-1].email=req.body.email
                data[req.params.id-1].gender=req.body.gender
                data[req.params.id-1].birth_date=req.body.birthdate
                fs.writeFile('./students.json',JSON.stringify(data),(err,data)=>{})
                // res.render('./add.ejs',{data})
                res.redirect('/students')
            }  
        }
    })  
})

routes.get('/add',function(req,res){
    fs.readFile('./students.json','utf8',(err,data)=>{
        if(err){
            res.send(err)
        }else{
            data=JSON.parse(data)
            res.render('./add.ejs',{data})  
        } 
    })
})

routes.post('/add',function(req,res){
    fs.readFile('./students.json','utf8',(err,data)=>{
    if(err){
        res.send(err)
    }else{
        data=JSON.parse(data)
        const student={
            id:data[data.length-1].id+1,
            first_name:req.body.fname,
            last_name:req.body.lname,
            email:req.body.email,
            gender:req.body.gender,
            birth_date:req.body.birthdate
        }
        data.push(student)
        fs.writeFile('./students.json',JSON.stringify(data),(err,data)=>{})
        res.redirect('/students')  
    }
})
})

routes.get('/:email',function(req,res){
    fs.readFile('./students.json','utf8',(err,data)=>{
    if(err){
        res.send(err)
    }else{
        data=JSON.parse(data)
        const found=data.some(data=>data.email===req.params.email)
        if(found){
            data=data.filter(data=>data.email===req.params.email)
            res.render('./students.ejs',{data})
        }else {
            res.status(400).json({msg: `No member with email of ${req.params.email}`})
        }
        // res.send(data)
        // res.render('./students.ejs',{data})
    }
})
})

routes.get('/:id/delete',function(req,res){
    fs.readFile('./students.json','utf8',(err,data)=>{
        if(err){
            res.send(err)
        }else{
            data=JSON.parse(data)
            let result=[] 
            for (let i = 0; i < data.length; i++) {
                if(data[i].id==Number(req.params.id)){
                    continue
                }else {
                    result.push(data[i])
                }
            }
            fs.writeFile('./students.json',JSON.stringify(result),(err,data)=>{}) 
            res.redirect('/students')
        }
    })  
})





module.exports=routes