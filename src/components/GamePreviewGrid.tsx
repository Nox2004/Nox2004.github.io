import '/src/styles/GamePreviewGridStyle/GamePreviewGrid.css';

import { useTranslation } from 'react-i18next';

function GamePreviewGrid({games} : {games : {
    title: string;
    description: string;
    "short-description": string;
    image: string;
    url: string;
    date: string;
}[]}) 
{
    const { t } = useTranslation("global");

    return (
        <div className="GamePreviewGrid">
            {
                games.map((game) => (
                    <a href={game.url} target="_blank" className="GamePreviewContainer">
                        <img src={game.image} />
                        <div className="GamePreviewText"><h4>{t(game.title)}</h4> <h5>{t(game['short-description'])}</h5></div>
                    </a>
                ))
            }
        </div>
    );
};

export default GamePreviewGrid; 