import { useEffect, useState } from "react"
import EditableInfoSection from "../TeamProfileEditorComponents/EditableInfoSection"
import { editingMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/editingEntryByAllFields"
import { useAuth } from "@/app/contexts/AuthContext"
import UserEditorWrapper from "./UserEditorWrapper"
import DisplayUserInfo from "./DisplayUserInfo"
import { deleteMatchingEntriesByAllFields } from "@/app/hooks/firestoreHooks/editing/deleteEntriesByMatchingFields"
import { addAccountDependants } from "@/app/hooks/firestoreHooks/createAccount"

export default function ViewUserInfo({accountId, userEmail,setUserEmail,userName,setUserName,userPhone,setUserPhone,otherAthletes,setOtherAthletes}){

    const {user,userData} = useAuth()

    const [defaultUserEmail,setDefaultUserEmail]=useState(userEmail)
    const [defaultUserName,setDefaultUserName]=useState(userName)
    const [defaultUserPhone,setDefaultUserPhone]=useState({
        "phoneNumber":userPhone.phoneNumber,"isValid":true
    })
    const [defaultOtherAthletes,setDefaultOtherAthletes]=useState(otherAthletes)

    console.log("USER INFO VIEW",userName)
    console.log("USER INFO VIEW",userEmail)

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
        accountHolderEmailAddress:userEmail,
        setAccountHolderEmailAddress:setUserEmail,
        accountFullName:userName,
        setAccountFullName:setUserName,
        accountPhoneNumber:userPhone,
        setAccountPhoneNumber:setUserPhone,
        otherAthletes:otherAthletes,
        setOtherAthletes:setOtherAthletes
        }
      }
      displayFields={{
        accountFullName:userName,
        accountEmailAddress:userEmail,
        accountPhoneNumber:userPhone.phoneNumber,
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

          await editingMatchingEntriesByAllFields({collectionName:"Account",matchParams:{id:accountId},
          updateData:{
          emailAddress:accountEmailAddress,
          fullName:userName,
          phoneNumber:userPhone.phoneNumber,
          editTimestamp:new Date()}})

          await deleteMatchingEntriesByAllFields({collectionName:"Account",matchParams:{accountFirebaseId:user.uid}})

          if(kids.length>1){
          await addAccountDependants({dependantsList:kids,firebaseId:user.uid})
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