import { NftType } from "../registration/types";

const lineContent = "col-span-2 font-light text-white";
const messageContent =
  "col-span-2 font-light whitespace-normal break-all text-white pr-24";

const labelStyling = "font-bold text-left pl-2 col-span-1 text-white";

const NftMetaData = ({ name, major, year, message }: NftType) => (
  <div className="w-2/5 grid place-items-center">
    <div className=" h-full grid grid-cols-3 place-content-start space-y-2">
      <div className="col-span-3 pl-2 text-4xl text-center text-white pb-4">
        NFT Data
      </div>
      <div className={labelStyling}>{"Name:"}</div>
      <div className={lineContent + ""}>{name}</div>
      <div className={labelStyling}>{"Major:"}</div>
      <div className={lineContent}>{major}</div>
      <div className={labelStyling}>{"Year:"}</div>
      <div className={lineContent}>{year}</div>
      <div className={labelStyling}>{"Message:"}</div>
      <div className={messageContent}>{message}</div>
    </div>
  </div>
);

const NFTsummary = ({ nft, img }: { img: string } & { nft: NftType }) => {
  return (
    <div className="w-full h-1/4 mt-40 flex flex-row justify-center items-center space-x-4">
      <NftMetaData {...nft} />
      <img src={img} className="w-2/5 aspect-h-1 rounded-lg" />
    </div>
  );
};

export default NFTsummary;
