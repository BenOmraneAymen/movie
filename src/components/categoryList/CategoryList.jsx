import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import css from "./CategoryList.module.css";
import arrow from "../../images/arrow.png";

export default function CategoryList() {
  let { id, page } = useParams();
  console.log(id);
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  async function getMoviesByGenre(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getMovies() {
    const data = await getMoviesByGenre(
      `https://api.themoviedb.org/3/discover/movie?api_key=62d3bcf838fc3fb80bb017733c574f54&language=en-US&sort_by=release_date.desc&page=${page}&with_genres=${id}`
    );
    let results = data.results.filter((movie) => movie.poster_path !== null && movie.backdrop_path !== null);
    setMovies(data.results);
    setPageCount(data.total_pages);
  }

  useEffect(() => {
    getMovies();
  }, [id, page]);

  return (
    <div className={css["page"]}>
      <div className={css["grid"]}>
        {movies.map((movie) => {
          const { name, title, vote_average, poster_path, id } = movie;
          let path = "/movie/" + id;
          return (
            <Link to={path} style={{ textDecoration: "none", color: "black" }}>
              <MovieCard
                key={id}
                image={IMG_URL + poster_path}
                Name={title || name}
                rating={vote_average.toFixed(1)}
              />
            </Link>
          );
        })}
      </div>
      <div className={css["pagePicker"]}>
        <Link
          to={`/${id}/1`}
          style={{ color: "black", margin: "5px" }}
          className={css["pagePicker__link"]}
        >
          <img
            src={arrow}
            alt=""
            style={{ width: "10px", transform: "rotate(180deg)" }}
          />
        </Link>
        {[...Array(pageCount)].slice(0, 7).map((e, i) => {
          console.log("loop", parseInt(page) + i + 1);
          return (
            <Link
              to={`/${id}/${parseInt(page) + i + 1}`}
              style={{ textDecoration: "none", color: "black", margin: "5px" }}
              className={css["pagePicker__link"]}
              onClick={() => {
                getMovies();
              }}
            >
              {parseInt(page) + i + 1}
            </Link>
          );
        })}
        <Link
          to={`/${id}/${pageCount}`}
          style={{ textDecoration: "none", color: "black", margin: "5px" }}
          className={css["pagePicker__link"]}
        >
          <img src={arrow} alt="" style={{ width: "10px" }} />
        </Link>
      </div>
    </div>
  );
}
