const validateFields = ({data, isGuardian}) => {

  for (const [key, value] of Object.entries(data)) {
    
    if((key==="programTypes") || (key==="skillLevels")){
      try{
      for (const level in value)
      {
        validateFields({data:value[level]})
      }
    }
      catch(error){
        throw new Error(`Hi ,Invalid value for field "${key}" with value "${JSON.stringify(value)}": Cannot be null, undefined, an empty string, or an empty array`)
      }
    } else if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    ) {
      if ((isGuardian && key === "dateOfBirth") || (key === "longitude") || (key === "latitude")) {
        // Skip validation for dateOfBirth if isGuardian is true
      }
      else {
        console.log(key,value)
        throw new Error(`Invalid value for field "${key}" with value "${JSON.stringify(value)}": Cannot be null, undefined, an empty string, or an empty array`);
      }
    }
  }
};

export default validateFields;