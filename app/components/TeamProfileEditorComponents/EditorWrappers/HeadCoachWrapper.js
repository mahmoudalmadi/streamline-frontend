import ProfileEntryEditor from "../ProfileEntryEditor"
import ImageUploader from "../ImageUploader"

export default function HeadCoachWrapper({coachInfoDivRef,isMissingCoachInfo,headCoachBio,setHeadCoachBio,headCoachName,setHeadCoachName,coachImg,setCoachImg,noHeader}){

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
              prompt={"Head Coach Name"}
              response={headCoachName}
              setResponse={setHeadCoachName}
              placeholder={"Coach Name"}
              isLong={false}
              />

              <ProfileEntryEditor
              prompt={"Head Coach Bio"}
              response={headCoachBio}
              setResponse={setHeadCoachBio}
              placeholder={"Talk about the head coach's experiences, history, fun facts, etc..."}
              isLong={true}
              />

              <ImageUploader allowMultiple={false} images={coachImg} setImages={setCoachImg} prompt={"Head Coach Photo"}
              buttonMessage={
                  coachImg.length!=0?"Replace Head Coach Photo":"Upload Head Coach Photo"}/>

        </>
    )
}