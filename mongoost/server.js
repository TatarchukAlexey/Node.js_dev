const express = require ('express');
const app = express();
const route = express.Router();
const saveUserMultipart = require ('./save-user-multipart');


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Alex:ljdjl321@abra-ni0lm.mongodb.net/test?retryWrites=true', 
{useNewUrlParser: true},
(err) => {
    if(err)console.log(err);
    console.log("Connect ti MongoDB");
  }
);

app.use(express.json()); //вместо бодипарсера

const UsersSchema = new mongoose.Schema({  //метод монгуса создаем просто объект со структорой нужной наш
    email: String,
    name: String,
    password: String,
    tel: Number
  });
  
const UserModel = mongoose.model('User', UsersSchema, "blala"); //это коллекция
// console.log(UserModel);
//    app.get('/', (req, res)=>{   // rout запрос
//        res.send("Hello is");
//    });
   app.get('/', (req, res)=>{   // rout запрос от клиента
    UserModel.find({},(err,docs) =>{
        if(err) console.log(err);
        res.json(docs); 
    })
    UserModel.find();
   });
 //стучимся к какому то юзеру
 app.get("/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id);
    
    // UserModel.findById(id).then(doc =>{ // найжет нужного юзера
    //     res.json(doc);

    UserModel.findById(id).then(doc =>{  //берет нужного юзера по id, и берет нужные ключи только
        const {tel,name} = doc;
        res.json({tel,name});
        
    });

 })

   app.post('/', (req, res)=>{   // rout
    // console.log(req.body);
    // res.json(req.body)
    // const {name,email,password,tel} = req.body;
    const data = req.body;
    const newUser = new UserModel (data);
    // console.log(newUser);
    newUser.save((err, doc) => {
        if (err) console.log(err);
        console.log(doc) }
    )    
   });

  app.post("/users", saveUserMultipart());


    app.listen(3000,()=>{
        console.log(`Server is listening on 3000`)   
    })


