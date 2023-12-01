/* CRUD OPERATIONS*/
// Read Operation
// Get route for the book list

var express = require('express');
var router = express.Router();
let recipie = require('../models/recipie');

/* Displaying */
//*displays recipie on page//*
module.exports.DisplayRecipieList = async (req,res,next)=>{
    try{
       const recipielist = await recipie.find();
       res.render('recipie/list', {
          title: 'Recipie List',
          displayName: req.user ? req.user.displayName:'',
          recipielist: recipielist
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('recipie/list', {
          error: 'Error on server'
       });
    }
 };

 

// Add Operation
// Get route for displaying the Add-Page -- Create Operation

 module.exports.AddRecipie = (req,res,next)=>{
    try{
        res.render('recipie/add',
        {
            title:'Add Recipie',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('recipie/list',
        {
            error: 'Error on the server'
        });
    }
};

// Post route for processing the Add-Page -- Create Operation
module.exports.ProcessRecipie = (req,res,next)=>{
    try{
        let newRecipie= recipie({
            "name":req.body.name,
            "ingridents":req.body.ingridents,
            "description":req.body.description,
            "instructions":req.body.instructions,
            "duration":req.body.duration
        });
        recipie.create(newRecipie).then(() =>{
            res.redirect('/recipielist')
        })
    }
    catch(error){
        console.error(err);
        res.render('recipie/list',
        {
            error: 'Error on the server'
        });
    }
};

// Edit Operation
// Get route for displaying the Edit Operation -- Create Operation
module.exports.EditRecipie = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const RecipieToedit = await recipie.findById(id);
    res.render('recipie/edit',
    {
        title:'Edit Recipie',
        displayName: req.user ? req.user.displayName:'',
        recipie:RecipieToedit
    })
}
catch(error){
    console.error(err);
    res.render('recipie/list',
    {
        error: 'Error on the server'
    });
}
}

// Post route for processing the Add-Page -- Create Operation
module.exports.ProcessEditRecipie = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedRecipie = recipie({
            "_id":id,
            "name":req.body.name,
            "ingridients":req.body.ingridents,
            "description":req.body.description,
            "instructions":req.body.instructions,
            "duration":req.body.duration
        });
        recipie.findByIdAndUpdate(id,updatedRecipie).then(()=>{
            res.redirect('/recipielist')
        });
    }
    catch(error){
        console.error(err);
        res.render('recipie/list',
        {
            error: 'Error on the server'
        });
    }
}

// Delete Operation
// Get route for perform Delete Operation -- Deletion

module.exports.DeleteRecipie = (req,res,next)=>{
    try{
        let id = req.params.id;
        recipie.findByIdAndDelete(id).then(() =>
        {
            res.redirect('/recipielist')
        })
    }
    catch(error){
        console.error(err);
        res.render('recipie/list',
        {
            error: 'Error on the server'
        });
    }
}





