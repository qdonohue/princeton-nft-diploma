import { useState } from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_NFT_IMAGE } from "../../util/constants";
import ImageUpload from "./ImageUpload";
import { NftType } from "./types";

const Label = ({ title }: { title: string }) => (
  <div className="">{title + ":"}</div>
);

const inputStyling =
  "ml-2 px-2 border rounded-lg drop-shadow-sm font-light active:border-slate-500";

const rowStyling = "flex flex-row font-light";

const NFTForm = ({
  advance,
}: {
  advance: (user: NftType, image: File | null) => void;
}) => {
  const { register, handleSubmit } = useForm();
  const [imageData, setImageData] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(DEFAULT_NFT_IMAGE);

  const onSubmit: any = (data: any) => {
    const userData = { ...data, image: imgUrl };
    advance(userData, imageData);
  };

  const changeImage = (f: File, s: string) => {
    setImgUrl(s);
    setImageData(f);
  };

  return (
    <>
      <div className="w-fit border rounded-lg border-slate-500 m-2 p-2">
        <div className="text-xl">NFT preview</div>
        <div className="text-sm font-light">
          All values will be publically visible on your NFT.
        </div>
        <hr className="pb-1" />
        <ImageUpload setImageData={changeImage} img={imgUrl} />
        <div className="text-xs font-light text-center text-slate-500">
          Drag and drop to change the image.
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pl-2 divide-y divide-slate-300 space-y-2">
            <div className={rowStyling}>
              <Label title={"Name"} />
              <input
                type={"text"}
                id="name"
                {...register("name")}
                className={inputStyling}
              />
            </div>
            <div className={rowStyling}>
              <Label title={"Year"} />
              <input
                type={"text"}
                id="name"
                {...register("year")}
                className={inputStyling}
              />
            </div>
            <div className={rowStyling}>
              <Label title={"Major"} />
              <input
                type={"text"}
                id="name"
                {...register("major")}
                className={inputStyling}
              />
            </div>
            <div className={rowStyling + " flex-col"}>
              <Label title={"Message"} />
              <textarea
                placeholder="A description for your NFT diploma"
                rows={4}
                cols={50}
                id="name"
                {...register("message")}
                className={inputStyling + " p-2 mt-2 mr-2 text-sm ml-0"}
              />
            </div>
            <div className="w-full">
              <input
                type="submit"
                value="Confirm"
                className="text-left font-light border border-slate-400 mt-2 rounded-lg p-1 shadow-sm bg-slate-300 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NFTForm;
