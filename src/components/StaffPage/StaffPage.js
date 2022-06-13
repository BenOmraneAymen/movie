import css from './staffPage.module.css'
export default function StaffPage(props) {


    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    return (
        <>
        
            <div className={css['container']} >
            <div className={css['sub_container']} >
                {
                    props.staff.map((param) => {
                        const { character, name, profile_path, id } = param;
                        if (profile_path) {
                            return <div key={id} className={css['card']}>

                                <img src={IMG_URL + profile_path} className={css['image']} />
                                <div className={css['name']}>{name} </div>
                                <div className={css['role']}>Role:{character}</div>
                            </div>
                        }
                    })
                }
            </div>
            </div>
        </>
    );
}