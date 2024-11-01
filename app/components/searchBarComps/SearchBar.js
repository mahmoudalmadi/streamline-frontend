import { FaSearch } from "react-icons/fa";

const SearchBar = () => {

    return(

        <div className="flex shadow-[0_0_10px_rgba(0,0,0,0.1)]
         justify-between border-[0.5px] border-graySubtitle rounded-full w-[100%]">
        
            {/* where box */}
            <div className="flex flex-1 flex-col justify-center rounded-full px-3 
            py-1 pl-6 hover:bg-gray-200">
                <div className="font-semibold text-[14px]">
                    Where
                </div>
                <div className=" text-graySubtitle text-[13px]">
                    Search locations 
                </div>
            </div>



            {/* where box */}
            
            <div className="relative group flex flex-1 flex-col justify-center rounded-full px-3 py-1 pl-6 hover:bg-gray-200">
                    <div className="absolute right-0 h-[60%] h-full w-[0.5px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
                    <div className="font-semibold text-[14px]">
                        When
                    </div>
                    <div className=" text-graySubtitle text-[13px]">
                        Lesson times
                    </div>
                    <div className="absolute left-0 h-[60%] h-full w-[1px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
            </div>

            {/* lesson type box */}
            <div className="relative group flex flex-1 flex-col justify-center rounded-full px-3 py-1
             hover:bg-gray-200 pl-6">
                <div className="absolute right-0 h-[60%] h-full w-[1px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
                <div className="font-semibold text-[14px]">
                    Type
                </div>
                <div className=" text-graySubtitle text-[13px]">
                    Add Level
                </div>
                <div className="absolute left-0 h-[60%] h-full w-[0.5px] bg-gray-200 transform -translate-x-1/2
                    opacity-100  "/>
            </div>

            {/* lesson type box */}
            <div className="flex flex-1 
            justify-between items-center rounded-full py-1 pr-1 pl-4
            hover:bg-gray-200">
                <div className="flex flex-col">
                    <div className="font-semibold text-[14px]">
                        Price
                    </div>
                    <div className=" text-graySubtitle text-[13px]">
                        Add Level
                    </div>
                </div>

                <button>
                <div className="flex justify-center items-center
                rounded-full w-[42px] h-[42px] mt-1 mb-1 bg-streamlineBlue">
                <FaSearch style={{ color: 'white', fontSize: '20px' }} />
                </div>  
                </button>      
            </div>

        </div>

    )

}

export default SearchBar;