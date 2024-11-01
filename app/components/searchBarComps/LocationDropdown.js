import React, { useEffect, useRef, useState } from 'react';

const LocationDropdown = ({ isVisible, onClose, locations }) => {
    const divRef = useRef(null);

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            onClose(); // Trigger the close function
        }
    };

    useEffect(() => {
        console.log("is visbile changes",isVisible)
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        console.log("is visbile later",isVisible)
    }, [isVisible]);

    return (
        isVisible && (
            <div
                ref={divRef}
                className="absolute flex flex-col left-0 top-full mt-2 py-2 
                 rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.1)]"
                onClick={onClose} // Close on click within the div
            >
                <div className='max-h-[256px] overflow-y-scroll pl-3 pr-4 py-2'> 

                <div className='text-[10px] mb-0.5 pl-3  pr-3 whitespace-nowrap text-gray-700 pr-2'>
                    Cities with available swim clubs
                </div>
                {locations.map((item, index) => (
                <div key={index} className="flex flex-1 pl-3  pr-3 w-full font-semibold py-2
                rounded-xl whitespace-nowrap hover:bg-gray-200">
                    <p>{item.city}, {item.state}</p>
                </div>
                ))}
                </div>
            </div>
        )
    );
};

export default LocationDropdown;
