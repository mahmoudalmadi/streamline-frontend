import BottomTab from "./BottomTab";

const DynamicScreen = ({ children, className = "" }) => {
    return (
        <div className={`w-full md:w-[85%] lg:w-[85%] px-[15px] py-[8px] ${className}`}>
            <div className="relative z-10">{/* Children container with higher z-index */}
                {children}
            </div>
            <div className="flex-col relative left-[-25px] md:left-[-12.5%] lg:left-[-11.75%] mt-[30px] z-0"> {/* Set this as a relative parent */}
                <div className="absolute top-[-1px] h-[1px] left-[1.8%] bg-gray-400 w-screen" />
                <div className="absolute left-[2%] right-0 w-screen"> {/* BottomTab styles */}
                    <BottomTab />
                </div>
            </div>
        </div>
    );
};

export default DynamicScreen;
