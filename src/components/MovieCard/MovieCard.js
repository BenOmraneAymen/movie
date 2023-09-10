import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import css from './MovieCard.module.css'
export default function MovieCard(props) {

    const [laoding, setLoading] = useState(true);

    let rating_color;
    if (props.rating > 7.5) {
        rating_color = "green"
    } else {
        if (props.rating > 5) {
            rating_color = "orange"
        } else {
            rating_color = "red"
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300)
    })

    return (
        (<div className={css['container']}>
            <div className={css["card"]}>
                {laoding ? <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}

                /> : <>
                    <img src={props.image} className={css["MovieImage"]}></img>
                    <div className={css["desc_Container"]}>
                        <div className={css["description"]}>{props.Name || props.title}</div>
                        <span className={css[`rating_${rating_color}`]}>{props.rating} </span>
                    </div>
                </>
                }
            </div>
        </div>)
    );
}