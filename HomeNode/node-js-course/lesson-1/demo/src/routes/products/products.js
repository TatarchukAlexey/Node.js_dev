const path = require ('path');
const fs = require ('fs');

const getCars = (request,response) => {


    if (request.method === 'GET') {
      const srs = path.join(__dirname,'../../' ,'db', 'all-products.json');  // пакуем все с папок для отправки

      response.writeHead(200, {
        'Content-Type': 'application/json',
      });

      const file = JSON.parse(fs.readFileSync(srs, 'utf8'));  // fs. это файл систем, 
      console.log(file.products);
      response.write(JSON.stringify({ status: 'success', products: file.products })); ///берем ключ в файле json
      response.end();
    } 
}
 
module.exports = getCars;