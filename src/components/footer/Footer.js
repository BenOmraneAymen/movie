import css from "./footer.module.css"

export default function Footer() {
    return (
        <div className={css["footer"]}>
            <div className={css["footer_third"]}>
                <h1>Need help?</h1>
                <a>Terms and conditions</a>
                <a>Privacy policy</a>
            </div>
            <div className={css["footer_third"]}>
                <h1>More</h1>
                <a>brochures</a>
                <a>Donate</a>
                <a>Govermance</a>
                <a>Impact report</a>
            </div>
            <div className={css["footer_third"]}>
                <h1>Follow us</h1>
            </div>
        </div>
    );
}