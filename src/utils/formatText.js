const formatText = (input) => {
  if (!input) return "";

  let refined = input.replace(/[_-]+/g, " ");
  refined = refined
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return refined;
};

export default formatText;
