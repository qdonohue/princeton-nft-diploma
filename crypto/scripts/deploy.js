async function main() {
  const NFTDiplomaFactory = await ethers.getContractFactory("NFTDiplomas");

  // Start deployment, returning a promise that resolves to a contract object
  const NFTDiplomas = await NFTDiplomaFactory.deploy();
  await NFTDiplomas.deployed();
  console.log("Contract deployed to address:", NFTDiplomas.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
