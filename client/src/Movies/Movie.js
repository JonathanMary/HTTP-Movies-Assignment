import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const editMovie = (e) => {
    e.preventDefault();
    history.push(`/update-movie/${params.id}`)
  }
  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
         .then(res => {
          let movieListCopy = [...movieList];
          movieListCopy.splice(params.id, 1);
          setMovieList(movieListCopy);
          history.push(`/`);
         })
         .catch(err => console.log({ err }))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button onClick={editMovie}>
        Edit
      </button>
      <button onClick={deleteMovie}>
        Delete
      </button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
