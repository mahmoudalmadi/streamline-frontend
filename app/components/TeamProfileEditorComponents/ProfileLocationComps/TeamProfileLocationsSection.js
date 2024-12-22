import InfoDropdown from "../InfoDropdown";
import ThreeDotMenu from "../../../../public/ThreeDotMenu.svg";

export default function TeamProfileLocationsSection({ locationsInfo, parsedAddresses }) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[18px] font-bold text-streamlineBlue w-full">Team Locations</div>
        <div className="flex text-[13px] font-bold text-white bg-green-500 px-[10px] py-[6px] rounded-full whitespace-nowrap space-x-[5px] items-center">
          <div className="text-[16px]">
          +
          </div>
          <div>
          Add another location
          </div>
        </div>
        </div>
        {/* <FaEllipsisV size={13} strokeWidth={0.5} /> */}
        {/* Parent Container */}
        <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-4 py-[10px]">
          {locationsInfo.map((location, idx) => (
            <div
              key={idx}
              className="shadow-[0_4px_3px_rgba(0,0,0,0.1)] sm:w-[90%] md:w-[50%] mx-auto md:mx-0 border border-gray-200 rounded-[20px] hover:bg-gray-100 py-[15px] px-[12px] space-x-[10px] flex items-center pointer-events-none"
            >
              {/* Image with 1:1 Aspect Ratio */}
              <div className="w-[40%] aspect-[1/1] rounded-[10px] overflow-hidden">
                <img
                  src={location.images[0]?.imageUrl || "/placeholder.jpg"}
                  alt="Location"
                  className="w-full h-full object-cover"
                />
              </div>
  
              {/* Address and Status */}
              <div className="flex flex-col flex-1">
                <div className="flex-col text-[15px] font-bold pb-[5px] leading-[16px]">
                  <div className="">{parsedAddresses[idx]?.streetAddress || "Unknown St Address"}</div>
                  <div className="flex space-x-[5px]">
                  <div>{parsedAddresses[idx]?.city || "Unknown City"}, </div>
                  <div>{parsedAddresses[idx]?.state || "Unknown State"}</div>
                  </div>
                </div>
                <div className="flex-col text-[15px] mt-[2px]">
                  <div className="flex-col">
                    <div>
                    <div className="mr-2 pb-[7px] ">Status</div>
        
                    </div>
                    <div
                      className={`font-bold leading-[1px] mt-[1px] ${
                        location.status === "Pending Verification"
                          ? "text-yellow-500"
                          : location.status === "Published"
                          ? "text-green-500"
                          : "text-orange-500"
                      }`}
                    >
                      {location.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center pr-[5px] justify-center pl-[5px]  py-[8px] rounded-full hover:bg-gray-200 cursor-pointer pointer-events-auto"
              onMouseEnter={(e) => e.stopPropagation()} // Prevent parent hover
              >
                <ThreeDotMenu/>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  