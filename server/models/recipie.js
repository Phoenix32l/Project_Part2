let mongoose= require('mongoose');

// create an recipie model 

let recipiemodel= mongoose.Schema({
"name":String,
"ingridients":String,
"description":String,
"instructions":String,
"duration":String},

{
    collection:"recipie"
    
});

module.exports= mongoose.model('recipie', recipiemodel);





