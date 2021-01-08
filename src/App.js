import React from "react";
import './App.css';
import {AboutMe} from './homework4/about-me.js';
import Myname from './homework4/name.js';
import Products from './homework6/Products.jsx';
import Fruit from './homework7/Fruit.jsx';
import ToDo from './components/ToDo.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Homework 4</h1>
          <Myname/>
          <AboutMe 
              age={19} 
              sport="football"
              club="Barcelona"
          />
        </div>

        <div>
          <h1>Homework 6</h1>
          <div>
              Product 1: <Products
                  name="Pineapple "
                  price="3$"
                  description=" These pineapples are very tasty. They are from Paraguay!!!"
              />
          </div>
          <div>
              Product 2: <Products
                  name="Mango "
                  price="5$"
                  description=" Mango is one of the most delicious tropical fruits!!!"
              />
          </div>
        </div>

        <div>
          <h1>Homework 7</h1>
          <div>
            <Fruit
                fruitName="Apricot։ "
                fruitPrice="1.5$"
                fruitDescription="The price of armenian fresh apricot is "
            />
            <Fruit
                fruitName="Orange։ "
                fruitPrice="2$"
                fruitDescription="The market price of oranges is "
            />
        </div>
        </div>

        <div>
          <h1>ToDo List</h1>
          <ToDo/>
        </div>
      </header>
    </div>
  );
}

export default App; 