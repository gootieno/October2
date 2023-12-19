const http = require("http");

const server = http.createServer((req, res) => {
  // response body
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

  // status code

  // send the response
  res.end(responseBody);
});
