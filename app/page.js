import Image from "next/image";
import DynamicScreen from "./components/DynamicScreen";
import TopBar from "./components/TopBar";
import SearchBar from "./components/searchBarComps/SearchBar";
import SwimTeamsMenu from "./components/SwimTeamsMenu";

export default function Home() {
  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className=" h-screen">

        <TopBar/>

        <div
        className="relative flex flex-col items-center justify-center w-full"
        >
          <div className="flex font-bold text-[24px] text-center mb-2 mt-2">
            Find Your Swim Team
          </div>


            {/* SearchBar with high z-index */}
          <div className="relative z-40 w-full ">
            <SearchBar />
          </div>

          {/* Gray line with lower z-index */}
          <div
            className="relative z-0 w-screen h-[1px] bg-gray-200 mt-[18px]"
          />

        </div>

        <div className="text-[20px] font-semibold mt-[12px] mb-4">
          Partnered Swim Teams
        </div>

        <SwimTeamsMenu/>
        


      </DynamicScreen>
    </div>
  );
}
