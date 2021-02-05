import React from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import  Urlshortener from './components/Urlshortener/Urlshortener';

function App() {

  return (
    <Router>
    <div className="App">
      <div className="URLform">
        <Route exact path="/" component={Urlshortener} />
      </div>
    </div>
    </Router>
  );
}

export default App;
