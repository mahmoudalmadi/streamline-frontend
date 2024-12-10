import DynamicScreen from "@/app/components/DynamicScreen";
import TopBar from "@/app/components/TopBarComps/TopBar";


export default function TeamDashboard() {

    return(

        <div className="relative w-screen overflow-x-hidden">
            <div className="flex w-full">
            <DynamicScreen>
            <div className="relative z-10">
                <TopBar/>
                <div
                    className="absolute h-[1px] bg-gray-200 mt-[18px] w-[100%] left-[-3%]"
                />
            </div>

            <div className="w-screen h-screen">

            </div>

            </DynamicScreen>
            </div>

        </div>

    )
}