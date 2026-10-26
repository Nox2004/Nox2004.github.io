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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const mediaList = game.media || [];

    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true); // Reset loader when switching media
        setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true); // Reset loader when switching media
        setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
    };

    const currentMedia = mediaList[currentIndex] || '';
    const isVideo = currentMedia.endsWith('.mp4') || currentMedia.endsWith('.webm');

    return (
        <div className="portifolio-game-item-container">
            {/* ... curve and text code ... */}

            <div className="game">
                <div className="text">
                    <h3>{t(game.title)}</h3>
                    <h4>{t(game.description)}</h4>
                    <div className='tags'>
                        {game.tags.map((tag: string, idx: number) => (
                            <h5 key={idx}>{t(tag)}</h5>
                        ))}
                    </div>
                </div>

                <div className="image">
                    <div className="image-wrapper">
                        {/* Loading Spinner / Text Overlay */}
                        {isLoading && (
                            <div className="media-loader">
                                <div className="spinner"></div>
                                <p>Loading media...</p>
                            </div>
                        )}

                        {isVideo ? (
                            <video 
                                src={currentMedia} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                preload="auto"
                                poster={mediaList.find(media => media.endsWith('.png') || media.endsWith('.jpg'))} // Use first image as poster
                                onLoadedData={() => setIsLoading(false)} // Hides loader when video data is ready
                            />
                        ) : (
                            <img 
                                src={currentMedia} 
                                alt={t(game.title)} 
                                onLoad={() => setIsLoading(false)} // Hides loader when image is loaded
                            />
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

            {/* ... download button code ... */}
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