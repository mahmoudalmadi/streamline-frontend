import Image from "next/image";
import DynamicScreen from "./components/DynamicScreen";
import TopBar from "./components/TopBar";
import SearchBar from "./components/searchBarComps/SearchBar";
import SwimTeamsMenu from "./components/SwimTeamsMenu";

export default function SuccessfulCheckout() {

    const handleRedirect = () => {
        router.push(`/`)
    }
  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className=" h-screen">

        <TopBar/>

        <div
        className="flex p-[200px]"
        >
            Successful transaction

            <button>
                <div className="p-[20px] rounded-[15px] bg-streamlineBlue text-white"
                onClick={handleRedirect}>
                    Go home
                </div>
            </button>
        </div>

      </DynamicScreen>
    </div>
  );
}
