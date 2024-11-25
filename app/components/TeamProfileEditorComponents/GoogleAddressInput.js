import { useRef, useState } from "react";
import extractAddressFromGoogleLink from "@/app/hooks/addressExtraction";

export default function GoogleAddyEntryEditor({prompt, placeholder, response, setResponse,isLong,address,setAddress,
coords, setCoords}) {

    const divRef = useRef(null);
    const [errorMessage,setErrorMessage] = useState("")

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
        setCoords({"lat":lat,"lng":lng})}
        catch(error){
          setErrorMessage("Please make sure you entered a correct Google Maps link for the intended location")
          console.log(errorMessage)
        }
        }else{
          setErrorMessage("")
        } 
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
        <div className="text-[15px] mb-[3px] mt-[8px]">
            Retrieved Address (please edit if incorrect)
          </div>
          <input
          value={address}
          ref={divRef}
          onChange={async(event) => await handleChange(divRef,event,setAddress)}
          className="w-full text-gray-700 border border-gray-300 rounded-[12px]    
          resize-none overflow-auto overflow-hidden pl-[9px] pt-[3px] pb-[2px]
          focus:outline-none focus:border-blue-500" 
          />
        </>
          }
        </div>
        </>
    )
}