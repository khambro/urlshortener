import './App.css';
import  Urlshortener from './components/Urlshortener/Urlshortener'

function App() {

  return (
    <div className="App">
      <div className="URLform">
        <h1 className="shorten">Shorten your URL!</h1>
        <Urlshortener />
      </div>

    </div>
  );
}

export default App;
