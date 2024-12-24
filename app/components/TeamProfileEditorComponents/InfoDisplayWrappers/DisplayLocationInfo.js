import AmenitiesSection from "../../TeamPageComps/AmenitiesSection"

export default function DisplayLocationInfo({parsedAddress,locationImages,amenitiesList}){

    return(

        <div>

                    <div className="font-bold text-[16px] pt-[8px]">Address</div>    
                    <div className="flex-col">
                    <div className="leading-[16px] mt-[4px]">{parsedAddress?.streetAddress || "Unknown St Address"}</div>
                    <div className="flex">
                    <div>{parsedAddress?.city || "Unknown City"}</div><div>, {parsedAddress?.state || "Unknown State"}</div><div>, {parsedAddress?.postalCode || "Unknown Postal Code"}</div><div>, {parsedAddress?.country || "Unknown Country"}</div>
                        </div>
                    </div>

                    <div className="font-bold text-[16px] pt-[8px]">Location Images</div>    
                    <div className="flex flex-wrap gap-[20px] py-[4px] mb-[4px]">
                    {locationImages.map((image, index) => (
                
                    
                  
                    <div
                      className="relative"
                    >
                      {/* Badge with Number */}

                      
                        <div
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </div>

                      {/* Image Preview */}
                      <img
                        src={image.url}
                        alt={`uploaded-${index}`}
                        style={{
                          width: "120px",
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: "5px",
                        }}
                      />

                    </div>
                  )
                
                     )}
                    </div>

                    <div className="font-bold text-[16px] pt-[8px]">Amenities</div>  
                    <div>
                    <AmenitiesSection amenities={amenitiesList} withoutHeader={true}/>
                    </div>

                    </div>

    )
}