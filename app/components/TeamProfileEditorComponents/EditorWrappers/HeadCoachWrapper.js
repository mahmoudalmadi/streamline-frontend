import ProfileEntryEditor from "../ProfileEntryEditor"
import ImageUploader from "../ImageUploader"
import MultiFieldPhoneEntry from "../../AuthModalComps/MultiFieldPhoneEntry"

export default function HeadCoachWrapper({coachInfoDivRef,isMissingCoachInfo,headCoachBio,setHeadCoachBio,headCoachName,setHeadCoachName,coachImg,setCoachImg,noHeader,coachEmail,setCoachEmail,coachNumber,setCoachNumber}){

    return(
        <>
            {!noHeader&&<div className="font-bold text-streamlineBlue text-[18px] pt-[4px]"
              ref={coachInfoDivRef}>
                  <div>
                  Head Coach Information
                  </div>
                  {isMissingCoachInfo &&
                  <div className="text-red-500 text-[15px]">
                    Please ensure you have completed all the fields in this section
                  </div>}
              </div>}
              
              <ProfileEntryEditor
              prompt={"Head coach full name"}
              response={headCoachName}
              setResponse={setHeadCoachName}
              placeholder={"Coach Name"}
              isLong={false}
              />

              <ProfileEntryEditor
              prompt={"Head coach bio"}
              response={headCoachBio}
              setResponse={setHeadCoachBio}
              placeholder={"Talk about the head coach's experiences, history, fun facts, etc..."}
              isLong={true}
              />

              <MultiFieldPhoneEntry
              prompt={"Head coach phone #"}
              placeholder={'Phone #'}
              fieldResponse={coachNumber}
              setFieldResponse={setCoachNumber}
              field={'phoneNumber'}
              customLength={"w-[180px]"}/>

              <ProfileEntryEditor
              prompt={"Head coach Email (optional)"}
              response={coachEmail}
              setResponse={setCoachEmail}
              placeholder={"Email address"}
              isLong={false}/>

              <ImageUploader allowMultiple={false} images={coachImg} setImages={setCoachImg} prompt={"Head Coach Photo"}
              buttonMessage={
                  coachImg.length!=0?"Replace Head Coach Photo":"Upload Head Coach Photo"}/>

        </>
    )
}