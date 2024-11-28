import { useRef } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function MultiFieldPhoneEntry({prompt, placeholder, fieldResponse, setFieldResponse,field}) {

    const divRef = useRef(null);


    const autoResize = (boxRef) => {
        const textarea = boxRef.current;
        if (textarea) {
          textarea.style.height = 'inherit';  // Temporarily make height adequate to the content
          textarea.style.height = `${textarea.scrollHeight}px`;  // Set height to scrollHeight to remove the scrollbar
        }
      };

    const setPhoneNumber = (phoneNumber) => {
      setFieldResponse(prevState => ({
        ...prevState,
        [field]: phoneNumber,
      }));
    };

    return(

        <>
        <div className="w-[50%]">
          <div className="text-[15px] mb-[3px] font-bold w-full">
            {prompt}
          </div>
            <PhoneInput
            className="flex text-gray-700 border border-gray-300 rounded-[12px]  
            resize-none overflow-auto overflow-hidden pl-[7px] py-[2px] 
            focus:outline-none focus:border-blue-500 " 
              placeholder={placeholder}
              value={fieldResponse[field]}
              onChange={setPhoneNumber}
              defaultCountry="CA"
              international
              withCountryCallingCode
            />
        </div>
        </>
    )
}