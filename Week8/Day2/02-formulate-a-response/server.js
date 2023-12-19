const http = require("http");

const server = http.createServer((req, res) => {
  // response body
  //   console.log("request object ", req);
  if (req.method === "GET" && req.url === "/") {
    const responseBody = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello World!</title>
          </head>
          <body>
          <h1>Hello there!</h1>
          </body>
          </html>
          `;

    // response headers
    res.setHeader('Content-Type', 'text/html')
    // status code
    res.statusCode = 200;
    // send the response
    return res.end(responseBody);
  }

  res.statusCode =  404;
  res.setHeader('Content-Type', 'text/plain')
  res.end('Page Not Found!')
});

const port = 5000;
server.listen(port, () => console.log(`server listening on port ${port}`));
