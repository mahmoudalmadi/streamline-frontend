
export function calculateAge(dateOfBirthTimestamp) {
    const dateOfBirth = new Date(dateOfBirthTimestamp.seconds*1000)
    
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