import GoogleAddyEntryEditor from "../GoogleAddressInput"
import ImageUploader from "../ImageUploader"
import AmenitiesSelection from "../AmentitiesSelection"
import CONFIG from "@/config"

export default function LocationInfoWrapper({
    locationDivRef,address,setAddress,setCoords,setCity,setProvince,coords,city,province,setCountry,country,locationImgs,setLocationImgs,selectedAmenities,setSelectedAmenities,isMissingLocation
}){

    return(
        <>
            <div className="font-bold text-streamlineBlue text-[18px] pt-[15px]"
              ref={locationDivRef}>
                  <div>
                  Location Information
                  </div>
                  {isMissingLocation &&
                  <div className="text-red-500 text-[15px]">
                    Please ensure you have completed all the fields in this section
                  </div>}
              </div>

              <GoogleAddyEntryEditor
              address={address}
              setAddress={setAddress}
              setCoords={setCoords}
              coords={coords}
              city={city}
              setCity={setCity}
              province={province}
              country={country}
              setCountry={setCountry}
              setProvince={setProvince}
              />

              <ImageUploader allowMultiple={true} images={locationImgs} setImages={setLocationImgs} prompt={"Location Images (at least 5 images)"}
              buttonMessage={
              locationImgs.length===0?"Upload Location Photos":"Add Location Photos"}/>

              <AmenitiesSelection 
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              amenitiesIcons={CONFIG.amenitiesIcons}/>

              <div
              className="h-[8px]"
              />
              <div
                  className="relative w-full h-[1px] bg-gray-200 mt-[10px]"
                />  
        </>
    )
}