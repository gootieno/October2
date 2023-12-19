const http = require("http");
const fs = require("fs");

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = ""; // affiliate=nasa&query=mars+rover%21&commit=Search
  req.on("data", (data) => {
    // affiliate=nasa&query=mars+rover%21&commit=Search
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      // affiliate=nasa&query=mars+rover%21&commit=Search
      req.body = reqBody
        .split("&") // [affiliate=nasa,query=mars+rover%21,commit=Search]
        .map((keyValuePair) => keyValuePair.split("=")) // [[affiliate,nasa],[query,mars+rover%21],[commit,Search]]
        .map(([key, value]) => [key, value.replace(/\+/g, " ")]) // [[affiliate,nasa],[query,mars rover%21],[commit,Search]]
        .map(([key, value]) => [key, decodeURIComponent(value)]) // [[affiliate,nasa],[query,mars rover!],[commit,Search]]
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}); /*
            {
              affiliate:nasa,
              query:mars rover!,
              commit:Search
            }
        */
      console.log(req.body);
    }
    // Do not edit above this line
    if (req.method === "GET" && req.url === "/home") {
      const responseBody = fs.readFileSync("index.html", "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url === "/banana/index.css") {
      const responseBody = fs.readFileSync("./styles/index.css", "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      return res.end(responseBody);
    }

    // define route handlers here
    if (req.method === "GET" && req.url === "/") {
      const responseBody = "Dog Club";
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(responseBody);
    }

    // /dogs/:dogId , /dogs/:dogId/comments
    if (req.method === "GET" && req.url === "/dogs") {
      const responseBody = "Dog Index";
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url.startsWith("/dogs")) {
      console.log("req url ", req.url);
      const urlParts = req.url.split("/");
      console.log("url parts ", urlParts);
      const dogId = urlParts[2];

      const responseBody = `Dog details for dogId: ${dogId}`;
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(responseBody);
    }

    if (req.method === "POST" && req.url === "/dogs") {
      const dogId = getNewDogId();
      res.statusCode = 302;
      res.setHeader("Location", `/dogs/${dogId}`); // /dogs/:dogId
      return res.end();
    }
    // Do not edit below this line
    // Return a 404 response when there is no matching route handler
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    return res.end("No matching route handler found for this endpoint");
  });
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
