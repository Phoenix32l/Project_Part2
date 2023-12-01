var express = require('express');
var router = express.Router();
let recipie= require('../models/recipie');
let recipiecontroller = require('../controller/recipie')

let mongoose = require('mongoose');
// helper function
function requireAuth(req,res,next){
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}


// Read Operation
router.get('/', recipiecontroller.DisplayRecipieList);
/* Get route for Add Book page --> Create */
router.get('/add', requireAuth, recipiecontroller.AddRecipie); 
/* Post route for Add Book page --> Create */
router.post('/add', requireAuth, recipiecontroller.ProcessRecipie);
/* Get route for displaying the Edit Book page --> Update */
router.get('/edit/:id', requireAuth, recipiecontroller.EditRecipie);
/* Post route for processing the Edit Book page --> Update */
router.post('/edit/:id', requireAuth,recipiecontroller.ProcessEditRecipie);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, recipiecontroller.DeleteRecipie);
module.exports = router;



