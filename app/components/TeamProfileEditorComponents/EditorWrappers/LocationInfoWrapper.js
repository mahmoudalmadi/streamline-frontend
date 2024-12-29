import GoogleAddyEntryEditor from "../GoogleAddressInput"
import ImageUploader from "../ImageUploader"
import AmenitiesSelection from "../AmentitiesSelection"
import CONFIG from "@/config"
import { changeField } from "@/app/hooks/changeField"
import MultiFieldPhoneEntry from "../../AuthModalComps/MultiFieldPhoneEntry"
import ProfileEntryEditor from "../ProfileEntryEditor"

export default function LocationInfoWrapper({
    locationDivRef,address,setAddress,streetAddress,setStreetAddress,setCoords,setCity, postalCode,setPostalCode,setProvince,coords,city,province,setCountry,country,locationImgs,setLocationImgs,selectedAmenities,setSelectedAmenities,isMissingLocation,noHeader,sameAsTeamContact,setSameAsTeamContact,locationContactName,locationContactNumber,locationContactEmail,setLocationContactName,setLocationContactNumber,setLocationContactEmail,hasChosenLocationContact
}){

    return(
        <>
            <div className="font-bold text-streamlineBlue text-[18px] pt-[15px]"
              ref={locationDivRef}>
                  {!noHeader && <div>
                  Location Information
                  </div>}
                  {isMissingLocation &&
                  <div className="text-red-500 text-[15px]">
                    Please ensure you have completed all the fields in this section
                  </div>}
              </div>

              <GoogleAddyEntryEditor
              address={address}
              setAddress={setAddress}
              streetAddress={streetAddress}
              setStreetAddress={setStreetAddress}
              setPostalCode={setPostalCode}
              postalCode={postalCode}
              setCoords={setCoords}
              coords={coords}
              city={city}
              setCity={setCity}
              province={province}
              country={country}
              setCountry={setCountry}
              setProvince={setProvince}
              />

              {!hasChosenLocationContact?
              <div>
                <div className="text-[15px] mb-[8px] font-bold">
                Location Specific Contact Info
                </div>
                <div className="flex justify-center mt-[7px]">
                    <div className="flex space-x-[6px] items-center px-[30px] cursor-pointer"
                    onClick={()=>{
                    setSameAsTeamContact(true)}}>
                        <div className={
                            sameAsTeamContact?
                            `bg-streamlineBlue w-[15px] h-[15px] `
                            :
                            `bg-white w-[15px] h-[15px] border border-gray-400`}
                            style={{
                                borderRadius:"5px"
                            }}/>
                        <div className={sameAsTeamContact?'font-bold text-center':'text-center'}>
                            Same as team contact info
                        </div>
                    </div>
                    <div className="flex space-x-[6px] items-center px-[30px] cursor-pointer"
                    onClick={()=>{setSameAsTeamContact(false)}}>
                        <div className={
                            sameAsTeamContact===false?
                            `bg-streamlineBlue w-[15px] h-[15px] `:
                            `bg-white w-[15px] h-[15px] border border-gray-400`}
                            style={{
                                borderRadius:"5px"
                            }}/>
                        <div className={sameAsTeamContact===false?'font-bold text-center':'text-center'}>
                            Different from team contact info
                        </div>
                    </div>
                </div>
                {sameAsTeamContact ?

                <div>
                    <ProfileEntryEditor
                    prompt={"Location contact person"}
                    placeholder={"Full name"}
                    response={locationContactName}
                    setResponse={setLocationContactName}
                    />
                    <ProfileEntryEditor
                    prompt={"Location contact email"}
                    placeholder={"Email address"}
                    response={locationContactEmail}
                    setResponse={setLocationContactEmail}
                    />
                    <MultiFieldPhoneEntry 
                    prompt={"Location Contact Number"}
                    placeholder={"Contact #"}
                    fieldResponse={locationContactNumber}
                    setFieldResponse={setLocationContactNumber}
                    field={'phoneNumber'}/>
                </div>
                :
                <>

                </>
                }
              </div>
              :
              <div>
                
              </div>
              }

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
              {!noHeader && <div
                  className="relative w-full h-[1px] bg-gray-200 mt-[10px]"
                />  }
        </>
    )
}