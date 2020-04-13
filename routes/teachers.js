const fs = require('fs')
const routes = require('express').Router()

routes.get('/', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf8', (err,data) => {
        if(err){
          res.send(err)
        } else{
          data = JSON.parse(data)
          res.render('teachers', {data})
        }
    })
})
routes.get('/:id', (req, res) => {
  fs.readFile('./data/teachers.json', 'utf-8', (err, data) => {
      if(err){
          res.send(err);
      } else {
          data = JSON.parse(data);
          let id = req.params.id, result;
          let check = false;

          data.forEach(item => {
              if(id == item.id){
                  result = item;
                  check = true;
              }
          });

          if(!check){
              res.send('ID not found');
          } else {
              res.send(result);
          }
      }
  })
})

module.exports = routes