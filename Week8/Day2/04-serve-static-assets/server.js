const http = require("http");
const fs = require("fs");

const getContentType = (ext) => {
  //html || css || jpg

  // if (ext === "css") return "text/css";
  // else if (ext === "jpg" || ext === "jpeg") return "image/jpg";
  // else return "text/html";

  switch(ext){
    case 'css':
      return "text/css"
    case 'jpg':
      return "image/jpg"
    case 'jpeg':
      return "image/jpg"
    case 'html':
      return "text/html"
    default:
      return 'text/plain'
  }
};

const server = http.createServer((req, res) => {
  // Your code here
  // BONUS: combine route handler for images and css into one route handler
  if (req.method === "GET" && req.url.startsWith("/static")) {
    const urlParts = req.url.split("/static");
    console.log("url parts ", urlParts);
    const assetPath = urlParts[1];
    console.log("asset path ", assetPath);

    const responseBody = fs.readFileSync(`./assets${assetPath}`);
    // -> assets/css/application.css || assets/images/dog.jpg

    const ext = assetPath.split(".")[1];
    const contentType = getContentType(ext);

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    return res.end(responseBody);
  }

  // route handler for images
  // if (req.method === "GET" && req.url === "/static/images/dog.jpg") {
  //   const responseBody = fs.readFileSync("./assets/images/dog.jpg");

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "image/jpg");
  //   return res.end(responseBody);
  // }
  // // route handler for css
  // if (req.method === "GET" && req.url === "/static/css/application.css") {
  //   const responseBody = fs.readFileSync("./assets/css/application.css", "utf-8");

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/css");
  //   return res.end(responseBody);
  // }
  // route handler for home page (GET && '/')
  if (req.method === "GET" && req.url === "/") {
    // get response body (fs.readFileSync(path to html file, utf-8))
    const responseBody = fs.readFileSync("index.html", "utf-8");
    // set status code
    res.statusCode = 200;
    // set header
    res.setHeader("Content-Type", "text/html");
    // return response body
    return res.end(responseBody);
  }
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
