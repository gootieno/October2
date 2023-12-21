const http = require('http');

const dogs = [
  {
    dogId: 1,
    name: "Fluffy",
    age: 2
  }
];

let nextDogId = 2;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // request is finished assembly the entire request body
    // Parsing the body of the request depending on the Content-Type header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ======================== ROUTE HANDLERS ======================== */

    // GET /dogs
    if (req.method === 'GET' && req.url === '/dogs') {
      // Your code here
      const body = JSON.stringify(dogs);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(body);
    }

    // GET /dogs/:dogId
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/'); // ['', 'dogs', '1']
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        const dog = dogs.find(dog => dog.dogId == dogId)
        res.statusCode = 200;
        res.setHeader("Content-Type", 'application/json');
        return res.end(JSON.stringify(dog));
      }
      return res.end();
    }

    // POST /dogs
    if (req.method === 'POST' && req.url === '/dogs') {
      const { name, age } = req.body;
      // Your code here
      const newDog = {
        dogId: getNewDogId(),
        name: name,
        age: age
      }
      dogs.push(newDog);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(newDog));
    }

    // PUT or PATCH /dogs/:dogId
    if ((req.method === 'PUT' || req.method === 'PATCH')  && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        // Your code here
         // Find the particular dog you need, save it into variable for manipulation
         let foundDog = dogs.find((dog) => dog.dogId == dogId);
         // If foundDog is not empty (found the dog)
         if (foundDog) {
          // Set the name and age variables to what is found in the request body
           const { name, age } = req.body;
           // foundDog.name will be the new name if it isn't empty or stay the previous name
           if (name) foundDog.name = name;
           foundDog.name = name || foundDog.name;
           // Same as above but for age
           if (age) foundDog.age = age;
           foundDog.age = age || foundDog.age;
           // Generate response
           const body = JSON.stringify(foundDog);
           res.statusCode = 200;
           res.setHeader("Content-Type", "application/json");
           return res.end(body);
      }
      return res.end();
    }
    }

    // DELETE /dogs/:dogId
    if (req.method === 'DELETE' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];

        let index = dogs.findIndex((dog) => dog.dogId === Number(dogId));
        dogs.splice(index, 1);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ message: "Successfully deleted" }));
        return res.end();
      }
      return res.end();
    }

    // No matching endpoint
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end('Endpoint not found');
  });

});


if (require.main === module) {
    const port = 8000;
    server.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = server;
}
