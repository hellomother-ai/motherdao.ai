/**
 * Adds a time string in hh:mm format to a date object
 */
export const addTimeToDate = (date = new Date(), time = "00:00") => {
  // Extract the day, month, and year from the date
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  // Get the time as a string in the format "HH:MM"
  const [hours, minutes] = time.split(":");

  // Create a new Date object with the current date and the specified time
  return new Date(year, month, day, Number(hours), Number(minutes));
};
