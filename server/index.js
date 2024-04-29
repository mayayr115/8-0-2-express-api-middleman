const express = require('express');
const path = require('path');
const fetchData = require('./utils/fetchData');

const pathToDistFolder = path.join(__dirname, '..', 'frontend', 'dist');

const app = express();

/////////////////////
// Controllers
/////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  // MIDDLEWARE ALERT
  next();
};

const serveStatic = express.static(pathToDistFolder);

////////////////////////
// Routes
////////////////////////

app.use(logRoutes);
app.use(serveStatic);


const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});


require('dotenv').config();

// we can access the value using process.env

console.log(process.env.API_KEY); // qJzHPHbaUR9MD0fJK6wgH07tL7EpZ9Ed

// and then make a controller

const serveGifs = async (req, res, send) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
  try {
    const [data, error] = await fetchData(API_URL);
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(404);
  }
}

// and route it to an endpoint

app.get('/api/gifs', serveGifs)