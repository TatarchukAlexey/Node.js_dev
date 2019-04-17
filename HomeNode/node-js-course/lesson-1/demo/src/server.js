const http = require('http');
const url = require('url');

const morgan = require('morgan');
const router = require('./routes/router');

const logger = morgan('combined');

const startServer = port => {

  const server = http.createServer((request, response) => {

    // Get route from the request
    const parsedUrl = url.parse(request.url);
    //метод парс принимает урл

    // Get router function
    const func = router[parsedUrl.pathname] || router.default;
    
    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};

module.exports = startServer;
