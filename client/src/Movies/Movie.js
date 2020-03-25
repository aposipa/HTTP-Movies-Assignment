import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';
import reloadPage from '../utils/ReloadPage';

const Movie = props => {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res)
      props.setMovieList(res.data)
      props.history.push('/')
      reloadPage();
    })
    .catch(err => console.log(err))
  }

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <button onClick={deleteMovie}>Delete this Movie...</button>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
