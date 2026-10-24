import '/src/styles/FooterStyle/FooterStyle.scss';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation("global");

    return (
        <div className='footer'>
            <h5 className='contact-info'>
                <span>{t("footer.contact-info")}</span>
                <br/>
                <br/>
                {t("footer.email")}<button onClick={() => {navigator.clipboard.writeText('biel.bianchi2004@hotmail.com')}}>biel.bianchi2004@hotmail.com</button>
                <br/>
                {t("footer.phone")}<button onClick={() => {navigator.clipboard.writeText('+55 19 99169-2311')}}>+55 19 99169-2311</button>
            </h5>
            <div className='social-media'>
                <a href = "https://www.linkedin.com/in/gabriel-bianchi-2ab455207/" target="_blank"> <i className="fa-brands fa-linkedin"/> </a>
                <a href = "https://github.com/Nox2004/Nox2004.github.io" target="_blank"> <i className="fa-brands fa-github" /> </a>
                <a href = "https://x.com/Gabriel_Nox_" target="_blank"> <i className="fa-brands fa-square-twitter" /> </a>
            </div>
            <h6 className='copyright'>© 2024 Nox</h6>

            <div className="footer-curve">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    );
};

export default Footer; 