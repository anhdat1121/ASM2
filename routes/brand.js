var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
var ToyModel = require('../models/ToyModel');

router.get('/', async(req, res) =>{
    var brands = await BrandModel.find({});
  res.render('brand/index',{brands});
});
router.get('/add', (req, res) => {
    res.render('brand/add');
 })
 router.post('/add', async (req, res) => {
    var brand = req.body;
    await BrandModel.create(brand);
    res.redirect('/brand');
 })
 router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM toys WHERE brand = "id"
   var toys = await ToyModel.find({ brand : id }).populate('brand');
   res.render('brand/detail', { toys })
})

 router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    try {
       //SQL: DELETE FROM brands WHERE brand = id
       await BrandModel.findByIdAndDelete(id);
       console.log('Delete brand succeed !');
    } catch (err) {
       console.log('Delete brand fail. Error: ' + err);
    };
    res.redirect('/brand');
 })
 router.get('/deleteall', async (req, res) => {

    await BrandModel.deleteMany();
    console.log('Delete all brand succeed !');
    res.redirect('/brand');
 })
 router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var brand = await BrandModel.findById(id);
    res.render('brand/edit', { brand });
 })
 router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var brand = req.body;
    try {
       //SQL: UPDATE brands SET A = B WHERE id = 'id'
       await BrandModel.findByIdAndUpdate(id, brand);
       console.log('update succeed !');
    } catch (err) {
       console.log('update failed. Error: ' + err);
    }
    res.redirect('/brand');
 })
 router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM toys WHERE name LIKE '%keyword%'
   var brands = await BrandModel.find({ name: new RegExp(keyword, "i") }).populate('');
   res.render('brand/index', { brands })
 })
module.exports = router;