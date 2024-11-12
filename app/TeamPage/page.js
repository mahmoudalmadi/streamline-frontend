"use client";

import DynamicScreen from "../components/DynamicScreen";
import ImageViewer from "../components/ImageViewer";
import TopBar from "../components/TopBar";
import { useState } from "react";

export default function TeamPage() {

    const swimTeamName = "Neptunes Swimming Academy"

    const programsAvailable = ["Learn to swim", "Competitive"]
    const classSizes= ["Group (4:1)", "Semi-Private (2:1)"]

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

    const formatProgramsList = (items) => {
        if (items.length === 1) {
          // One item: Display the name followed by "programs"
          return `${items[0]} programs`;
        } else if (items.length === 2) {
          // Two items: Display items with "and" between them, and the second item in lowercase
          return `${items[0]} and ${items[1].toLowerCase()} programs`;
        } else if (items.length >= 3) {
          // Three or more items:
          const lastItem = items[items.length - 1].toLowerCase();
          const middleItems = items.slice(1, -1).map(item => item.toLowerCase()).join(', ');
          return `${items[0]}, ${middleItems}, and ${lastItem} programs`;
        }
        return '';
      };
      
      const ProgramsList = ({ items }) => {
        return <div className="">{formatProgramsList(items)}</div>;
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

        <div className="w-full mt-[20px] text-[20px] font-bold mb-[10px]">
        {swimTeamName}
        </div>

        <div className="flex space-x-[10px] pb-[15px]">
            
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
                <div className="absolute bottom-[30px] right-[20px] bg-white
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

        <div className="flex">
        
        <div className="flex-1">
        
        <div
        className="font-bold text-[18px]"
        >
            Swim team in Abu Dhabi, UAE
        </div>
        
        <ProgramsList items={programsAvailable}/>

        <div>
            Class size{classSizes.length>1?"s":""}: {classSizes.join(', ')}
        </div>

        </div>

        <div className="p-[20px] w-[35%] border border-gray-300 rounded-xl
        shadow-[0_0_10px_rgba(0,0,0,0.1)] ">
            
            <div className="mb-[10px] font-bold">
                Book your trial lesson
            </div>

            <div className="flex flex-col w-full  border border-gray-400 rounded-xl cursor-pointer">

                <div className="border-b border-gray-400 p-2">
                    <div className="font-bold text-[12px]">
                        LESSON TYPE
                    </div>
                    <div className="text-gray-400 text-[12px]">
                        Select lesson type
                    </div>
                </div>
                <div className=" flex">
                <div className="w-[50%] p-2 border-r border-gray-400">
                    <div className="font-bold text-[12px]">
                        DATE
                    </div>
                    <div className="text-gray-400 text-[12px]">
                        Add date
                    </div>
                </div>
                <div className="w-[50%] p-2">
                    <div className="font-bold text-[12px]">
                        TIME
                    </div>
                    <div className="text-gray-400 text-[12px]">
                        Add time
                    </div>
                </div>

                </div>

            </div>

            <div className="flex w-full justify-center items-center mt-[10px]
            bg-streamlineBlue py-[10px] rounded-xl">

                <div className="text-white font-bold text-[15px]">
                    Check availability
                </div>
            </div>

        </div>


        </div>
        
        

      </DynamicScreen>
    </div>
  );
}
