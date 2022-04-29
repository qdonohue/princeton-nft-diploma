export const validateParser = (data: string) => {
  if (data.substring(0, 1) === "no") {
    return null;
  } else {
    const seperated = data.split(" ");
    return seperated[2];
  }
};
