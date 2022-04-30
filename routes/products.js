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

    let errors = false;

    if(productCode.length === 0 || productName.length === 0 || productLine.length === 0 || buyPrice.length === 0) {
        errors = true;
        req.flash('error', 'Visi laukeliai turi buti uzpildyti');

        res.render('products/add', {
            productCode: productCode ,
            productName: productName,
            productLine: productLine,
            buyPrice: buyPrice
        })
    }

    if(!errors) {
        var form_data = {
            productCode: productCode ,
            productName: productName,
            productLine: productLine,
            buyPrice: buyPrice
        }
        databaseConnection.query('INSERT INTO products SET ?', form_data, function(err,result) {
            if(err) {
                req.flash('error', err);
                res.render('products/add',{
                    productCode: form_data.productCode ,
                    productName: form_data.productName,
                    productLine: form_data.productLine,
                    buyPrice: form_data.buyPrice
                })
            } else {
                req.flash('success', 'Produktas pridetas');
                res.redirect('/products');
            }
        });
    }


});

router.get('/delete/(:productCode)', function(req,res,next) {
    let productCode = req.params.productCode;
    databaseConnection.query('DELETE FROM products WHERE productCode="'+productCode+'"',function(err,result){
        if(err) {
            req.flash('error', err);
            res.redirect('/products');
        } else {
            req.flash('success', 'Produktas, kurio kad yra' + productCode + ' sekmingai istrintas' );
            res.redirect('/products');
        }
    });
});

module.exports = router;