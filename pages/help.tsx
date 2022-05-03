const HelpPage = () => (
  <div className="h-screen w-full px-12 text-white text-2xl grid place-items-center bg-independence">
    {`Congratulations on minting your NFT Diploma! You will soon be able to view your NFT through MetaMask Mobile. It takes time for the transaction to settle on the blockchain, so you might not see your diploma for a couple minutes.`}
    <br />
    <br />
    {`Step 1 - Wait for the transaction to complete and retrieve your NFT ID:  A collectible's ID is a unique identifier since no two NFTs are alike. You can view your transaction in your wallet, when the transaction is complete, search for: “For ERC-721 Token ID”. Your NFT ID is to the right of this field.\
`}
    <br />
    <br />
    {`Step 2: In MetaMask Mobile, tap on the 'NFTs' tab, scroll down, and tap on the "+ ADD NFTs" link. Paste your wallet’s public address from your clipboard into the "Address" box. Note that you can’t view the physical copy of your NFT through Metamask on your browser.\
`}
    <br />
    <br />
    {`Step 3:  Paste the NFT ID into the box marked "ID" in MetaMask Mobile, tap on the "ADD" button, and your NFT should appear under the NFTs tab.`}
  </div>
);

export default HelpPage;
