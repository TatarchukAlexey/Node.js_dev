const path = require ('path');
const fs = require ('fs');

const getCars = (request,response) => {


    if (request.method === 'GET') {
      const filePath = path.join(__dirname, 'db', 'cars.json');  // __dirname глобальная переменная, пакуем все с папок для отправки

      response.writeHead(200, {
        'Content-Type': 'application/json',
      });

      const file = JSON.parse(fs.readFileSync(filePath, 'utf8'));  // fs. это файл систем
      console.log(file.cars);
      response.write(JSON.stringify({ status: 'success', cars: file.cars }));
      response.end();
    } 
}
 
module.exports = getCars;