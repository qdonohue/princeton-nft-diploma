//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTDiplomas is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    event NftBought(address _seller, address _buyer, uint256 _price);
    mapping (uint256 => uint256) public tokenIdToPrice;
    address public immutable commissionWallet = 0xe084c82feBadE301FEb71602dCf23fA2b98cF3bd; // need to hardcode our commissionWallet here

    constructor() ERC721("NFTDiplomas", "DQNFT") {}

    // can we restrict this only to our API?
    function mintNFTDiploma(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function allowBuy(uint256 _tokenId, uint256 _price) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        require(_price > 0, 'Price is zero, NFT Diploma needs to have a value');
        tokenIdToPrice[_tokenId] = _price;
    }

    function disallowBuy(uint256 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        tokenIdToPrice[_tokenId] = 0;
    }
    
    function buy(uint256 _tokenId) external payable {
        uint256 price = tokenIdToPrice[_tokenId];
        require(price > 0, 'The NFT Diploma is not for sale');
        require(msg.value == price, 'Incorrect value');
        
        address seller = ownerOf(_tokenId);
        _transfer(seller, msg.sender, _tokenId);

        tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        payable(commissionWallet).transfer(msg.value * 2 / 100); // transfer ETH to commission account
        payable(seller).transfer(msg.value * 98 / 100); // send the remaining ETH to the seller

        emit NftBought(seller, msg.sender, msg.value);
    }
}