/* CRUD OPERATIONS*/
// Read Operation
// Get route for the list

var express = require('express');
var router = express.Router();
let recipe = require('../models/recipe');

/* Displaying */
//*displays recipe on page//*
module.exports.DisplayRecipeList = async (req,res,next)=>{
    try{
       const recipelist = await recipe.find();
       res.render('recipe/list', {
          title: 'Recipe List',
          displayName: req.user ? req.user.displayName:'',
          recipelist: recipelist
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('recipe/list', {
          error: 'Error on server'
       });
    }
 };

 

// Add Operation
// Get route for displaying the Add-Page -- Create Operation

 module.exports.AddRecipe = (req,res,next)=>{
    try{
        res.render('recipe/add',
        {
            title:'Add Recipe',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('recipe/list',
        {
            error: 'Error on the server'
        });
    }
};

// Post route for processing the Add-Page -- Create Operation
module.exports.ProcessRecipe = (req,res,next)=>{
    try{
        let newRecipe= recipe({
            "name":req.body.name,
            "ingridients":req.body.ingridients,
            "description":req.body.description,
            "instructions":req.body.instructions,
            "duration":req.body.duration
        });
        recipe.create(newRecipe).then(() =>{
            res.redirect('/recipelist')
        })
    }
    catch(error){
        console.error(err);
        res.render('recipe/list',
        {
            error: 'Error on the server'
        });
    }
};

// Edit Operation
// Get route for displaying the Edit Operation -- Create Operation
module.exports.EditRecipe = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const RecipeToedit = await recipe.findById(id);
    res.render('recipe/edit',
    {
        title:'Edit Recipe',
        displayName: req.user ? req.user.displayName:'',
        recipe:RecipeToedit
    })
}
catch(error){
    console.error(err);
    res.render('recipe/list',
    {
        error: 'Error on the server'
    });
}
}

// Post route for processing the Add-Page -- Create Operation
module.exports.ProcessEditRecipe = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedRecipe = recipe({
            "_id":id,
            "name":req.body.name,
            "ingridients":req.body.ingridients,
            "description":req.body.description,
            "instructions":req.body.instructions,
            "duration":req.body.duration
        });
        recipe.findByIdAndUpdate(id,updatedRecipe).then(()=>{
            res.redirect('/recipelist')
        });
    }
    catch(error){
        console.error(err);
        res.render('recipe/list',
        {
            error: 'Error on the server'
        });
    }
}

// Delete Operation
// Get route for perform Delete Operation -- Deletion

module.exports.DeleteRecipe = (req,res,next)=>{
    try{
        let id = req.params.id;
        recipe.findByIdAndDelete(id).then(() =>
        {
            res.redirect('/recipelist')
        })
    }
    catch(error){
        console.error(err);
        res.render('recipe/list',
        {
            error: 'Error on the server'
        });
    }
}





