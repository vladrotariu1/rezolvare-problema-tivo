import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {OmdbGetResponse} from './models/OmdbGetResponse.ts';

const omdbApiKey: string = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movieNameQuery, setMovieNameQuery] = useState('');

  const getFromApi = useCallback(async (apiUrl: string) => {
    const response = await fetch(apiUrl);
    const data: OmdbGetResponse = await response.json();

    console.log(data);
  }, []);

  useEffect(() => {
    if (!movieNameQuery) {
      return
    }
    const omdbApiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}&s=${movieNameQuery}`
    getFromApi(omdbApiUrl);

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
    </div>
  );
}

export default App
