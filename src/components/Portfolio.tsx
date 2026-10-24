import { useState } from 'react';
import '/src/styles/PortfolioStyle/PortfolioStyle.scss';
import '/src/styles/GenericAnimationsStyle/GenericAnimationsStyle.scss';
import * as gamesFile from '../assets/json/games.json';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Game {
    title: string;
    description: string;
    shortDescription?: string;
    image?: string;
    media?: string[];
    url: string;
    date: string;
    tags: string[];
}

interface GameCardProps {
    game: Game;
    t: TFunction;
}

function GameCard({ game, t }: GameCardProps) 
{
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const mediaList = game.media || [];

    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
    };

    const currentMedia = mediaList[currentIndex] || '';
    const isVideo = currentMedia.endsWith('.mp4') || currentMedia.endsWith('.webm');

    return (
        <div className="portifolio-game-item-container">
            <div className="curve">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>

            <div className="game">
                <div className="text">
                    <h3>{t(game.title)}</h3>
                    <h4>{t(game.description)}</h4>
                    <div className='tags'>
                        {
                            game.tags.map((tag: string, idx: number) => {
                                return <h5 key={idx}>{t(tag)}</h5>
                            })
                        }
                    </div>
                </div>

                <div className="image">
                    <div className="image-wrapper">
                        {isVideo ? (
                            <video src={currentMedia} autoPlay loop muted playsInline />
                        ) : (
                            <img src={currentMedia} alt={t(game.title)} />
                        )}

                        {mediaList.length > 1 && (
                            <>
                                <button onClick={handlePrev} className="carousel-arrow prev-arrow">
                                    <i className="fa-solid fa-circle-arrow-left"></i>
                                </button>
                                <button onClick={handleNext} className="carousel-arrow next-arrow">
                                    <i className="fa-solid fa-circle-arrow-right"></i>
                                </button>
                            </>
                        )}

                        <h5>{t(game.date)}</h5>
                    </div>
                </div>
            </div>

            {
                (game.url !== '') ? 
                    <a className="download-button" href={game.url} target="_blank" rel="noreferrer">
                        <div className='fill'/>
                        <i className="fa-solid fa-download"/>
                    </a>
                    : <></>
            }
        </div>
    );
}

function Portfolio() 
{
    const { t } = useTranslation("global");

    return (
        <>
            <div className="page-header">
                <h1 className='wavey-translate-y'>{t("portfolio.message1")}</h1>
                <h2>{t("portfolio.message2")}</h2>
            </div>

            <div className="portifolio-game-list">
            {
                (gamesFile.games as Game[]).map((game: Game, index: number) => 
                {
                    return <GameCard key={index} game={game} t={t} />;
                })
            }
            </div>
        </>
    );
}

export default Portfolio;