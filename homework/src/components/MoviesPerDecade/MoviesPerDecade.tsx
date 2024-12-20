import {MovieDto} from '../../models/MovieDto.ts';
import MoviePoster from '../MoviePoster/MoviePoster.tsx';
import {useState} from 'react';
import './MoviesPerDecade.css';

const DEFAULT_GRID_COLUMNS = 3;

interface MoviesPerDecadeProps {
  movies: MovieDto[]
}

function MoviesPerDecade({ movies }: MoviesPerDecadeProps) {
  const [numberOfLoads, setNumberOfLoads] = useState(1);

  const handleOnLoadMoreButtonClick = () => {
    setNumberOfLoads((prevState) => prevState + 1);
  }

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${DEFAULT_GRID_COLUMNS}, 1fr)`
      }}>
        {
          movies
          .slice(0, numberOfLoads * DEFAULT_GRID_COLUMNS)
          .map(movie => <MoviePoster key={movie.imdbID} movie={movie}/>)
        }
      </div>
      { numberOfLoads * DEFAULT_GRID_COLUMNS < movies.length && <button onClick={handleOnLoadMoreButtonClick} className="load-more-btn">Load More</button> }
    </div>
  );
}

export default MoviesPerDecade;