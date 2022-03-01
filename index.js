const express = require('express'),
     http = require('http'),
     morgan = require('morgan'),
     bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leadersRouter');
const hostname = 'localhost';
const port = 3000;

const app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

/* Mount point for the mini-app*/
app.use('/dishes',dishRouter);
app.use('/leaders',leaderRouter);

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);

                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
