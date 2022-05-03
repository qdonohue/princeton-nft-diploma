// environment variables
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { API_URL, PUBLIC_KEY, PRIVATE_KEY } from "./constants";

// import constants
const contractAddress = "0x505d099061f160cc84689d347df11a7d9e59df51";

// get NFT contract
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../crypto/artifacts/contracts/nft-diploma.sol/NFTDiplomas.json");
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// mintNFT(recipient, "ipfs://QmZrJZMRPhaKa5MnioJKLYaDifVbYBrqxQDk8iMCUC6Pfd");
export default async function mintNFT(recipient, tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFTDiploma(recipient, tokenURI).encodeABI(),
  };

  try {
    // sign the transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const result = signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
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
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
