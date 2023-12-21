var mongoose = require('mongoose');
var CountrySchema = mongoose.Schema(
    {name:{ 
         type: String,
        required: true,
        minlength: [2, 'Please add more than 2 characters for country names'],
        maxlength: 20}
      
    
    }
    
)
var CountryModel = mongoose.model('countries', CountrySchema);
module.exports = CountryModel;