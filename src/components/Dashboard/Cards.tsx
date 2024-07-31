import React from 'react';
import { cardsData } from './cardsData';
import Card from './card';

const Cards = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        color={card.color}
                        barValue={card.barValue}
                        value={card.value}
                        png={card.png}
                    />
                ))}
            </div>
        </>
    );
}

export default Cards;
