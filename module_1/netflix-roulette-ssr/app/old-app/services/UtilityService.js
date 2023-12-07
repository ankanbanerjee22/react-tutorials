export const ConvertMinutesToHoursAndMinutes = (minutes) => {
    if (typeof minutes !== 'number' || minutes < 0) {
      return 'Invalid input';
    }
  
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
}
  

  