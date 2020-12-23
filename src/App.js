import logo from './logo.svg';
import './App.css';
import {AboutMe} from './homework4/about-me.js'
import Myname from './homework4/name.js'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Myname/>
        <AboutMe 
          age={19} 
          sport="football"
          club="Barcelona"
        />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; 