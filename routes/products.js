// /products - visus produktus
// /products/add - prides produktus
// /products/delete - istrints
// /products/edit - redaguos
// ...

var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
var databaseConnection = require('../lib/database');

// /products

router.get('/', function(req, res, next) {
    //
    // /products -> pasirenka atitinkama funkcija kuria reikia ivykdti ir grazina atsakyma atvaizdavimui
    // /products kreipiasi i kontroleri, kontroleris kreipiasi i duomenu baze(modeli) ir grazina is modelio atsakyma
    databaseConnection.query('SELECT * FROM products', function(err, rows){
        if(err) {
            req.flash('error', err);
            res.render('products',{data: 'test'});
        } else {
            res.render('products',{data:rows}); //data:rows yra sql uzklausos rezultatas kaip JSON masyvas
        }
    }); 
});

//idejimo vaizdas
router.get('/add', function(req, res, next){
    res.render('products/add', {
        productCode: '',
        productName: '',
        productLine: '',
        buyPrice: ''
    })          //add.ejs
});

//produkto idejimo veiksma

router.post('/add', function(req,res,next){

    let productCode = req.body.productCode;
    let productName = req.body.productName;
    let productLine = req.body.productLine;
    let buyPrice = req.body.buyPrice;


});

module.exports = router;