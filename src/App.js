import './App.css';
import Navbar from './components/Navbar/Navbar';
import MovieSection from './components/MovieSection/MovieSection';
import NewMovieSection from './components/NewMovieSection/NewMovieSection';
import Footer from './components/footer/Footer.js';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Movie from './components/movie/movie';
import CategoryList from './components/categoryList/CategoryList';


function App() {
  const API_KEY = 'api_key=62d3bcf838fc3fb80bb017733c574f54';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const popularMovie_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
  const populartv_URL = BASE_URL + "/tv/popular?" + API_KEY + "&language=en-US&page=1";
  const searchURL = BASE_URL + '/search/movie?' + API_KEY;
  const upcoming_Url = BASE_URL + "/movie/upcoming?" + API_KEY + "&language=en-US&page=1";

  const [MovieResults, setMovieResults] = useState([]);
  const [results, setResults] = useState([]);
  const [upcomingResults, setUpcoming] = useState([]);

  async function getMovies(url) {
    try {
      let data = null;
      while (data === null) {
        const res = await fetch(url);
        data = await res.json();
      }
      return data;

    } catch (error) {
      console.log(error)
      return error.response;
    }
  }

  const getAllMovies = async () => {
    const data = await getMovies(popularMovie_URL);
    setMovieResults(data.results);
  }
  const getAllShows = async () => {
    const data = await getMovies(populartv_URL);
    console.log(data);
    setResults(data.results);
  }
  const getAllUpcoming = async () => {
    const data = await getMovies(upcoming_Url);
    setUpcoming(data.results);
  }

  useEffect(() => {
    getAllShows();
    getAllMovies();
    getAllUpcoming();
  }, [])
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <>
              <NewMovieSection name='avenger' title='Avengers: Endgame' />
              <MovieSection sectionTitle='POPULAR FILMS' show={MovieResults} type='movie' />
              <MovieSection sectionTitle='POPULAR TV SHOWS' show={results} type='tv' />
              <MovieSection sectionTitle='UPCOMING FILMS' show={upcomingResults} type='movie' />
            </>
          } />
          <Route path=':id/:page' element={
            <CategoryList/>
          } />
          <Route path='movie/:id/*' element={
            <Movie type='movie' />
          } />
          <Route path='tv/:id/*' element={
            <Movie type='tv' />
          } />
        </Routes>
        <Footer></Footer>
      </Router>

    </>
  )
}

export default App;
