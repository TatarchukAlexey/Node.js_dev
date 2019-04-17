const express = require('express');
const app = express();
const logger = require ('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/routes');

mongoose.connect('mongodb+srv://sculpter:123@cluster0-3ixor.mongodb.net/sculpter?retryWrites=true', 
{useNewUrlParser: true,
 useCreateIndex: true
});
 

app.use(logger('tiny'));
app.use(express.urlencoded({extended: true})); // распаршивает юрл
app.use(express.json()); 
app.use(cors());

app.use('/', express.static('public'));

app.use('/api',router)

app.listen(3000, ()=> {console.log('Server start on 3000 port');
})









