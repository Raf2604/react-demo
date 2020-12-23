import './App.css';
import {AboutMe} from './homework4/about-me.js';
import Myname from './homework4/name.js';
import Product from './homework6/Product.jsx';



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
        <div>
            Product 1: <Product
                name="Pineapple "
                price="3$"
                description=" These pineapples are very tasty. They are from Paraguay!!!"
            />
        </div>

        <div>
            Product 2: <Product
                name="Mango "
                price="5$"
                description=" Mango is one of the most delicious tropical fruits!!!"
            />
        </div>


      </header>
    </div>
  );
}

export default App; 