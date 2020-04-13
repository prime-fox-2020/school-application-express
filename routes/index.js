const routes =require('express').Router()
const studentsRoutes=require('./students')
const teachersRoutes=require('./teachers')
const subjectsRoutes=require('./subjects')

routes.get('/',function(req,res){
    res.send('School Application')
})

routes.use('/students',studentsRoutes)
routes.use('/teachers',teachersRoutes)
routes.use('/subjects',subjectsRoutes)

module.exports=routes