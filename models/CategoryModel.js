var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema(
    {name:{ 
         type: String,
        required: true,
        minlength: [2, 'Please add more than 2 characters for category names'],
        maxlength: 20}
      
    ,
    material: {
        type: String,
        required: true
        }
    }
    
)
var CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;