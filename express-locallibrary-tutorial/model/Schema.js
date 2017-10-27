//Import the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// student Schema
let studentSchema = new Schema({
  name: String,
    
  class: String,
    
  pressence: String, 
    
  
});

let Students = module.exports = mongoose.model('Students', studentSchema);