import React, { useState,useRef, useEffect } from 'react';

const PriceDial = ({setPriceUpperBound, setPriceLowerBound, lowerBound, upperBound}) => {

    const [minPrice, setMinPrice] = useState(0);
    const [dialPosition, setDialPosition] = useState(0);
    const lineWidth = upperBound * 2; 
    const leftDialRef = useRef(null);
    const [offset, setOffset] = useState(0)

    const [leftBound, setLeftBound] = useState(0)
    
    const [leftDialCoord, setLeftDialCoord] = useState(2*upperBound)
    let maxCoord = upperBound*2
    const [leftOffset, setLeftOffset] = useState(0)
    let biggestPrice=200;
    const [maxPrice, setMaxPrice] = useState(biggestPrice);

    const priceRangeBarRef = useRef(null)

    useEffect(()=>{
        if (leftDialRef.current) {
            const rect = leftDialRef.current.getBoundingClientRect();
            setLeftBound( rect.left + rect.width / 2)
            console.log("rect",rect)
          }
    },[])

    const handleMouseDownLowerDial = (e) => {
        e.preventDefault();
        const sliderRight = e.currentTarget.getBoundingClientRect().right;
        const sliderLeft = e.currentTarget.getBoundingClientRect().left;

        let leftBarCoord
        if(priceRangeBarRef.current){
            leftBarCoord = priceRangeBarRef.current.getBoundingClientRect().left;
        }

        const handleMouseMove = (event) => {
        if(event.clientX>sliderRight || event.clientX<sliderLeft){
          const newDialPosition = 
            Math.min(event.clientX - sliderRight + offset,leftDialCoord-50);
          setOffset(Math.min(Math.max(newDialPosition,0),leftDialCoord-50))
          const finalDialPosition =Math.max(newDialPosition,0)

          setPriceLowerBound(finalDialPosition);
            console.log(finalDialPosition,leftBarCoord, lineWidth)
          const minPrice = Math.round(
            (finalDialPosition)/lineWidth *  biggestPrice
          );
          setMinPrice(minPrice);}
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        };    


    const handleMouseDownUpperDial = (e) => {
        e.preventDefault();
        const sliderRight = e.currentTarget.getBoundingClientRect().right;
        const sliderLeft = e.currentTarget.getBoundingClientRect().left;

        let leftBarCoord
        if(priceRangeBarRef.current){
            leftBarCoord = priceRangeBarRef.current.getBoundingClientRect().left;
        }

        const handleMouseMove = (event) => {
        if(event.clientX>sliderRight || event.clientX<sliderLeft){
            const newDialPosition = 
            Math.min(event.clientX - sliderRight + leftOffset,lowerBound+50);
            setLeftOffset(Math.max(Math.min(newDialPosition,lowerBound+50),maxCoord))
            const finalDialPosition =Math.min(newDialPosition,maxCoord)
            console.log(event.clientX-sliderLeft, slide,)
            // setLeftDialCoord(finalDialPosition);
            console.log(finalDialPosition,leftBarCoord, lineWidth)
            const maxPrice = Math.round(
            (finalDialPosition)/lineWidth *  biggestPrice
            );
            setMaxPrice(maxPrice);}
        };
    

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        };    

  return (
    <div className="flex relative pt-7 ml-1" style={{ width: `${lineWidth}px`,
    height:"110px" }}>
        {/* Line */}
        <div className="absolute w-full h-[2px] bg-gray-300  transform -translate-y-1/2" 
        ref={priceRangeBarRef}/>
        {/* Dial */}
        <div
        className="absolute w-[30px] h-[30px] bg-white border
        border-gray-200 rounded-full cursor-pointer transform -translate-y-1/2
        -translate-x-[18px] shadow-[0_0_12px_rgba(0,0,0,0.1)]"
        style={{ left: `${lowerBound}px` }}
        onMouseDown={handleMouseDownLowerDial} ref={leftDialRef}
        />
        
        <div
        className="absolute w-[30px] h-[30px] bg-white border
        border-gray-200 rounded-full cursor-pointer transform -translate-y-1/2
        -translate-x-[18px] shadow-[0_0_12px_rgba(0,0,0,0.1)]"
        style={{ left: `${leftDialCoord}px` }}
        onMouseDown={handleMouseDownUpperDial}
        />

        {/* Price Display */}
        <div className="flex justify-between w-full mt-6 text-lg text-gray-700">
            <div className='flex flex-col items-center'
            style={{
                position:"absolute",
                left:-10
            }}>
                <div
                className='flex text-[12px]'
                >
                Minimum
                </div>
                
                <div 
                className='flex text-[16px]'
                >
                ${minPrice}      
                </div>
            </div>

            <div className='flex flex-col items-center'
            style={{
                position:"absolute",
                right:0
            }}>
                <div
                className='flex text-[12px]'
                >
                Maximum
                </div>
                
                <div 
                className='flex text-[16px]'
                >
                ${maxPrice}      
                </div>
            </div>
        </div>
  </div>
  );
};

export default PriceDial;
