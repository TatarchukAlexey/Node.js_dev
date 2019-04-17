фетч для отправки объекта для проверки нашего кода по node


fetch('http://localhost:3000/user',
 { 
    method: 'POST',
    body: JSON.stringify(
        { 
            "uid": "313",
             "userName": "JohnDoe",
             "balance": 9999,
             "password":"1234",
             "email":"Ivan@gmail.com"
         }
    ),
   headers: { 'content-type': 'application/json' }

}).then( (response)=>{ response.text()
.then( (data)=>{ document.body.append(data) } ) } )
.catch((err)=>{console.log(err)})

fetch('http://localhost:3000/user',
 { 
    method: 'POST',
    body: JSON.stringify(
        { 
            "uid": "313",
             "userName": "JohnDoe",
             "balance": 9999,
             "password":"1234",
             "email":"Ivan@gmail.com"
         }
    ),
   headers: { 'content-type': 'application/json' }

}).then( (response)=>{ response.text()
.then( (data)=>{ console.log(data) } ) } )
.catch((err)=>{console.log(err)})