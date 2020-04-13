const Models = require('../models')

class Render {
    
    static page = (page, request, response) => {

        if (request.params.id == 'add' || request.params.email == 'add') {
            response.render('new', {form: page, data: null})
            return;
        }
        
        switch (true) {
            case request.params.hasOwnProperty('id') : {
                Models.findById(page, 'id', request.params.id)
                    .then(result => {
                        if (!request.params.hasOwnProperty('action')) {
                            response.render(page, {data: result, readyForAction: true})
                        } else {
                            
                            switch (request.params.action) {
                                case 'edit' : {
                                    Models.findById(page, 'id', request.params.id)
                                        .then(result => {
                                            response.render('new', {form: page, data: result})
                                        })
                                }; break;

                                case 'delete' : {
                                    Models.delete(page, request.params.id)
                                        .then(redir => response.redirect(302, `/${redir}`))
                                        .catch(err => response.send(err))
                                }
                            }

                        }
                    })
                    .catch(err => response.send(err))
            }; break;

            case request.params.hasOwnProperty('email') : {
                Models.findById(page, 'email', request.params.email)
                    .then(result => {

                        if (!request.params.hasOwnProperty('action')) {
                            response.render(page, {data: result, readyForAction: true})
                        } else {

                            switch (request.params.action) {
                                case 'edit' : {
                                    Models.findById(page, 'email', request.params.email)
                                        .then(result => {
                                            response.render('new', {form: page, data: result})
                                        })
                                }; break;

                                case 'delete' : {
                                    Models.delete(page, request.params.email)
                                        .then(redir => response.redirect(302, `/${redir}`))
                                        .catch(err => response.send(err))
                                }; break;
                            }
                        }
                    })
                    .catch(err => response.send(err))
            }; break;

            default : {
                Models.db(page)
                    .then(result => response.render(page, {data: result, readyForAction: false}))
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

    static post = (request, response) => {
        if (!request.params.hasOwnProperty('id')) {
            Models.newData('teachers', request.body)
        } else {
            Models.update('teachers', request.body)
        }

        response.status(302).redirect('/teachers')
    }

}

class Students {
    
    static render = (request, response) => {

        Render.page('students', request, response)

    }

    static post = (request, response) => {

        if (!request.params.hasOwnProperty('id')) {
            Models.newData('students', request.body)
        } else {
            Models.update('students', request.body)
        }

        response.redirect(302, '/students')
    }

}

class Subjects {

    static render = (request, response) => {
        Render.page('subjects', request, response)
    }

    static post = (request, response) => {
        Models.newData('subjects', request.body)
        response.redirect(302, '/subjects')
    }

}

module.exports = {Home, Teachers, Students, Subjects}