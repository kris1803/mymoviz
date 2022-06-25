var express = require('express');
var router = express.Router();
let axios = require('axios');
let Movie = require('../models/movies');

const TMDB_API_KEY = process.env.TMDB_API_KEY || '';

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ title: 'Express' });
});

// route pour affichage de la reponse api tmdb
router.get('/new-movies', async (req, res) => {
  try {
    let response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=fr-FR&region=CA&include_image_language=fr,null&sort_by=popularity.desc`);
    response = JSON.parse((response.body));
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: JSON.stringify(error) });
  }
})

router.post('/wishlist-movie', async (req, res) => {
  try {
    let movie = req.body;
    let newMovie = new Movie({
      movieName: movie.movieName,
      movieImg: movie.movieImg,
    });
    // save new movie to database
    let savedMovie = await newMovie.save();
    res.status(200).json({ savedMovie });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: JSON.stringify(error) });
  }
});
router.delete('/wishlist-movie/:name', async (req, res) => {
  let movie = req.params.name;
  let deletedMovie = await Movie.deleteOne({ movieName: movie });
  console.log(deletedMovie);
  let success = deletedMovie.acknowledged
  let deleted = deletedMovie.deletedCount
  res.status(200).send({ success, deleted })
});
router.get('/wishlist-movie', async (req, res, next) => {
  let movies = await Movie.find();
  res.status(200).json(movies)
});

module.exports = router;
