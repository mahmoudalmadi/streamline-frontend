import React, { useEffect, useRef, useState } from 'react';
import PriceDial from './PriceDial';

const PriceDropdown = ({ isVisible, onClose, setPriceLowerBound, priceLowerBound,
setPriceUpperBound, priceUpperBound }) => {
    const divRef = useRef(null);

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            onClose(); // Trigger the close function
        }
    };

    useEffect(() => {
        console.log("is visbile changes IN PRICE",isVisible)
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        isVisible && (
            <div
                ref={divRef}
                className="absolute flex flex-col right-0 top-full mt-2 py-2 
                 rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.1)] px-2"
                onClick={(e)=>e.stopPropagation()} // Close on click within the div
            >
                <div className='text-[12px] mb-0.5 pl-3 whitespace-nowrap 
                text-streamlineBlue pr-2 '
                style={{
                    fontWeight:525
                }}> 
                    Per lesson price range ($CAD)
                <PriceDial setPriceLowerBound={setPriceLowerBound} 
                lowerBound={priceLowerBound} upperBound={priceUpperBound}
                setPriceUpperBound={setPriceUpperBound}/>
                </div>
            </div>
        )
    );
};

export default PriceDropdown;
