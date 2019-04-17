const url = require("url");
const path = require("path");
const fs = require("fs");

const getId = (path) =>{
 const lastId = path.lastIndexOf('/');
 if (lastIndex !=-1){
   const id = path.slice(lastIndex+1);
   console.log(id);
   return id !== 'cars' ? id : null ;
  }
}

const filterById = (id,arr) =>{
  return arr.find(el=>el.id ==id)
}

const getCars = (request, response) => {

  const parsedUrl = url.parse(request.url, true);
  const id = getId(parsedUrl.path);
  const filePath = path.join(__dirname, "../../", "db", "cars.json");
  const fileData = JSON.parse(fs.readFileSync(filePath));
  let filteredCars;

  response.writeHead(200, { "Content-Type": "application/json" });
  if (!id){
  response.write(JSON.stringify({ status: "success", cars: filteredCars }));
  } else {
    filteredCars = filterById (id, fileData.cars)
  }
  // console.log("filteredCars", filteredCars);
 
  response.end();
};

module.exports = getCars;
