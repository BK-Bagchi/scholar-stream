const formatText = (input) => {
  if (!input) return "";

  // Replace underscores and hyphens with spaces
  let refined = input.replace(/[_-]+/g, " ");

  // Convert to lowercase, then capitalize each word
  refined = refined
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return refined;
};

export default formatText;
