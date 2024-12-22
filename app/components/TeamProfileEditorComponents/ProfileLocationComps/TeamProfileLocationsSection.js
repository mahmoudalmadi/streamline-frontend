import InfoDropdown from "../InfoDropdown";
import LocationThumbnail from "./LocationThumbnail";

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
            <LocationThumbnail parsedAddresses={parsedAddresses} location={location} key={idx} idx={idx}/>
          ))}
        </div>
      </div>
    );
  }
  