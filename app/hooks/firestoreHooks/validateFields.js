const validateFields = ({data, isGuardian}) => {
  for (const [key, value] of Object.entries(data)) {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    ) {
      if (isGuardian && key === "dateOfBirth") {
        // Skip validation for dateOfBirth if isGuardian is true
      } else {
        console.log(key,value)
        throw new Error(`Invalid value for field "${key}": Cannot be null, undefined, an empty string, or an empty array`);
      }
    }
  }
};

export default validateFields;