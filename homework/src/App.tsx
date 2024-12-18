
function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <input
        type="text"
        value={0}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      <p>Query: <strong> ... </strong></p>
    </div>
  );
}

export default App
