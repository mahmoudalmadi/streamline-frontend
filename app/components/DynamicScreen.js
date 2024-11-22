import BottomTab from "./BottomTab";


const DynamicScreen = ({children, className=""}) => {

    return(
        <div className={`w-full md:w-[85%] lg:w-[85%] p-6 ${className}`}>
            {children}
            <div className="flex-col">
            <div className="h-[0.5px] bg-gray-500"/>
            <BottomTab/>
            </div>
        </div>
    )
}

export default DynamicScreen;