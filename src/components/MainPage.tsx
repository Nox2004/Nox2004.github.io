import '/src/styles/MainPageStyle/MainPageStyle.css';
import '/src/styles/GenericAnimationsStyle/GenericAnimationsStyle.css';
import GamePreviewGrid from './GamePreviewGrid'
import * as gamesFile from '../assets/json/games.json';

import { useTranslation } from 'react-i18next';

function MainPage() {
    const { t } = useTranslation("global");

    //games selection is a array of 8 games

    let count = 0;
    const number_of_games = 8;
    const gameSelection = [];
    
    for (let i = 0; i < gamesFile.games.length; i++)
    {
        if (gamesFile.games[i].url == "") continue;
        
        gameSelection.push(gamesFile.games[i])       
        count++;

        if (count >= number_of_games) break;
    }

    return (
        <>
            <div className = "page-header">
                <h1 className='wavey-translate-y'>{t("main-page-header.message1")} <span>Nox</span> {t("main-page-header.message2")}</h1>
                <h2>{t("main-page-header.message3")}</h2>
            </div>
            <GamePreviewGrid games={gameSelection}/>
            <div className = "call-to-action">
                <h1>
                    {t("call-to-action.message1")}
                    <br/>
                    <a href="mailto:biel.bianchi2004@hotmail.com" className='wavey-rotation-animation'>
                        {t("call-to-action.message2")}
                    </a>
                </h1>
            </div>
        </>
    );
};

export default MainPage; 