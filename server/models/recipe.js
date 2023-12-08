let mongoose= require('mongoose');

// create an recipe model 

let recipemodel= mongoose.Schema({
"name":String,
"ingridients":String,
"description":String,
"instructions":String,
"duration":String},

{
    collection:"recipe"
    
});

module.exports= mongoose.model('recipe', recipemodel);





