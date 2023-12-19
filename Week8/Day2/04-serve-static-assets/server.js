const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  // BONUS: combine route handler for images and css into one route handler


  // route handler for images

  // route handler for css

  // route handler for home page (GET && '/')
  // get response body (fs.readFileSync(path to html file, utf-8))

  // set status code

  // set header

  // return response body
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));