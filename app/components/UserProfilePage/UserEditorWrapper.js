import CONFIG from "@/config";
import AdditionalSwimmersSection from "../AuthModalComps/AdditionalSwimmersSection";
import AdditionalAthletesEditor from "./AdditionalAthletesEditor";
import MultiFieldPhoneEntry from "../AuthModalComps/MultiFieldPhoneEntry";



export default function UserEditorWrapper({incompleteFieldsError,accountHolderEmailAddress,setAccountHolderEmailAddress,accountFullName,setAccountFullName,accountPhoneNumber,setAccountPhoneNumber,otherAthletes,setOtherAthletes}){

    const [wannaAddSwimmers,setWannaAddSwimmers]=useState(false)

    return(

        <div>

            <div className="w-full mx-auto space-y-[10px] mt-[10px]">

            <MultiFieldEntryEditor
                prompt={"Account holder full name"}
                placeholder={"Full Name"}
                field={"fullName"}
                fieldResponse={accountFullName}
                setFieldResponse={setAccountFullName}
            />

            {
                !hasEmail&&
                <MultiFieldEntryEditor
                prompt={"Account holder Email"}
                placeholder={"Email Address"}
                field={"emailAddress"}
                fieldResponse={accountHolderEmailAddress}
                setFieldResponse={setAccountHolderEmailAddress}
                />
            }

            {!hasNumber&&
                <MultiFieldPhoneEntry
                prompt={"Account holder phone number"}
                placeholder={"Enter Phone Number"}
                fieldResponse={accountPhoneNumber}
                setFieldResponse={setAccountPhoneNumber}
                field={"phoneNumber"}
                />
            }
            <div className="text-[12px] text-streamlineBlue leading-[14px]">
                {CONFIG.contactInfoDisclaimer}
            </div>

            <AdditionalSwimmersSection isMinor={true}/>

            {incompleteFieldsError &&
            <div className="text-center text-red-500 text-[14px] font-bold">
                {accountPhoneNumber["isValid"] ?
                "Please ensure all the fields above are completely filled out":
                "Please ensure you have entered a correct phone number"
                }
            </div>}

            </div>

            {otherAthletes.length==0  &&
            <button
                onClick={()=>{setWannaAddSwimmers(true)}}
                className=" flex rounded  items-center align-center w-full mr-0"
            >
                <div className="text-streamlineBlue font-bold mr-[5px]">
                        +
                    </div>
                    <div className="text-streamlineBlue text-[14px] font-bold">
                        Add Another {CONFIG.athleteType} 
                    </div>
            </button>}

            {(wannaAddSwimmers||otherAthletes.length>0)&&
                <AdditionalAthletesEditor kids={otherAthletes} setKids={setOtherAthletes}/>
            }

        </div>


    )


}