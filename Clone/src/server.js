const express = require ('express');
const app = express();
const birthRouter = require('./routes/birds-routes');

const startServer = port  => {

    app.get('/', function (req,res){   // когда мы заходим на локал хост 3000
        res.send ('Hello World');
    });

    app.use('/', function (req,res){   
        res.send ('Hello World');
    });

    app.listen(port, function (){
        console.log('Example'); 
    });
}

module.exports =startServer
