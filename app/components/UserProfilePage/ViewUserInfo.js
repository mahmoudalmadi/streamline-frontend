import { useEffect, useState } from "react"
import EditableInfoSection from "../TeamProfileEditorComponents/EditableInfoSection"
import { editingMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/editingEntryByAllFields"
import { useAuth } from "@/app/contexts/AuthContext"
import UserEditorWrapper from "./UserEditorWrapper"
import DisplayUserInfo from "./DisplayUserInfo"

export default function ViewUserInfo({userEmail,setUserEmail,userName,setUserName,userPhone,setUserPhone,otherAthletes,setOtherAthletes}){

    const {user,userData} = useAuth()

    const [defaultUserEmail,setDefaultUserEmail]=useState(userEmail)
    const [defaultUserName,setDefaultUserName]=useState(userName)
    const [defaultUserPhone,setDefaultUserPhone]=useState({
        "phoneNumber":userPhone.phoneNumber,"isValid":true
    })
    const [defaultOtherAthletes,setDefaultOtherAthletes]=useState(otherAthletes)


    return(
        <>

    <EditableInfoSection 
    daysOfWeekHook={()=>{
      if (userPhone.isValid==true){
        console.log("great")
      }else{
        throw new Error("Phone Number isn't right")
      }}}
    EditableInfoWrapper={UserEditorWrapper} GeneralInfoDisplayWrapper={DisplayUserInfo} 
      fields={{
        incompleteFieldsError:"IDKK??",
        accountHolderEmailAddress:userEmail,
        setAccountHolderEmailAddress:setUserEmail,
        accountFullName:userName,
        setAccountFullName:setUserName,
        accountPhoneNumber:setUserPhone,
        otherAthletes:otherAthletes,
        setOtherAthletes:setOtherAthletes
        }
      }
      displayFields={{
        accountFullName:userName,
        accountEmailAddress:userEmail,
        accountPhoneNumber:userPhone,
        otherAthletes:otherAthletes
      }}
      editButtonText={"account info"} 
      savingDefaultValuesOnCancel={
        [
          {value:defaultUserEmail,
          setter:setUserEmail
          },
          {
            value:defaultUserName,
            setter:setUserName
          },
          {
            value:defaultOtherAthletes,
            setter:setDefaultOtherAthletes
          },
          {
            value:defaultUserPhone.phoneNumber,
            setDict:setUserPhone,
            field:'phoneNumber'
          }
        ]
    }
    toUpdateDefaultsOnSave={
        [
        {value:userName,setter:setDefaultUserName},
        {value:userEmail,setter:setDefaultUserEmail},
        {value:otherAthletes,setter:setDefaultOtherAthletes},
        {value:userPhone,setDict:setDefaultUserPhone,field:'phoneNumber'},
        ]
    }
    allStatesJson={
        {userName:userName,
        userEmail:userEmail,
        userPhone:userPhone,
        otherAthletes:otherAthletes,
        }}
    headerText={"Account info"}
    // CURRENTLY OVER HERE
    onEdit={async()=>{

        try{

        if(coachPhoto != defaultCoachPhoto){
          await deleteS3Objects({urls:[defaultCoachPhoto]})
          const desiredURLs = await uploadImagesToS3({files:[coachPhoto[0].url],s3Uri:"s3://streamlineplatform/coachPhotos/"})
          await editingMatchingEntriesByAllFields({collectionName:"Coach",matchParams:{id:coachEntryId},
          updateData:{
          coachName:coachName,
          coachBio:coachDescription,
          coachEmail:coachEmail,
          coachPhone:coachPhone.phoneNumber,
          photoUrl:desiredURLs[0],
          editTimestamp:new Date()}})
        }else{
          
          await editingMatchingEntriesByAllFields({collectionName:"Coach",matchParams:{id:coachEntryId},
          updateData:{
          coachName:coachName,
          coachEmail:coachEmail,
          coachPhone:coachPhone.phoneNumber,
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