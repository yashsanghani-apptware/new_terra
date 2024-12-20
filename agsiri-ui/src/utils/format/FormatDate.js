export const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };