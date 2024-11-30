import { use, useRef, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css';

export default function MultiFieldPhoneEntry({prompt, placeholder, fieldResponse, setFieldResponse,field}) {

    const[isValid, setIsValid] = useState(true)

    const setPhoneNumber = (phoneNumber) => {
      setIsValid(true)
      setFieldResponse(prevState => ({
        ...prevState,
        [field]: phoneNumber,
      }));
    };

    const handlePhoneNumberBlur = () => {
      if (fieldResponse[field] && isValidPhoneNumber(fieldResponse[field])) {
        setIsValid(true); // Valid number
        setFieldResponse(prevState => ({
          ...prevState,
          ["isValidNum"]: true,
        }));
      } else {
        setIsValid(false); // Invalid number
        setFieldResponse(prevState => ({
          ...prevState,
          ["isValidNum"]: null,
        }));
      }
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
            onBlur={handlePhoneNumberBlur} // Validate only on blur
            />
            {!isValid && (
              <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
            )}
        </div>
        </>
    )
}