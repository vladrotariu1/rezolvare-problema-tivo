import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {OmdbGetResponse} from './models/OmdbGetResponse.ts';
import {OmdbResponseError} from './exceptions/OmdbResponseError.ts';
import {MovieDto} from './models/MovieDto.ts';
import MoviesControllerContainer from './components/MoviesControllerContainer/MoviesControllerContainer.tsx';

const omdbApiKey: string = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movieNameQuery, setMovieNameQuery] = useState('');
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [error, setError] = useState('');

  const getFromApi = useCallback(async (apiUrl: string) => {
    const response = await fetch(apiUrl);
    const data: OmdbGetResponse = await response.json();

    if (data.Response === "False") {
      const errorMessage = data.Error || 'Movie could not be found';
      throw new OmdbResponseError(errorMessage);
    }

    return data.Search;
  }, []);

  useEffect(() => {
    if (!movieNameQuery) {
      return
    }

    (async function () {
      const omdbApiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}&s=${movieNameQuery}`

      try {
        const movies = await getFromApi(omdbApiUrl);
        setMovies(movies as MovieDto[]);
        setError('');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          throw error;
        }
      }
    })();

  }, [getFromApi, movieNameQuery]);

  const handleOnMovieNameQueryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieNameQuery(e.target.value);
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <input
        onChange= { handleOnMovieNameQueryInput }
        type="text"
        value={movieNameQuery}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      {
        movieNameQuery && <p>Query: <strong> {movieNameQuery} </strong></p>
      }
      {
        error && <p><strong>{error}</strong></p>
      }
      {
        movies && !error && movieNameQuery && <MoviesControllerContainer movies={movies} />
      }
    </div>
  );
}

export default App
