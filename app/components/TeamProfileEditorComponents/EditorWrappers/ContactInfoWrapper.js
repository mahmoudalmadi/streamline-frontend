import ProfileEntryEditor from "../ProfileEntryEditor"
import MultiFieldPhoneEntry from "../../AuthModalComps/MultiFieldPhoneEntry"

export default function ContactInfoWrapper({fullName,setFullName,emailAddress,setEmailAddress,phoneNumberObj,setPhoneNumberObj}) {

    return(
        <>
            <ProfileEntryEditor
              prompt={"Contact Name"}
              response={fullName}
              setResponse={setFullName}
              placeholder={"Full Name"}
              isLong={false}
              />
              
              <ProfileEntryEditor
              prompt={"Team Contact Email"}
              response={emailAddress}
              setResponse={setEmailAddress}
              uneditable={true}
              placeholder={"Email Address"}
              isLong={false}
              />

              <MultiFieldPhoneEntry 
              prompt="Contact Phone Number"
              placeholder={"Phone Number"}
              fieldResponse={phoneNumberObj}
              setFieldResponse={setPhoneNumberObj}
              field="phoneNumber"
              customLength={"w-[190px]"}
              />

              <div
              className="h-[8px]"
              />
        </>
    )
}