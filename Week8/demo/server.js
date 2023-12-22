const http = require("http");
const fs = require("fs");

const comments = [];

let nextCommentId = 1;

const getNewCommentId = () => {
  const newCommentId = nextCommentId;
  nextCommentId++;
  return newCommentId;
};

const server = http.createServer((req, res) => {
  let reqBody = ""; //comment=hello+world%21&q=nasa
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((accum, [key, val]) => {
          accum[key] = val;
          return accum;
        }, {});
    }

    // GET ROUTES
    if (req.method === "GET" && req.url === "/") {
      const htmlPage = fs.readFileSync("index.html", "utf-8");

      let allComments = "";
      for (const comment of comments) {
        allComments += `<a id=${comment.id} href=/comments/${comment.id}>${comment.comment}</a>`;
      }

      const responseBody = htmlPage
        .replace(
          /#{comment}/,
          allComments ? allComments : "<p>No Comments Created</p>"
        )
        .replace(/#{comment-form}/, "");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(responseBody);
    }

    if (req.method === "GET" && req.url.startsWith("/comments")) {
      const urlParts = req.url.split("/");
      const commentId = urlParts[2];

      const comment = comments.find((comment) => comment.id === +commentId);

      let allComments = "";
      for (const comment of comments) {
        allComments += `<a id=${comment.id} href=/comments/${comment.id}>${comment.comment}</a>`;
      }

      if (comment) {
        const commentForm = `
            <form action="/comments/${comment.id}" method="post">
                <input name="comment" value="${comment.comment}">
                <button>Submit</button>
            </form>
            `;

        const htmlPage = fs.readFileSync("index.html", "utf-8");
        const responseBody = htmlPage
          .replace(
            /#{comment}/,
            allComments ? allComments : `<p>No Comment Created</p>`
          )
          .replace(/#{comment-form}/, commentForm);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(responseBody);
      }
    }

    if (req.method === "GET" && req.url === "/static/index.css") {
      const responseBody = fs.readFileSync("index.css", "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      return res.end(responseBody);
    }

    // POST ROUTES
    if (req.method === "POST" && req.url === "/comments") {
      const { comment } = req.body;
      console.log("comment ", comment);
      const newComment = {
        id: getNewCommentId(),
        comment,
      };
      comments.push(newComment);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    }

    if (req.method === "POST" && req.url.startsWith("/comments")) {
      const urlParts = req.url.split("/");
      console.log("url parts ", urlParts); // ['', 'comments', '1']
      const commentId = urlParts[2];

      const foundComment = comments.find(
        (comment) => comment.id === +commentId
      );

      if (foundComment) {
        const { comment } = req.body;

        foundComment.comment = comment;
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      } else {
        const responseBody = "No Comment Found";

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        return res.end(responseBody);
      }
    }
  });
});

const port = 5000;
server.listen(port, () => console.log(`server listening on port ${port}`));
