// environment variables
const API_URL = process.env.API_URL!;
const PUBLIC_KEY = process.env.PUBLIC_KEY!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

// import constants
const {
  createAlchemyWeb3,
} = require("../crypto/node_modules/@alch/alchemy-web3");
const contractAddress = "0x505d099061f160cc84689d347df11a7d9e59df51";

// get NFT contract
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../crypto/artifacts/contracts/nft-diploma.sol/NFTDiplomas.json");
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// mintNFT(recipient, "ipfs://QmZrJZMRPhaKa5MnioJKLYaDifVbYBrqxQDk8iMCUC6Pfd");
export default async function mintNFT(recipient: any, tokenURI: string) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFTDiploma(recipient, tokenURI).encodeABI(),
  };

  // sign the transaction
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx: { rawTransaction: any }) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction!,
        function (err: any, hash: any) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err: any) => {
      console.log(" Promise failed:", err);
    });
}
