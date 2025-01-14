import { useEffect, useState } from "react"
import EditableInfoSection from "../EditableInfoSection"
import HeadCoachWrapper from "../EditorWrappers/HeadCoachWrapper"
import DisplayCoachInfo from "../InfoDisplayWrappers/DisplayCoachInfo"

export default function ViewCoachInfo({coachInfo}){

    const [coachPhoto,setCoachPhoto]=useState(coachInfo.coachPhoto) //PENDING CHECJIUBG PROGRAMS INFO
    const [coachName,setCoachName]=useState(coachInfo.coachName)
    const [coachDescription,setCoachDescription]=useState(coachInfo.coachDescription)
    const [coachEntryId,setCoachEntryId]=useState(coachInfo.id)
    const [defaultCoachPhoto,setDefaultCoachPhoto]=useState(coachInfo.coachPhoto) //PENDING CHECJIUBG PROGRAMS INFO
    const [defaultCoachName,setDefaultCoachName]=useState(coachInfo.coachName)
    const [defaultCoachEmail,setDefaultCoachEmail]=useState(coachInfo.coachEmail)
    const [defaultCoachDescription,setDefaultCoachDescription]=useState(coachInfo.coachDescription)



    return(
        <>

    <EditableInfoSection 
    EditableInfoWrapper={HeadCoachWrapper} GeneralInfoDisplayWrapper={DisplayCoachInfo} 
      fields={{
        headCoachBio:coachDescription,
        headCoachName:coachName,
        setHeadCoachName:setCoachName,
        setHeadCoachBio:setCoachDescription,
        coachImg:coachPhoto,
        setCoachImg:setCoachPhoto,
        noHeader:true
        }
      }
      displayFields={{
        coachPhoto:coachPhoto[0].url,
        coachName:coachName,
        coachBio:coachDescription
      }}
      editButtonText={"coach info"} 
      savingDefaultValuesOnCancel={
        [
          {value:defaultCoachDescription,
          setter:setCoachDescription
          },
          {
            value:defaultCoachName,
            setter:setCoachName
          },
          {
            value:defaultCoachPhoto,
            setter:setDefaultCoachName
          }
        ]
    }
    toUpdateDefaultsOnSave={
        [
        {value:coachDescription,setter:setDefaultCoachDescription},
        {value:coachName,setter:setDefaultCoachName},
        {value:coachPhoto,setter:setDefaultCoachPhoto},
        ]
    }
    allStatesJson={
        {coachDescription:coachDescription,
        coachName:coachName,
        coachPhoto:coachPhoto
        }}
    headerText={"Coach Info"}
    onEdit={async()=>{

        try{

        

        if(coachPhoto != defaultCoachPhoto){
          await deleteS3Objects({urls:[defaultCoachPhoto]})
          const desiredURLs = await uploadImagesToS3({files:[coachPhoto[0].url],s3Uri:"s3://streamlineplatform/coachPhotos/"})
          await editingMatchingEntriesByAllFields({collectionName:"Coach",matchParams:{id:coachEntryId},
          updateData:{
          coachName:coachName,
          coachBio:coachDescription,
          photoUrl:desiredURLs[0],
          editTimestamp:new Date()}})
        }else{
          await editingMatchingEntriesByAllFields({collectionName:"Coach",matchParams:{id:coachEntryId},
          updateData:{
          coachName:coachName,
          coachBio:coachDescription,
          editTimestamp:new Date()}})
        }

    }catch(error)
    {
        console.log(error)
    }
    }
    }
    />


        </>
    )
}