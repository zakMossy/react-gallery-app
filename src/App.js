import React, { Component } from 'react';
import './css/index.css';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import apiKey from './config.js';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';                                   // imports the app components
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      images: [],
      sunrise: [],
      plants: [],
      architecture: [],
      loading: true
    };
  }                                                                             // creates the class and gives it a default state
  componentDidMount() {
    this.performSearch("");
    this.performSearch("sunrise");
    this.performSearch("plants");
    this.performSearch("architecture");
  }                                                                             // gives requests for data when the page is loaded
  performSearch = (query = 'sunrise') => {
    this.setState({ loading: true });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
          if (query === "sunrise") {
                this.setState({ sunrise: response.data.photos.photo, loading: false});
          } else if (query === "plants") {
                this.setState({ plants: response.data.photos.photo, loading: false});
          } else if (query === "architecture") {
                this.setState({ architecture: response.data.photos.photo, loading: false});
          } else {
                this.setState({
                  images: response.data.photos.photo,
                  searchTerm: query,
                  loading: false
                });
          }
      })
      .catch(error => {console.log("Error getting data", error)});
  }                                                                             // fetches all the data
render () {
    return (
      <BrowserRouter basename="/Project-7">
        <div className="container">
          <h2 className="main-title">Image Search</h2>
          <Header />
            {
                (this.state.loading)
                ? <p>Loading...</p>
                :
            <Switch>
              <Route exact path="/" render={props => <Home {...props} onSearch={this.performSearch} />} />
              <Route path="/search/:topic" render={ () => <Gallery title={this.state.searchTerm} data={this.state.images} />} />
              <Route exact path="/sunrise" render={ () => <Gallery title="Sunrise" data={this.state.sunrise} /> } />
              <Route exact path="/plants" render={ () => <Gallery title="Plants" data={this.state.plants} /> } />
              <Route exact path="/architecture" render={ () => <Gallery title="Architecture" data={this.state.architecture} /> } />
              <Route component={NotFound} />
            </Switch>
            }
        </div>
      </BrowserRouter>
    );
  }
}                                                                               // adds browser router and its routes
