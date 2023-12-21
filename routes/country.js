var express = require('express');
var router = express.Router();
var CategoryModel = require('../models/CategoryModel');
var CountryModel = require('../models/CountryModel');
var ToyModel = require('../models/ToyModel');

router.get('/', async (req, res) => {
    var categories = await CountryModel.find({});
    res.render('country/index', { countries });
 })
router.get('/add', (req, res) => {
   res.render('country/add');
})

router.post('/add', async (req, res) => {
   var country = req.body;
   await CountryModel.create(country);
   res.redirect('/brand');
})
// router.get('/add', (req, res) => {
//     res.render('category/add');
//  })
 
//  router.post('/add', async (req, res) => {
//     var category = req.body;
//     await CategoryModel.create(category);
//     res.redirect('/category');
//  })
 module.exports = router;