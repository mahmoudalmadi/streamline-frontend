

const removeJsonByField = ({fieldName,fieldValue,setter,jsonList}) => {
    const updatedData = jsonList.filter((item) => item[fieldName] !== fieldValue);
    setter(updatedData);
  };

export const editJsonById = ({fieldName,fieldValue,setter,jsonList,id}) => {
  const updatedData = jsonList.map((item) =>
  item.id === id ? { ...item, [fieldName]: fieldValue } : item
  );
  setter(updatedData);
};

export const appendToJsonSubListById = ({ fieldMappings, setter, jsonList, id }) => {
  const updatedData = jsonList.map((item) =>
   item.id === id
      ? {
          ...item,
          ...Object.fromEntries(
            Object.entries(fieldMappings).map(([fieldName, fieldValue]) => [
              fieldName,
              Array.isArray(item[fieldName]) // Handle appending to lists
                ? [...item[fieldName], ...fieldValue]
                : typeof item[fieldName] === 'number' // Handle numeric addition
                ? item[fieldName] + fieldValue
                : Array.isArray(fieldValue) // Initialize a list if fieldValue is a list
                ? [...fieldValue]
                : [...fieldValue], // Default: Replace or initialize the field
            ])
          ),
        }
    : item
  );
  setter(updatedData);
};


export default removeJsonByField