import '/src/styles/ResumeStyle/ResumeStyle.css';

import { useTranslation } from 'react-i18next';

function Resume() {

    const { t } = useTranslation("global");

    //get data from the games.json file

    return (
        <>
            <div className = "page-header">
                <h1 className='wavey-translate-y'>{t("resume.message1")}</h1>
                <h2>{t("resume.message2")}</h2>
            </div>
            <a href={"assets/resume/"+t("resume.cv-file-name")} className='cv' download>
                <h2>{t("resume.message3")}</h2>
                <i className="fa-solid fa-file-pdf"></i>
            </a>

            <div className = "portifolio-skills-and-cv">
                <div className = "skill-group">
                    <h3>{t("resume.skills.title")}</h3> 
                    {(t("resume.skills.list", { returnObjects: true }) as Array<string>).map((item) => <h4>{item}</h4>)}
                </div>
                <div className = "skill-group">
                    <h3>{t("resume.engines.title")}</h3> 
                    {(t("resume.engines.list", { returnObjects: true }) as Array<string>).map((item : string) => <h4>{item}</h4>)}
                </div>
                <div className = "skill-group">
                    <h3>{t("resume.languages.title")}</h3> 
                    {(t("resume.languages.list", { returnObjects: true }) as Array<string>).map((item : string) => <h4>{item}</h4>)}
                </div>
            </div>

            <div className = "page-header">
                <h2>{t("resume.experience.title")}</h2>
            </div>

            <div className = "portifolio-experience">
                {
                    (t("resume.experience.experiences", { returnObjects: true }) as Array<{position: string, company: string, location: string, description: string, date: string, icon: string}>).map((item) => {
                        return  <div className="experience-element">
                                <div className="experience-element-content"><h5>
                                    <div className="position">{item.position}</div>
                                    <div className="company">{item.company}</div>
                                    <div className="location">{item.location}</div>
                                    <div className="description">{item.description}</div>
                                    <svg className="arrow" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 0,20 10,10" /></svg>
                                </h5></div>
                                
                                <div className="experience-date">
                                    <h5>{item.date}</h5>
                                </div>
            
                                <div className="experience-marker">
                                    {
                                        item.icon === "work" ? <i className="fa-solid fa-briefcase"></i> : item.icon === "education" ? <i className="fa-solid fa-graduation-cap"></i> : item.icon === "award" ? <i className="fa-solid fa-award"></i> : <></>
                                    }
                                </div>
                            </div>
                    })
                }
            </div>
            
        </>
    );
};

export default Resume; 