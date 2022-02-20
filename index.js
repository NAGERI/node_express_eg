const express = require('express'),
     http = require('http'),
     morgan = require('morgan'),
     bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter')
const hostname = 'localhost';
const port = 3000;

const app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

/* Mount point for the mini-app*/
app.use('/dishes',dishRouter);

/*TODO Create a mini-app for the below resources*/
app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
