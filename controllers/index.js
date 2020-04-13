const Models = require('../models')

class Home {

    static send(request, response) {
        response.send('Ola ! ........')
    }

}

class Teachers {


    static send = (request, response) => {
        Models.db('teachers')
            .then(result => response.send(result))
            .catch(err => response.send(err))
    }

}

class Students {
    
    static send = (request, response) => {
        Models.db('students')
            .then(result => response.send(result))
            .catch(err => response.send(err))
    }

}

class Subjects {

    static send = (request, response) => {
        Models.db('subjects')
            .then(result => response.send(result))
            .catch(err => response.send(err))
    }

}

module.exports = {Home, Teachers, Students, Subjects}