const express = require ('express');
const app = express();
const fs = require ('fs'); // могу прочитать файл
const path = require ('path'); //могу указать папки нужные
const bodyParser =require ('body-parser')


const usersDbPath = path.join(__dirname,'db/users.json') //берем файл для чтения
const usersData = JSON.parse(fs.readFileSync(usersDbPath, 'utf8')) //читаем файл / обязательно распаршиваем

const createServer = port => {
    app.use(bodyParser.json()) // подключаем модуль бодипарсер, он передаст весь боди в риквест и можем его везде использовать

   app.get('/users', (req, res)=>{  
    res.json(usersData)  // вывели в файл юзерс объект с данными, весь объект
   });

   app.get('/users/:id', (req, res)=>{    // обязательно ставим /:
    const id = req.params.id; 
    const filterUsers = usersData.users.filter(el =>el.id===id); // нашли нужного одного юзера 
    res.json ({users:filterUsers})  // вывели в файл не весь обеъкт а один ключ, одного юзера  (http://localhost:3000/users/5002)

   });

   app.post('/users', (req,res)=>{
       const newData = {users:[...usersData.users, req.body]}
       fs.writeFileSync(usersDbPath, JSON.stringify(newData)); // пересохраняем в базе данных на сервере
       res.json(newData) // вывод на экран, ответ клиенту
       console.log(newData);  //смотрим в терминале  
   });

   
   app.post('/test', (req,res)=>{
    console.log(req.body);  //смотрим в терминале  
    res.json(req.body) // вывод на экран, ответ клиенту
});
   

   app.delete('/users/:id', (req,res)=>{
    const id = req.params.id; 
    const newArr = usersData.users.filter(el=>el.id !== id)
    fs.writeFileSync(usersDbPath, JSON.stringify({ users: newArr}));
    res.json({ users: newArr});
     
   })

   app.put ('/users/:id', (req,res)=>{   //обновление данных на сервере
    const id = req.params.id; 
    const newArr = usersData.users.map(el=>{   // мапом перезаписуем
        if(el.id === id) return {...el, ...req.body}
        return el; //без ретерн ел - будет андефайнт
    })
    fs.writeFileSync(usersDbPath, JSON.stringify({ users: newArr})); //перезаписуем
    res.json({ users: newArr});  // посылаем ответ на клиента  
    console.log(newArr);
     
   })




    app.listen(port,()=>{
        console.log(`Server is listening on ${port}`)   
    })
}
module.exports = createServer;




//провекрка всегда фетчем, дать делает бэкендщик
// fetch('http://localhost:3000/users',
//  { 
//     method: 'POST',
//     body: JSON.stringify(
//         { 
//             "id": "5010",
//               "username": "John",
//             "password": '11111111',
//             "orders": ['5caa490ab71df91bc84056ee'],
//              "lastName": "Forman",
//              "email":"Ivan@gmail.com"
//          }
//     ),
//    headers: { 'content-type': 'application/json' }

// }).then( (response)=>{ response.json()
// .then( (data)=>{ console.log(data) } ) } )
// .catch((err)=>{console.log(err)})


// обновляем данные
// fetch('http://localhost:3000/users/5001',
//  { 
//     method: 'PUT',
//     body: JSON.stringify(
//         { 
//             name: "Nikolay",
//             balence: 9999,
//          }
//     ),
//    headers: { 'content-type': 'application/json' }

// }).then( (response)=>{ response.json()
// .then( (data)=>{ console.log(data) } ) } )
// .catch((err)=>{console.log(err)})

//удаляем (в урл выставить http://localhost:3000/users/5010), и сделать запрос фетч
// fetch('http://localhost:3000/users/5010',
//  { 
//     method: 'DELETE'
// }).then( (response)=>{ response.json()
// .then( (data)=>{ console.log(data) } ) } )
// .catch((err)=>{console.log(err)})