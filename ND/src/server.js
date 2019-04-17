
const express = require ('express');

const app = express();

const startServer = port => {

    app.listen(port, function (){
        console.log('Example' + port); 
    });
}

module.exports = startServer;
