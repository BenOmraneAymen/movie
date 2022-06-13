import { Link, useLocation, Routes, Route } from 'react-router-dom';
import css from './staffSection.module.css'


export default function StaffSection(props) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    let arr = Array.from(props.list);
    let location = useLocation();
    let actorNumber = 0;
    return (
        <>
            <h1>{props.sectionTitle}</h1>
            <div className={css['slider']}>
                {

                    arr?.map((param) => {
                        const { character, name, profile_path, id } = param;
                        if (profile_path && actorNumber < 8) {
                            actorNumber++;
                            return <div key={id} className={css['container']}>

                                <img src={IMG_URL + profile_path} className={css['image']} />
                                <div className={css['name']}>{name} </div>
                                <div className={css['role']}>Role:{character}</div>
                            </div>
                        }

                    })
                }
                <Link to={location.pathname + "/Actors"} className={css['link']}>
                    <div className={css['plus']}> View more </div>
                </Link>
            </div>
        </>
    );


}