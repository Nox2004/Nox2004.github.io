import { useEffect, useState, useRef } from "react";

import "/src/styles/OverlayStyle/OverlayStyle.css";
import { useTranslation } from "react-i18next";
import { SupportedLanguages } from "../i18nConfig"

function Overlay( { changeSection } : { changeSection : (newSection : string) => void })
{
    const { t, i18n } = useTranslation("global");

    const [activeSection, setActiveSection] = useState("main");

    const [languageOptionsActive, setLanguageOptionsActive] = useState(false);

    const getLanguageOptions = () =>
    {
        return SupportedLanguages.map((language, index) => {
            return <img 
                    src={getFlagSrc(language)} 
                    className={"language-option".concat((language==i18n.language) ? " selected" : "")} 
                    key={index} 
                    onClick={() => i18n.changeLanguage(language)}/>;
        });
    }

    const getFlagSrc = (languageKey : string) => {
        return `assets/images/flags/${languageKey}.svg`
    }
    
    const [mousOverHeader, setMouseOverHeader] = useState(false);
    const [updatedScrollY, setUpdatedScrollY] = useState(0);
    const [oldScrollY, setOldScrollY] = useState(0);
    const [headerAppearAnimationTimer, setHeaderAppearAnimationTimer] = useState(0);
    const updateHeaderTime = 0.1;
    const updatedScrollAppearTimeout = 5;

    const [headerAnimationTriggerCounter, setHeaderAnimationTriggerCounter] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setHeaderAnimationTriggerCounter(headerAnimationTriggerCounter+1);

            let timer = headerAppearAnimationTimer;
            timer -= updateHeaderTime;
            
            if (updatedScrollY != oldScrollY) //is scrolling
            {
                timer = updatedScrollAppearTimeout; //trigger animation
                setOldScrollY(updatedScrollY); //update old scroll position
            }
            
            if (mousOverHeader) //trigger animation if mouse is over the header
            {
                timer = updatedScrollAppearTimeout;
            }
            
            setHeaderAppearAnimationTimer(timer);
        }
        , updateHeaderTime*1000);
        
    }, [headerAnimationTriggerCounter]);
    
    useEffect(() => {
        const handleScroll = () => {
            setUpdatedScrollY(window.scrollY);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const darkModeButtonAnimationTime = 2.4;
    const [darkModeAnimationTimer, setDarkModeAnimationTimer] = useState(0);
    
    const [darkModeButtonRotationCounter, setDarkModeButtonRotationCounter] = useState(0);
    const [darkModeButtonRotation, setDarkModeButtonRotation] = useState(0);
    const darkModeButton = useRef<HTMLDivElement>(null);
    const [darkModeButtonSwingAmplitude, setDarkModeButtonSwingAmplitude] = useState(15);

    useEffect(() => {
        const fps = 60;

        setTimeout(() => {
            setDarkModeAnimationTimer(darkModeAnimationTimer - 1/fps);
            if (darkModeAnimationTimer <= 0) {
                setDarkModeAnimationTimer(0);
                setDarkModeButtonRotationCounter(0);
                setDarkModeButtonRotation(0);
            }
            else 
            {
                const maxAmplitude = darkModeButtonSwingAmplitude;
                const velocity = 10;
                setDarkModeButtonRotationCounter(darkModeButtonRotationCounter + 1/fps);
                setDarkModeButtonRotation(Math.sin(darkModeButtonRotationCounter*velocity)*(maxAmplitude*(darkModeAnimationTimer/darkModeButtonAnimationTime)));
            }
            
        }, 1000 / fps);
    }, [darkModeAnimationTimer]);

    function triggerDarkThemeAnimation() { 
        //reset style animation
        if (darkModeButton.current != null) {
            darkModeButton.current.style.animation = "none";
            void darkModeButton.current.offsetWidth;
            darkModeButton.current.style.animation = `dark-mode-button-animation ${darkModeButtonAnimationTime}s ease-in-out forwards`;
        }
        //reset timer that controls the rotation swing   
        let amp = Math.random()*15 + 15
        amp *= Math.random() > 0.5 ? 1 : -1;
        setDarkModeButtonSwingAmplitude(amp);
        setDarkModeAnimationTimer(darkModeButtonAnimationTime);
    }

    return (
        <>
            <header className = {(headerAppearAnimationTimer>0) ? "scrolling" : "not-scrolling"}>

                <div className={"dark-mode-button"+((darkModeAnimationTimer<=0) ? " clickable" : "")} id = "dark-mode-button"
                style={{rotate: `${darkModeButtonRotation}deg`}}
                ref = {darkModeButton}
                onClick={ () => { 
                    if (darkModeAnimationTimer<=0) { triggerDarkThemeAnimation(); document.body.classList.toggle("dark-mode") }
                    } }>
                    <div className="line"/>
                    <div className="circle"/>
                </div>
                
                <div className="language-selection">
                    <img src={getFlagSrc(i18n.language)} className="language-selection-button" onClick={() => setLanguageOptionsActive(!languageOptionsActive)}/>
                    <div className={"language-options".concat(languageOptionsActive ? " active" : "")}> 
                        {getLanguageOptions()}
                    </div>
                </div>
                
                <div className="header-body"
                onMouseEnter={() => setMouseOverHeader(true)}
                onMouseLeave={() => setMouseOverHeader(false)}>
                    <h4 
                    className={"section" + ((activeSection == "main") ? " active" : " unactive")} 
                    onClick={() => { changeSection("main"); setActiveSection("main") }}>
                        {
                        (window.innerWidth > 800) ? t("header.home") : <i className="fa-solid fa-house"></i>
                        }
                        
                    </h4>
                    <h4
                    className={"section" + ((activeSection == "portfolio") ? " active" : " unactive")}
                    onClick={() => { changeSection("portfolio"); setActiveSection("portfolio") }}>
                        {
                        (window.innerWidth > 800) ? t("header.portfolio") : <i className="fa-solid fa-gamepad"></i>
                        }
                    </h4>
                    <h4
                    className={"section" + ((activeSection == "resume") ? " active" : " unactive")}
                    onClick={() => { changeSection("resume"); setActiveSection("resume") }}>
                        {
                        (window.innerWidth > 800) ? t("header.resume") : <i className="fa-solid fa-file"></i>
                        }
                    </h4>
                    <h4
                    className={"section" + ((activeSection == "about") ? " active" : " unactive")}
                    onClick={() => { changeSection("about"); setActiveSection("about") }}>
                        {
                        (window.innerWidth > 800) ? t("header.about") : <i className="fa-solid fa-address-card"></i>
                        }
                    </h4>

                    <div className="header-curve">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                        </svg>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Overlay; 