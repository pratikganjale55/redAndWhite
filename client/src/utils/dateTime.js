export const getCurrentDateTime = () => {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
     const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
    const timeString = currentDate.toLocaleTimeString("en-US", options);
    return `${dateString} ${timeString}`;
  };