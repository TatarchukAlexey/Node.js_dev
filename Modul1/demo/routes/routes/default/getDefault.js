const getDefault = (response) =>{
    if(parsedUrl.pathname === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});   // обрабатываем ответ
        response.write("<h1>Module 1</h1>");  // тело ответа
        response.end();  // отправляем ответ, отправка
      }
}

module.exports =  getDefault;