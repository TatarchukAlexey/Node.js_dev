const express = require ('express');
const app = express();
const logger = require ('morgan'); //мидл вар отслеживает все наши действия

const router = require('./routes');

app.use(logger("tiny")); //для проверки
app.use(express.json()); //вместо биодпарсер
app.use("/", express.static('client'));

app.use("/assets/audio",express.static("assets/audio") ); //добавить музыку (http://localhost:4000/assets/audio/test.mp3)

app.use('/api', router);

app.listen(4000,()=>{
    console.log('server started on 4000 port');
    
});


