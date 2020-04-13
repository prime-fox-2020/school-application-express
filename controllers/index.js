const Models = require('../models')

class Render {
    
    static page = (page, request, response) => {

        console.log(request.params)

        switch (true) {
            case request.params.hasOwnProperty('id') : {
                Models.findById(page, 'id', request.params.id)
                    .then(result => response.render(page, {data: result}))
                    .catch(err => response.send(err))
            }; break;
            
            case request.params.hasOwnProperty('email') : {
                Models.findById(page, 'email', request.params.email)
                    .then(result => response.render(page, {data: result}))
                    .catch(err => response.send(err))
            }

            default : {
                Models.db(page)
                    .then(result => response.render(page, {data: result}))
                    .catch(err => response.send(err))
            }
        }
    }

}

class Home {

    static render(request, response) {
        response.render('index')
    }

}

class Teachers {

    static render = (request, response) => {
        
        Render.page('teachers', request, response)
    }

}

class Students {
    
    static render = (request, response) => {

        Render.page('students', request, response)

    }

}

class Subjects {

    static render = (request, response) => {
        Render.page('subjects', request, response)
    }

}

module.exports = {Home, Teachers, Students, Subjects}