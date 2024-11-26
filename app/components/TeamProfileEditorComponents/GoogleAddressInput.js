import { useEffect, useRef, useState } from "react";
import extractAddressFromGoogleLink from "@/app/hooks/addressExtraction";

export default function GoogleAddyEntryEditor({prompt, placeholder, response, setResponse,isLong,address,setAddress,
coords, setCoords, city, setCity, province, setProvince}) {

    const divRef = useRef(null);
    const [errorMessage,setErrorMessage] = useState("")
    const [cityStateError, setCityStateError] = useState("")

    const autoResize = (boxRef) => {
        const textarea = boxRef.current;
        if (textarea) {
          textarea.style.height = 'inherit';  // Temporarily make height adequate to the content
          textarea.style.height = `${textarea.scrollHeight}px`;  // Set height to scrollHeight to remove the scrollbar
        }
      };

    const handleChange = async(boxRef,event,setText) => {
        autoResize(boxRef);  // Call to resize the textarea
        if(event && setText){
        setText(event.target.value)
        if (event.target.value!=""){
        try{
        const {lat,lng,address} = await extractAddressFromGoogleLink({addressLink:event.target.value})
        setAddress(address)
        setCoords({"lat":lat,"lng":lng})
        try{
          extractCityAndState(address)
        }catch{
          set
        }
        }
        catch(error){
          setErrorMessage("Please make sure you entered a correct Google Maps link for the intended location")
          console.log(errorMessage)
        }
        }else{
          setErrorMessage("")
        } 
        }
      }

    function extractCityAndState(address) {
      console.log("HOL UP IM COOKING", address)
      // Split the address by commas
      const parts = address.split(',');
    
      // Assuming the format is consistent, extract city and state
      if (parts.length >= 2) {
        console.log("INSIDE CONDITIONS")
        const city = parts[1].trim(); // City is usually the second part
        const stateZip = parts[2].trim(); // State and ZIP are usually the third part
        console.log("halF", city, stateZip)
        // Split state and ZIP
        const state = stateZip.split(' ')[0]; // State is before the space
        console.log("3/4",state)
        setCity(city)
        setProvince(state)
        console.log("DIONE COOKING", city, state)
      } else {
        setCityStateError("nada")
        throw new Error('Address format is not correct');
      }
    }

    return(

        <>
        <div className="pb-[10px]">
        <div className="text-[15px] mb-[3px] font-bold">
            {prompt}
        </div>
          {
            isLong?
          <textarea 
          value={response}
          ref={divRef}
          placeholder={placeholder}
          onChange={async(event) => await handleChange(divRef,event,setResponse)}
          className="w-full text-gray-700 border border-gray-300 rounded-[12px]  
          resize-none overflow-auto overflow-hidden pl-[7px] pt-[7px]
          focus:outline-none focus:border-blue-500" 
          />
          :
          <input
          value={response}
          ref={divRef}
          placeholder={placeholder}
          onChange={async(event) => await handleChange(divRef,event,setResponse)}
          className="w-full text-gray-700 border border-gray-300 rounded-[12px]    
          resize-none overflow-auto overflow-hidden pl-[9px] pt-[3px] pb-[2px]
          focus:outline-none focus:border-blue-500" 
          />
          }
          <div className="text-red-500 text-[14px]">
            {errorMessage}
          </div>
        {address &&  
        <>
        <div className="text-[15px] mb-[3px] mt-[8px] text-streamlineBlue font-bold">
            Retrieved Address (please edit if incorrect)
          </div>

          <div className="text-[15px] mb-[3px] font-bold">
            Full Address
          </div>
          <input
          value={address}
          ref={divRef}
          onChange={async(event) => await handleChange(divRef,event,setAddress)}
          className="w-full text-gray-700 border border-gray-300 rounded-[12px]    
          resize-none overflow-auto overflow-hidden pl-[9px] pt-[3px] pb-[2px]
          focus:outline-none focus:border-blue-500" 
          />
          {cityStateError.length>0  &&
          <div className="mt-[7px] font-bold text-streamlineBlue">
            Please enter the city and state
          </div>}
          <div className="flex items-center mt-[10px]">
            <div className="text-[15px]  font-bold mr-[8px]">
              City
            </div>
            <input
            value={city}
            ref={divRef}
            onChange={async(event) => await handleChange(divRef,event,setCity)}
            className=" text-gray-700 border border-gray-300 rounded-[12px]    
            resize-none overflow-auto overflow-hidden pl-[9px] pt-[3px] pb-[2px]
            focus:outline-none focus:border-blue-500 mr-[8px]" 
            />
            <div className="text-[15px]  font-bold mr-[8px] ml-[8px]">
              Province
            </div>
            <input
            value={province}
            ref={divRef}
            onChange={async(event) => await handleChange(divRef,event,setProvince)}
            className=" text-gray-700 border border-gray-300 rounded-[12px]    
            resize-none overflow-auto overflow-hidden pl-[9px] pt-[3px] pb-[2px]
            focus:outline-none focus:border-blue-500 mr-[8px]" 
            />
          </div>
        </>
          }
        </div>
        </>
    )
}