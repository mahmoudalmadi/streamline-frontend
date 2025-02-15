
export function calculateAge(dateOfBirthTimestamp) {
    const dateOfBirth = dateOfBirthTimestamp.seconds ? new Date(dateOfBirthTimestamp.seconds*1000):new Date(dateOfBirthTimestamp)
    
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
  
    // Adjust for whether the birthday has passed this year
    const hasHadBirthdayThisYear =
      today.getMonth() > dateOfBirth.getMonth() ||
      (today.getMonth() === dateOfBirth.getMonth() &&
        today.getDate() >= dateOfBirth.getDate());
  
    if (!hasHadBirthdayThisYear) {
      age--;
    }
  
    return age;
  }

export  function formatEventTime({startTime, endTime}) {
    // Days of the week and months for formatting
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Extracting components for the start time
    if(startTime){const startDay = daysOfWeek[startTime.getDay()];
    const startMonth = months[startTime.getMonth()];
    const startDate = startTime.getDate();
  
    // Formatting hours and minutes for start and end time
    const formatTime = (date) => {
      const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const amPm = date.getHours() >= 12 ? "PM" : "AM";
      return `${hours}${minutes !== "00" ? `:${minutes}` : ""} ${amPm}`;
    };
  
    const startFormattedTime = formatTime(startTime);
    const endFormattedTime = formatTime(endTime);
  
    // Return formatted string
    return `${startDay}, ${startMonth} ${startDate} · ${startFormattedTime} –${endFormattedTime}`;}else{
        return ""
    }
}

export function subtractTime(start, amount, unit) {
  const newDate = new Date(start); // Clone the original date
  const now = new Date(); // Get the current time
  
  if (unit === "days") {
    newDate.setDate(newDate.getDate() - amount);
  } else if (unit === "hours") {
    newDate.setHours(newDate.getHours() - amount);
  } else {
    throw new Error("Invalid unit. Use 'days' or 'hours'.");
  }

  return newDate < now ? false : newDate;
}