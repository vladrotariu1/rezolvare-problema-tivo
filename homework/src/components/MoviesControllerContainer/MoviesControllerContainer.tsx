import { MovieDto } from '../../models/MovieDto.ts';
import {useMemo, useState} from 'react';
import './MoviesControllerContainer.css';
import MoviesPerDecade from '../MoviesPerDecade/MoviesPerDecade.tsx';

function groupMoviesByDecade(movies: MovieDto[]): Record<string, MovieDto[]> {
  // Parse years from the movies and deduplicate decades
  const decades = [...new Set(movies.map(movie => Math.floor(Number(movie.Year) / 10) * 10))]
    .sort((a, b) => b - a) // Sort decades in descending order
    .slice(0, 4); // Take the most recent 4 decades

  // Group movies by decade
  const groupedMovies: Record<string, MovieDto[]> = {};
  for (const decade of decades) {
    groupedMovies[`${decade}s`] = movies.filter(
      movie => Math.floor(Number(movie.Year) / 10) * 10 === decade
    );
  }

  return groupedMovies;
}

interface MoviesProps {
  movies: MovieDto[]
}

function MoviesControllerContainer({ movies }: MoviesProps) {
  const moviesPerDecades = useMemo(() => groupMoviesByDecade(movies), [movies]);
  const displayedDecades = Object.keys(moviesPerDecades);
  const [selectedDecade, setSelectedDecade] = useState(displayedDecades[0]);

  return (
    <div>
      <div className="decade-bar">
        {displayedDecades.map((decade) => (
          <button
            key={decade}
            className={`decade-item ${selectedDecade === decade ? "active" : ""}`}
            onClick={() => setSelectedDecade(decade)}
          >
            {decade}
          </button>
        ))}
      </div>
      <div>
        {
          displayedDecades.map(
            decade =>
              <div
                key={decade}
                style={{
                  display: selectedDecade === decade ? 'block' : 'none'
              }}>
                <MoviesPerDecade key={decade} movies={moviesPerDecades[decade]} />
              </div>
          )
        }
      </div>
    </div>
  );
}

export default MoviesControllerContainer;