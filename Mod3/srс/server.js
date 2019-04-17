const express = require ('express'); //вызываем феймворк экспрес
const bodyParser = require ('body-parser'); // вызываем bodyParser для подключение всех мидл варов
const fs = require ('fs'); // работа с файловой системой
const path = require ('path');

const app = express(); // запускаем фейворк ноды для работы с мидл варами
//path  работа с путями, папки ни какие не создаем
// get это всегда урлы

const startServer = port  => { //создаем сервер
 
    app.use(bodyParser.json()); // bodyParser парсер ставим вначале. Зачем?

//====================== метод гет ================

    app.get('/', function (req,res){   // получаем
        res.send ('<h1 style="color: green;"> Hello World </h1>');
    });
//====================== метод пост ================
    app.post('/user', function (req,res){   // отправляем просто запрос
      const dbUsersPath = path.join(__dirname, '/db/users'); 
        const usersData = JSON.parse(fs.readFileSync (`${dbUsersPath}/all-users.json`, 'utf8' ));
        // 'utf8' - без него не будет работать если на кирилице
        const body = req.body;
        const newArr = [...usersData.users, body]    
          fs.writeFileSync(`${dbUsersPath}//all-users.json`, JSON.stringify({users: newArr}));  // записываем на сервере нужные изменения
          //fs.writeFileSync - создает жсон файл в папке юзерс
        
        console.log('save is yes'); 
        res.send ({status: "success"});
    });
    //// (конец)      
//====================== метод пут ================
    // app.put('/user/:id', function (req,res){   // меняем объект на сервере через пут

    //     const dbUsersPath = path.join(__dirname, '/db/users'); 
    //     const usersData = JSON.parse(fs.readFileSync (`${dbUsersPath}/all-users.json`, 'utf8' ));
    //     // 'utf8' - без него не будет работать если на кирилице
    //     const body = req.body;
    //     if(req.body && req.body.userName){  // проверка чтобы пустая строка или объект не пришел
    //         const newArr = [...usersData.users].map(el => { // перебераем объекты
    //             if (el.uid === req.params.id) return body;  // находим по id нужный объект
    //             return el;
    //         });          
    //         newArr.push(body);
    //       fs.writeFileSync(`${dbUsersPath}//all-users.json`, JSON.stringify({users: newArr}));  // записываем на сервере нужные изменения
    //       //fs.writeFileSync - создает жсон файл в папке юзерс
    //     }
    //              console.log('save is yes'); 
    //     res.send ({status: "success"});
    // });
    //// (конец)

//====================== метод del ================
// app.delete('/users/:id', function (req,res){   // меняем объект на сервере через пут

//     const dbUsersPath = path.join(__dirname, '/db/users'); 
//     const usersData = JSON.parse(fs.readFileSync (`${dbUsersPath}/all-users.json`, 'utf8' ));
//     // 'utf8' - без него не будет работать если на кирилице
//     if(req.params.id){  // проверка чтобы пустая строка или объект не пришел
//         // перебераем объекты// убираем по id пользователя
//         const newArr = [...usersData.users].filter(el => el.uid !== req.params.id);          
//       fs.writeFileSync(`${dbUsersPath}//all-users.json`, JSON.stringify({users: newArr}));  // записываем на сервере нужные изменения
//       //fs.writeFileSync - создает жсон файл в папке юзерс
//     }
//              console.log('save is yes'); 
//     res.send ({status: "success"});

// });

    //// (конец)

//====================== метод del (конец)================
    app.listen(port, function (){
        console.log('Example' + port); 
    });
}

module.exports = startServer;

//====================== проверка по пут================

// fetch('http://localhost:3000/user',
//  { 
//     method: 'POST',
//     body: JSON.stringify(
//         { 
//             "uid": "313",
//              "userName": "JohnDoe",
//              "balance": 9999,
//              "password":"1234",
//              "email":"Ivan@gmail.com"
//          }
//     ),
//    headers: { 'content-type': 'application/json' }

// }).then( (response)=>{ response.text()
// .then( (data)=>{ console.log(data) } ) } )
// .catch((err)=>{console.log(err)})

//====================== проверка по пут================

//===== проверка по делиту

// fetch('http://localhost:3000/users/313?id=[313,314]&category=premium',
//  { 
//     method: 'DELETE',
//     headers: { 'content-type': 'application/json' }

// }).then( (response)=>{ response.text()
// .then( (data)=>{ console.log(data) } ) } )
// .catch((err)=>{console.log(err)})
// Promise {<pending>}
// VM7818:7 {"status":"success"}

//===== проверка по делиту



////===============================Лекция ==================

//     Express - это веб-фреймворк маршрутизации и промежуточной обработки с минимальной
//  собственной функциональностью: приложение Express, по сути, представляет собой
//   серию вызовов функций промежуточной обработки.
// Функции промежуточной обработки (middleware) - это функции, имеющие доступ к 
// объекту запроса (req), объекту ответа (res) и к следующей функции промежуточной 
// обработки в цикле “запрос-ответ” приложения. Следующая функция промежуточной 
// обработки, как правило, обозначается переменной next.

// body-parser -- Промежуточное программное обеспечение для синтаксического анализа тела Node.js 
// Анализируйте входящие тела запросов в промежуточном программном 
// обеспечении перед вашими обработчиками, доступными в свойстве req.body.
//Примечание. Поскольку форма req.body основана на вводе, контролируемом 
// пользователем, все свойства и значения в этом объекте не заслуживают 
// доверия и должны быть проверены перед доверием. Например, req.body.foo.toString () 
// может завершиться ошибкой несколькими способами, например, свойство foo может 
// отсутствовать или не может быть строкой, а toString может не быть функцией, 
// а может быть строкой или другим пользовательским вводом.