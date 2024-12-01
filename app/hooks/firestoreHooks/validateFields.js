

const validateFields = ({data, isGuardian}) => {
    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
        if(isGuardian && key==="dateOfBirth"){
        }else{
        throw new Error(`Invalid value for field "${key}": Cannot be null, undefined, or an empty string`);
        }
      }
    }
  };

export default validateFields;