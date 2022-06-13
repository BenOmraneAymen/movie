import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './movie.module.css';
import MovieSection from '../MovieSection/MovieSection';
import StaffSection from '../StaffSection/staffSection';
import { Routes, Route } from 'react-router-dom';
import StaffPage from '../StaffPage/StaffPage';

function Movie(props) {
    const { id } = useParams()
    const [movie, setMovieResult] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState([]);
    const [actors, setActors] = useState([]);
    const [crew, setCrew] = useState([]);


    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const API_KEY = 'api_key=62d3bcf838fc3fb80bb017733c574f54';
    const movie_url = 'https://api.themoviedb.org/3/movie/' + id + '?' + API_KEY + '&language=en-US'
    const show_url = 'https://api.themoviedb.org/3/tv/' + id + '?' + API_KEY + '&language=en-US'
    const similarMovie_url = 'https://api.themoviedb.org/3/movie/' + id + '/similar?' + API_KEY + '&language=en-US&page=1'
    const similarTv_url = 'https://api.themoviedb.org/3/tv/' + id + '/similar?' + API_KEY + '&language=en-US&page=1'
    const movieActor_url = 'https://api.themoviedb.org/3/movie/' + id + '/credits?' + API_KEY + '&language=en-US'
    const tvActor_url = 'https://api.themoviedb.org/3/tv/' + id + '/credits?' + API_KEY + '&language=en-US'

    async function getFromApi(url) {
        try {
            let data = null;
            let res = null;
            while (data === null) {
                res = await fetch(url);
                data = await res.json();
            }
            return data;

        } catch (error) {
            return error.response;
        }
    }

    const getMovieTrailer = async () => {
        const data = await getFromApi(BASE_URL + '/movie/' + id + '/videos?' + API_KEY);
        setMovieTrailer(data);
    }
    const getMovieDetail = async () => {
        let data = ''
        if (props.type == 'movie') {
            data = await getFromApi(movie_url);
        }
        if (props.type == 'tv') {
            data = await getFromApi(show_url);
        }
        setMovieResult(data);
    }
    const getSimilar = async () => {
        let data = ''
        if (props.type == 'movie') {
            data = await getFromApi(similarMovie_url);
        }
        if (props.type == 'tv') {
            data = await getFromApi(similarTv_url);
        }
        setSimilar(Array.from(data.results));
    }
    const getActors = async () => {
        let data = ''
        if (props.type == 'movie') {
            data = await getFromApi(movieActor_url);
        }
        if (props.type == 'tv') {
            data = await getFromApi(tvActor_url);
        }
        setActors(data.cast);
    }

    const getCrew = async () => {
        let data = ''
        if (props.type == 'movie') {
            data = await getFromApi(movieActor_url);
        }
        if (props.type == 'tv') {
            data = await getFromApi(tvActor_url);
        }
        setCrew(data.crew);
    }

    useEffect(() => {
        getActors();
        getMovieDetail();
        getMovieTrailer();
        getSimilar();

    }, [id])


    let date = movie?.release_date?.slice(0, 4) || movie?.first_air_date?.slice(0, 4);



    return (
        <>
            <Routes>
                <Route path='/' element={
                    <>
                        <div className={css['wrapper']} >
                            <div className={css['description']}>
                                <img src={IMG_URL + movie?.poster_path} className={css['poster']} />
                                <div className={css['movie_description']}>
                                    <h1 className={css['title']}>{movie?.title || movie?.name}<span className={css['title_date']}>({date})</span></h1>
                                    <div>
                                        <span className={css['date']}>{movie?.release_date || movie?.first_air_date}</span>
                                        {movie.genres?.map((genre) => {
                                            return <span className={css['genre']}>{genre.name}</span>
                                        })}
                                    </div>
                                    <div className={css['buttons']}>
                                        <div className={css['rating']}>{movie?.vote_average * 10}%</div>
                                        <div className={css['button']}><i class="fi fi-ss-star" style={{ aspectRatio: '1 / 1' }}></i></div>
                                        <div className={css['button']}><i class="fi fi-sr-heart" style={{ aspectRatio: '1 / 1' }}></i></div>
                                        <div className={css['button']}><i class="fi fi-ss-bookmark" style={{ aspectRatio: '1 / 1' }}></i></div>
                                        <div className={css['button']}><i class="fi fi-br-list" style={{ aspectRatio: '1 / 1' }}></i></div>
                                    </div>
                                    <h3 className={css['tagline']}>{movie?.tagline}</h3>
                                    <h2 className={css['sub_title']}>Overview</h2>
                                    <div className={css['overview']}>{movie?.overview}</div>
                                </div>
                            </div>
                            <img src={IMG_URL + movie?.backdrop_path} className={css['backdrop']} />
                        </div>
                        <StaffSection sectionTitle="Actors" list={actors} />
                        <MovieSection sectionTitle={props.type == 'movie' ? 'Similar Movies' : 'Similar Tv Shows'} show={similar} type={props.type} /></>
                } />
                <Route path="/Actors" element={
                    <StaffPage staff={actors} />
                } />
                <Route path="/crew" element={
                    <StaffPage staff={crew} />
                } />
            </Routes>
        </>
    )
}

export default Movie;
