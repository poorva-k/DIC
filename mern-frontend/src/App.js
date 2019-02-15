import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductSellForm from "./components/create-todo.component";
import EditProduct from "./components/edit-todo.component";
import ProductBuyList from "./components/todos-list.component";
import CartComponent from "./components/cart.component";

import logo from "./logo.png";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://www.google.com" target="_blanck">
            <img src={logo} width="30" height="30" alt="google.com"/>
          </a>
          <Link to="/" className="navbar-brand">Block Chain Web App</Link>
          <div className="nav-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Buy</Link>
              </li>
              <li className="navbar-item">
                <Link to="/sell" className="nav-link">Sell</Link>
              </li>
              <li className="navbar-item">
                <Link to="/upload" className="nav-link">upload</Link>
              </li>
            </ul>
          </div>
          </nav>



          <Route path = "/" exact component={ProductBuyList}></Route>
          <Route path="/edit/:id" component = {EditProduct}></Route>
          <Route path="/sell" component = {ProductSellForm}></Route>
          <Route path="/upload" component = {CartComponent}></Route>
        </div>
        
      </Router>
    );
  }
}

export default App;
