import {ChangeEvent, useState} from 'react';

function App() {
  const [movieNameQuery, setMovieNameQuery] = useState('');

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
