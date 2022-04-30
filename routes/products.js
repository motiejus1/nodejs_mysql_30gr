// /products - visus produktus
// /products/add - prides produktus
// /products/delete - istrints
// /products/edit - redaguos
// ...

var express = require('express');
var router = express.Router();
var databaseConnection = require('../lib/database');

// /products

router.get('/', function(req, res, next) {
    //
    // /products -> pasirenka atitinkama funkcija kuria reikia ivykdti ir grazina atsakyma atvaizdavimui
    // /products kreipiasi i kontroleri, kontroleris kreipiasi i duomenu baze(modeli) ir grazina is modelio atsakyma
    databaseConnection.query('SELECT * FROM products', function(err, rows){
        if(err) {
            //req.flash('error', err);
            res.render('products',{data: 'test'});
        } else {
            res.render('products',{data:rows}); //data:rows yra sql uzklausos rezultatas kaip JSON masyvas
        }
    }); 
});

module.exports = router;