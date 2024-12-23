"use client";
import EditableInfoSection from "../EditableInfoSection";
import { useState } from "react";
import DisplayLocationInfo from "../InfoDisplayWrappers/DisplayLocationInfo";
import LocationInfoWrapper from "../EditorWrappers/LocationInfoWrapper";

export default function ViewLocationInfo({locationsInfo, retrievedAmenities,setRetrievedAmenities}){

    const [address, setAddress] = useState(locationsInfo.address)
  const [coords, setCoords] = useState(locationsInfo.longitude!="na"?{"lng":locationsInfo.longitude,"lat":locationsInfo.latitude}:null)
  const [streetAddress,setStreetAddress]=useState(locationsInfo.parsedAddress.streetAddress ? locationsInfo.parsedAddress.streetAddress : "")
  const [city,setCity]=useState(locationsInfo.parsedAddress.city ? locationsInfo.parsedAddress.city : "")
  const [postalCode,setPostalCode]=useState(locationsInfo.parsedAddress.postalCode ? locationsInfo.parsedAddress.postalCode : "")
  const [country,setCountry]=useState(locationsInfo.parsedAddress.country ? locationsInfo.parsedAddress.country : "")
  const [province,setProvince]=useState(locationsInfo.parsedAddress.state ? locationsInfo.parsedAddress.state : "")

  const [locationImgs,setLocationImgs]=useState(locationsInfo.images)
  const defaulAmenitiesList = retrievedAmenities;

    return(

        <>

<EditableInfoSection EditableInfoWrapper={LocationInfoWrapper} GeneralInfoDisplayWrapper={DisplayLocationInfo} 
      fields={{
        "address":address,
        "setAddress":setAddress,
        "setCoords":setCoords,
        "setCity":setCity,
        "setProvince":setProvince,
        "coords":coords,
        "city":city,
        "province":province,
        "setCountry":setCountry,
        country:country,
        streetAddress:streetAddress,
        setStreetAddress:setStreetAddress,
        locationImgs:locationImgs,
        setLocationImgs:setLocationImgs,
        selectedAmenities:retrievedAmenities,
        setSelectedAmenities:setRetrievedAmenities,
        noHeader:true
        }
      }
      displayFields={{
        parsedAddress:{
          streetAddress:streetAddress,
          city:city,
          postalCode:postalCode,
          country:country,
          state:province,
        },
        locationImages:locationImgs,
        amenitiesList:retrievedAmenities
      }}
      editButtonText={"Edit location info/image"} 
      savingDefaultValuesOnCancel={
        [
          {streetAddress:locationsInfo.parsedAddress.streetAddress ? locationsInfo.parsedAddress.streetAddress : "",
          setStreetAddress:setStreetAddress
          },
          {
            city:locationsInfo.parsedAddress.city ? locationsInfo.parsedAddress.city : "",
            setCity:setCity
          },
          {
            postalCode:locationsInfo.parsedAddress.postalCode ? locationsInfo.parsedAddress.postalCode : "",
            setPostalCode:setPostalCode
          },
          {
            country:locationsInfo.parsedAddress.country ? locationsInfo.parsedAddress.country : "", setCountry:setCountry            
          },
          {
            province:locationsInfo.parsedAddress.state ? locationsInfo.parsedAddress.state : "",setProvince:setProvince
          },{
            address:locationsInfo.address,setAddress:setAddress
          },
          {locationImgs:locationsInfo.image,setLocationImgs},
          {retrievedAmenities:defaulAmenitiesList,setRetrievedAmenities}
        ]
    }
    allStatesJson={
        {streetAddress:streetAddress,
        city:city,province:province,country:country,postalCode:postalCode,locationImgs,
        retrievedAmenities:retrievedAmenities

        }}
    headerText={"Location Info"}
    />


        </>

    )
}