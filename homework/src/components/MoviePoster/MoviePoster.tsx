import {MovieDto} from '../../models/MovieDto.ts';
import './MoviePoster.css';

interface MoviePosterProps {
  movie: MovieDto
}

function MoviePoster({movie}: MoviePosterProps) {
  return (
    <div className="movie-poster-container">
      <div className="movie-poster-image-container">
        <img className="movie-poster-image" src={movie.Poster} alt={movie.Title}/>
      </div>
      <div className="movie-poster-metadata-container">
        <p>{movie.Title}</p>
        <strong><p>{movie.Year}</p></strong>
      </div>
    </div>
  );
}

export default MoviePoster;