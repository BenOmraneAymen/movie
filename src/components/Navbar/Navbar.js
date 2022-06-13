import css from './Navbar.module.css';
import logo from '../../images/logo.png';
import menu from '../../images/menu.png';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";



export default function Navbar() {

    const [Genre, setGenre] = useState([]);
    const [isShown, setShown] = useState(false);

    async function getGenre(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllGenres() {
        const data = await getGenre("https://api.themoviedb.org/3/genre/movie/list?api_key=62d3bcf838fc3fb80bb017733c574f54&language=en-US");
        setGenre(data.genres);
    }

    useEffect(() => {
        getAllGenres();
    }, [])

    function showMenu() {
        if (isShown) {
            setShown(false);
        } else {
            setShown(true);
        }
    }
    return (
        <div className={css['navbar_Container']}>
            <div className={css['navbar']}>
                <img src={menu} className={css['menu']} onClick={() => { showMenu() }} />
                <Link to="/">
                    <img src={logo} className={css['logo']} />
                </Link>
                <div>
                    <span className={css['btn']}>Sign in</span>
                    <span className={css['btn']}>Login in</span>
                </div>
            </div>
            <div className={isShown ? css['navbar_menu'] : css['hiddenNavbarMenu']}>
                <input type="search" id="gsearch" name="gsearch" className={isShown ? css['navbar_search'] : css['hiddenGenreMenu']} />
                <div className={/*isShown ? */css['genre_menu']/* : css['hiddenGenreMenu']*/}>
                    {
                        Genre?.map((genre) => {
                            return <div key={genre.id} className={isShown ? css['genre'] : css['hiddenGenre']} > {genre.name}</div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}