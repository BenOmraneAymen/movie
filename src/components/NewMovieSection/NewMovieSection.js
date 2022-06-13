import css from './NewMovieSection.module.css'
import React, { useEffect, useState } from 'react';

export default function NewMovieSection() {


    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const [results, setResults] = useState([]);

    async function getMovies(url) {
        try {
            const res = await fetch(url)
            const data = await res.json();
            return data

        } catch (error) {
            console.log(error)
            return error.response;
        }
    }

    const getAllMovies = async () => {
        const data = await getMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=62d3bcf838fc3fb80bb017733c574f54");
        setResults(data.results)
    }
    useEffect(() => {
        getAllMovies();
    }, [])

    const [number, setnumber] = useState(1);
    const [animation, setAnimation] = useState("section")
    useEffect(() => {
        setTimeout(() => {
            setAnimation("section");
        }, 3750);
        setTimeout(() => {
            setAnimation("sectionAnimationfade");
            setnumber((number + 1) % 5);
        }, 3000);
    }, [number])




    return (
        <div className={css["wrapper"]}>
            <div className={css[`${animation}`]}>
                <div className={css["descriptionSection"]} >
                    <h1 className={css["title"]} >{results[number]?.title}</h1>
                    <div className={css["synopsis"]}>{results[number]?.overview}</div>
                </div>
                <img className={css["poster"]} src={IMG_URL + results[number]?.backdrop_path} alt={results.backdrop_path}></img>
            </div>
        </div>
    );

}