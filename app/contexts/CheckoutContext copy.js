import { createContext, useContext, useState } from 'react';

const SearchLocationsContext = createContext(null);

export const SearchLocationsPovider = ({ children }) => {
  
  const [selectedCities,setSelectedCities]=useState([]);
  const [selectedLessonTypes,setSelectedLessonTypes]=useState([])
  const [selectedSkillLevels,setSelectedSkillLevels]=useState([])
  const [selectedHoursOfOps,setSelectedHoursOfOps]=useState({"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[],"Saturday":[],"Sunday":[]})
  const [setMinPrice,setMaxPrice]=useState(useState([]));

  return (
    <SearchLocationsContext.Provider value={{  }}>
      {children}
    </SearchLocationsContext.Provider>
  );
};

export const useCheckout = () => useContext(SearchLocationsContext);
