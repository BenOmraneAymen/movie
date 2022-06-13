import ReactElasticCarousel from 'react-elastic-carousel';
import css from './MovieSection.module.css'
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';



export default function MovieSection(props) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const breakpoints = [

        { width: 350, itemsToShow: 2 },
        { width: 450, itemsToShow: 3 },
        { width: 1050, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
        { width: 1400, itemsToShow: 6 },
    ];
    let arr = Array.from(props.show);
    return (
        <>
            <h1>{props.sectionTitle}</h1>
            <ReactElasticCarousel breakPoints={breakpoints} disableArrowsOnEnd={false} className={css['carousel']} >
                {
                    arr?.map((movie) => {
                        const { name, title, vote_average, poster_path, id } = movie;
                        let path = '/' + props.type + '/' + id;
                        return <Link to={path} style={{ textDecoration: 'none', color: 'black' }}>
                            <MovieCard key={id} image={IMG_URL + poster_path} Name={title || name} rating={vote_average.toFixed(1)} />
                        </Link>
                    })
                }
            </ReactElasticCarousel>
        </>
    );


}