const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export default formatDate;
