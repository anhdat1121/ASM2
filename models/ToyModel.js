var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
    name: String,
    color: String,
   image: String,
   brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brands'  // 'brands': collection
 },
 category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'  // 'categories': collection
 }
})
var ToyModel = mongoose.model('toys', ToySchema); // 'toys' : collection
module.exports = ToyModel;