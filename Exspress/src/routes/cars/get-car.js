const url = require("url");
const path = require("path");
const fs = require("fs");





const getCars = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const id = getId(parsedUrl.path);
  const filePath = path.join(__dirname, "../../", "db", "cars.json");
  const fileData = JSON.parse(fs.readFileSync(filePath));
  let filteredCars;



  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ status: "success", cars: filteredCars }));
  


 
  // console.log("filteredCars", filteredCars);

  
  response.end();
};

module.exports = getCars;
