import '/src/styles/AboutStyle/AboutStyle.css';

import { useTranslation } from 'react-i18next';

function About() {

    const { t } = useTranslation("global");

    //get data from the games.json file

    return (
        <>
            <div className = "page-header">
                <h1 className='wavey-translate-y'>{t("about.message1")}</h1>
                <h2>{t("about.message2")}</h2>
            </div>

            <div className = "about-me-and-image">
            
                <h4>{t("about.about-me.pre-age") + 
                Math.floor((new Date().getTime() - new Date("2004-11-09").getTime())/(1000*60*60*24*365.25)) +
                t("about.about-me.post-age")}</h4>
                <div className='image-container'><img src="assets/images/my_photo.jpeg" /> </div>
            </div>

            <div className="lists"> 
                <div className="list fun-facts">
                    <h3>{t("about.fun-facts.title")}</h3>
                    {
                        (t("about.fun-facts.list", { returnObjects: true }) as Array<string>).map((item) => <h4>{item}</h4>)
                    }
                </div>
                <div className="list my-bookshelf">
                    <h3>{t("about.my-bookshelf.title")}</h3>
                    {
                        (t("about.my-bookshelf.list", { returnObjects: true }) as Array<string>).map((item) => <h4>{item}</h4>)
                    }
                </div>    
            </div>
        </>
    );
};

export default About; 