

const SearchBar = () => {

    return(

        <div className="flex border-2 border-gray-400 space-x-4">
        
            {/* where box */}
            <div className="flex-col">
                <div className="font-bold">
                    Where
                </div>
                <div className=" text-graySubtitle">
                    Search locations
                </div>
            </div>

            {/* where box */}
            <div className="flex-col">
                <div className="font-bold">
                    When
                </div>
                <div className=" text-graySubtitle">
                    Lesson times
                </div>
            </div>

            {/* lesson type box */}
            <div className="flex-col">
                <div className="font-bold">
                    Type
                </div>
                <div className=" text-graySubtitle">
                    Add Level
                </div>
            </div>

        </div>

    )

}

export default SearchBar;