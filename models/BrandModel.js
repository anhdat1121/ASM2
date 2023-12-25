var mongoose = require('mongoose');
var BrandSchema = mongoose.Schema(
    {name:{ 
         type: String,
        required: true,
        minlength: [2, 'Please add more than 2 characters for brand names'],
        maxlength: 20}
      
        ,
    country: {
        type: String,
        required: true
        }
    }
    
)
var BrandModel = mongoose.model('brands', BrandSchema);
module.exports = BrandModel;