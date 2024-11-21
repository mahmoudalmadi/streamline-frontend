"use client";

import { useRouter } from "next/navigation";
import DynamicScreen from "../../../components/DynamicScreen";
import TopBar from "../../../components/TopBar";


export default function SuccessfulCheckout() {


    const router = useRouter();
    
    const handleRedirect = () => {
        router.push(`/`)
    }
  return (
    <div className="flex  justify-center items-center">
      <DynamicScreen className=" h-screen">

        <TopBar/>

        <div
        className="flex "
        >
            Successful transaction

            <button>
                <div className="p-[10px] rounded-[15px] bg-streamlineBlue text-white"
                onClick={handleRedirect}>
                    Go home
                </div>
            </button>
        </div>

      </DynamicScreen>
    </div>
  );
}
