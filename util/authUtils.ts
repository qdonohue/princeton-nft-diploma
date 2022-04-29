export const validateParser = (data: string) => {
  // return "qdonohue";
  if (data.substring(0, 2) === "no") {
    return null;
  } else {
    const seperated = data.split("\n");
    console.log(seperated);
    return seperated[1];
  }
};

export const randomSession = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
