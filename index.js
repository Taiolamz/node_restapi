const express = require("express");

const app = express();
const port = 3000;

// parse JSON using express 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
  {
    id: "1",
    title: "Passion of the Christ",
    director: "Mel Gibson",
    release_date: "2004-02-25",
  },
  {
    id: "2",
    title: "The Train",
    director: "Mike Bamiloye",
    release_date: "2020-05-03",
  },
];

// get movies in the list
app.get("/movie", (req, res) => {
  res.json(movies);
});

// add a movie to the list
app.post("/movie", (req, res) => {
  const movie = req.body;

  console.log(movie);
  movies.push(movie);
  res.send("Movie added to the list");
});

//search for a movie in the list(by its id)
app.get("/movie/:id", (req, res) => {
  const id = req.params.id;

  for (let movie of movies) {
    if (movie.id === id) {
      res.json(movie);
      return;
    }
  }
  res.status(404).send("Movie not found");
});

// delete movie from the list
app.delete("/movie/:id", (req, res) => {
  const id = req.params.id;

 movies = movies.filter((movie) => {
    if (movie !== id) {
      return false;
    }
    return true;
  });

  res.send("Movie is deleted");
});

// The server is set to listen at port
app.listen(port, () => console.log(`Server listening at port ${port}`));
