import Image from "next/image";
import DynamicScreen from "./components/DynamicScreen";
import TopBar from "./components/TopBar";
import SearchBar from "./components/searchBarComps/searchBar";

export default function Home() {
  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className="bg-gray-100 h-screen">

        <TopBar/>

        <div
        className="flex justify-center w-full"
        >
          <div className="font-bold justify-center text-[24px] items-center">
            Find Your Swim Team
          </div>
        </div>

        <SearchBar/>

      </DynamicScreen>
    </div>
  );
}
