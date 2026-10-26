import { useState } from 'react';
import '/src/styles/GamePreviewGridStyle/GamePreviewGrid.scss';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Game {
    title: string;
    description: string;
    "short-description": string;
    media: string[];
    url: string;
    date: string;
}

interface GamePreviewCardProps {
    game: Game;
    t: TFunction;
}

function GamePreviewCard({ game, t }: GamePreviewCardProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const mediaSrc = game.media?.[0] || '';
    const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm');

    return (
        <a href={game.url} target="_blank" rel="noreferrer" className="GamePreviewContainer" style={{ position: 'relative' }}>
            {/* Loading Spinner / Text Overlay */}
            {isLoading && (
                <div className="media-loader">
                    <div className="spinner"></div>
                </div>
            )}

            {isVideo ? (
                <video 
                    src={mediaSrc} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata" 
                    onLoadedData={() => setIsLoading(false)}
                />
            ) : (
                <img 
                    src={mediaSrc} 
                    loading="lazy" 
                    alt={t(game.title)} 
                    onLoad={() => setIsLoading(false)}
                />
            )}
            
            <div className="GamePreviewText">
                <h4>{t(game.title)}</h4> 
                <h5>{t(game['short-description'])}</h5>
            </div>
        </a>
    );
}

function GamePreviewGrid({ games }: { games: Game[] }) 
{
    const { t } = useTranslation("global");

    return (
        <div className="GamePreviewGrid">
            {
                games.map((game, index) => (
                    <GamePreviewCard key={index} game={game} t={t} />
                ))
            }
        </div>
    );
};

export default GamePreviewGrid;