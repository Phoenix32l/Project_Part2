var express = require('express');
var router = express.Router();
let recipe= require('../models/recipe');
let recipecontroller = require('../controller/recipe')

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
router.get('/', recipecontroller.DisplayRecipeList);
/* Get route for Add Book page --> Create */
router.get('/add', requireAuth, recipecontroller.AddRecipe); 
/* Post route for Add Book page --> Create */
router.post('/add', requireAuth, recipecontroller.ProcessRecipe);
/* Get route for displaying the Edit Book page --> Update */
router.get('/edit/:id', requireAuth, recipecontroller.EditRecipe);
/* Post route for processing the Edit Book page --> Update */
router.post('/edit/:id', requireAuth,recipecontroller.ProcessEditRecipe);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, recipecontroller.DeleteRecipe);
module.exports = router;



