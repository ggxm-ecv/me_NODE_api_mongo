/*
Imports
*/
    // Node
    const express = require('express');
    // Inner
    const Controllers = require('../controller/index');
//

/*
Defintiion
*/
    class RouterClass{
        constructor(){
            this.router = express.Router();
        }

        routes(){
            // TODO: create CRUD routes

            // Define backoffice route for index
            this.router.get('/', (req, res) => {
                // Get all posts from the BDD
                Controllers.post.readAll()
                .then( apiResponse => {
                    // Render index vue with data
                    return res.render('index', {
                        msg: 'Posts found',
                        method: req.method,
                        err: null,
                        data: apiResponse,
                        url: req.originalUrl,
                        status: 200
                    })
                })
                .catch( apiError => {
                    // Render index vue with error
                    return res.render('index', {
                        msg: 'Posts found',
                        method: req.method,
                        err: apiError,
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            // Define backoffice route to create new post
            this.router.get('/post/create', (req, res) => {
                // Render edit vue with data
                return res.render('create', {
                    msg: 'Display vue create',
                    method: req.method,
                    err: null,
                    data: { title:undefined, content: undefined },
                    url: req.originalUrl,
                    status: 200
                })
            })

            // Define backoffice route to display edit vue
            this.router.get('/post/edit/:id', (req, res) => {
                // Get all posts from the BDD
                Controllers.post.readOne(req)
                .then( apiResponse => {
                    // Render edit vue with data
                    return res.render('edit', {
                        msg: 'Post found',
                        method: req.method,
                        err: null,
                        data: apiResponse,
                        url: req.originalUrl,
                        status: 200
                    })
                })
                .catch( apiError => {
                    // Render edit vue with error
                    return res.render('edit', {
                        msg: 'Post not found',
                        method: req.method,
                        err: apiError,
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            // Define backoffice route to update a post
            this.router.post('/post/edit/:id', (req, res) => {
                // Get all posts from the BDD
                Controllers.post.updateOne(req)
                .then( apiResponse => {
                    console.log(apiResponse)

                    // Fetch post
                    Controllers.post.readOne(req)
                    .then( postData => {
                        // Render edit vue with data
                        return res.render('edit', {
                            msg: 'Post found',
                            method: req.method,
                            err: null,
                            data: postData,
                            url: req.originalUrl,
                            status: 200
                        })
                    })
                    .catch( postError => {
                        // Render edit vue with data
                        return res.render('edit', {
                            msg: 'Post not found',
                            method: req.method,
                            err: postError,
                            data: null,
                            url: req.originalUrl,
                            status: 200
                        })
                    })

                })
                .catch( apiError => {
                    // Render edit vue with error
                    return res.render('edit', {
                        msg: 'Post not updated',
                        method: req.method,
                        err: apiError,
                        data: null,
                        url: req.originalUrl,
                        status: 404
                    })
                })
            })

            // Define backoffice route to delete one post
            this.router.get('/post/delete/:id', (req, res) => {
                // Get all posts from the BDD
                Controllers.post.deleteOne(req)
                .then( apiResponse => {
                    console.log(apiResponse)

                    // Redirect to index vue
                    return res.redirect('/');
                })
                .catch( apiError => {
                    // TODO: do something with error
                    console.log(apiError)

                    // Redirect to index vue
                    return res.redirect('/');
                })
            })

        }

        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return this.router;
        }
    }

//

/*
Export
*/
    module.exports = RouterClass;
//
