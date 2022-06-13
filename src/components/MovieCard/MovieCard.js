import css from './MovieCard.module.css'
export default function MovieCard(props) {
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


    return (
        <div className={css['container']}>
            <div className={css["card"]}>
                <img src={props.image} className={css["MovieImage"]}></img>
                <div className={css["desc_Container"]}>
                    <div className={css["description"]}>{props.Name}</div>
                    <span className={css[`rating_${rating_color}`]}>{props.rating} </span>
                </div>
            </div>
        </div>
    );
}