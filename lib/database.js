// susijungima su mysql duomenu baze
var mysql = require('mysql');

var connection = mysql.createConnection({
        host: 'localhost',
        user:'root',
        password: '',
        database: 'classicmodels'
});

connection.connect(function(error){
    if(error) {
        console.log(error)
    } else {
        console.log('Prisijungimas ivyko sekmingai');
    }
});

module.exports = connection;