export const validateParser = (data: string) => {
  if (data.substring(0, 2) === "no") {
    return null;
  } else {
    const seperated = data.split(" ");
    return seperated[1];
  }
};
