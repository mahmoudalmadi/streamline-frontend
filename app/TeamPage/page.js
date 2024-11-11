"use client";

import DynamicScreen from "../components/DynamicScreen";
import ImageViewer from "../components/ImageViewer";
import TopBar from "../components/TopBar";
import { useState } from "react";

export default function TeamPage() {

    const swimTeamName = "Neptunes Swimming Academy"

    const images = ["https://swimmings.s3.us-east-2.amazonaws.com/neptuneLogo.jpeg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolOne.jpg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolThree.jpg",
    "https://swimmings.s3.us-east-2.amazonaws.com/poolTwo.jpeg"]

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
  
    const openModal = (index) => {
      setCurrentIndex(index);
      setIsOpen(true);
    };
  
    const closeModal = () => {
        console.log("HELLLO")
      setIsOpen(false);
    };

  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className=" h-screen">

        <TopBar/>

        <div
        className="relative flex flex-col items-center justify-center w-full"
        >
        <div
            className="relative w-screen h-[1px] bg-gray-200 mt-[18px]"
          />  

        <div className="w-full mt-[20px] text-[20px] font-bold">
        {swimTeamName}
        </div>

        <div className="flex space-x-[10px] ">
            
                <div className="flex-1">
                <img
                    src={images[1]}
                    onClick={()=>{openModal(0)}}
                    className=
                    "  object-cover w-full h-full cursor-pointer
                    rounded-[15px]"

                    
                />
                </div>
            
                <div className="hidden sm:block w-[50%] h-full">
                <div className="grid grid-cols-2 gap-[10px] h-full">
                    {images.slice(0,4).map((image, index) => (
                    <div
                    className=""
                    >

                    <img
                        key={index}
                        src={image}
                        className=
                        {
                        `w-full h-full object-cover transition-transform 
                        aspect-square cursor-pointer`
                        }
                        style={{
                            borderTopRightRadius:index==1?15:0,
                            borderBottomRightRadius:index==3?15:0,
                            borderTopLeftRadius:index==0?15:0,
                            borderBottomLeftRadius:index==2?15:0
                        }}
                        onClick={()=>{openModal(index+1)}}
                    />
                    </div>
                    ))} 

                </div>


        </div>
                <div className="absolute bottom-[15px] right-[20px] bg-white
                cursor-pointer text-[12px] font-bold border border-black
                px-2 py-2 rounded-full" onClick={()=>{openModal(0)}}>
                    Show all photos
                </div>

        </div>

                {isOpen &&
                <ImageViewer currentIndex={currentIndex} images={images}
                closeModal={closeModal} setCurrentIndex={setCurrentIndex}/>
                }
        </div>
        


      </DynamicScreen>
    </div>
  );
}
