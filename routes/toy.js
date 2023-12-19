var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var BrandModel = require('../models/BrandModel');
var CategoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
    var toys = await ToyModel.find({}).populate('brand category');
    //Path: views/toy/index.hbs
    res.render('toy/index', { toys });
 })
 router.get('/add', async (req, res) => {
    var brands = await BrandModel.find({});
    var categories = await CategoryModel.find({});
    res.render('toy/add', { brands, categories });
 })
 router.post('/add', async (req, res) => {
   var toy = req.body;
   await ToyModel.create(toy);
   res.redirect('/toy');
 })
 router.get('/customer', async (req, res) => {
   var toys = await ToyModel.find({}).populate('brand category');
   //Path: views/toy/index.hbs
   res.render('toy/list', { toys });
})
router.get('/delete/:id', async (req, res) => {
   await ToyModel.findByIdAndDelete(req.params.id);
   res.redirect('/toy');
})
router.get('/edit/:id', async (req, res)=>{
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   var brands = await BrandModel.find({});
   var categories = await CategoryModel.find({});
   res.render('toy/edit', {toy, brands, categories});
})
router.post('/edit/:id', async (req, res)=>{
   var id = req.params.id;
   var toy = req.body;
   try{
      await ToyModel.findByIdAndUpdate(id, toy);
      console.log('Updated successfully');
   }catch(err){
      console.log('Error updating. Error: '+ err)
   }
   res.redirect('/toy');
   
})
router.get('/sort/asc', async (req, res) => {
   //SQL: SELECT * FROM toys ORDER BY name ASC
   var toys = await ToyModel.find().populate('brand category').sort({ name: 1 });
   res.render('toy/index', { toys })
   
})
router.get('/sort/desc', async (req, res) => {
   //SQL: SELECT * FROM toys ORDER BY name DESC
   var toys = await ToyModel.find().populate('brand category').sort({ name: -1 });
   res.render('toy/index', { toys })
})
router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM toys WHERE name LIKE '%keyword%'
   var toys = await ToyModel.find({ name: new RegExp(keyword, "i") }).populate('brand category');
   res.render('toy/index', { toys })
})
module.exports = router;