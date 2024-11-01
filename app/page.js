import Image from "next/image";
import DynamicScreen from "./components/DynamicScreen";
import TopBar from "./components/TopBar";
import SearchBar from "./components/searchBarComps/SearchBar";

export default function Home() {
  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className="bg-white h-screen">

        <TopBar/>

        <div
        className="flex flex-col items-center justify-center w-full"
        >
          <div className="flex font-bold text-[24px] text-center mb-2 mt-2">
            Find Your Swim Team
          </div>

          <SearchBar/>

        </div>


      </DynamicScreen>
    </div>
  );
}
