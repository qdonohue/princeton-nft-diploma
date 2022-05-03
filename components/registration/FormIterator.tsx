import { useState } from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_NFT_IMAGE, FORM_STAGE } from "../../util/constants";
import ImageUpload from "./ImageUpload";
import { NftType } from "./types";

const inputStyling =
  "w-80 text-2xl text-center p-2 border rounded-lg drop-shadow-sm font-light active:border-slate-500";

const rowStyling = "flex flex-row font-light";

const FormIterator = ({
  advance,
  stage,
  nextEntry,
}: {
  advance: (user: NftType, image: File | null, img: string) => void;
  stage: number;
  nextEntry: () => void;
}) => {
  const { register, handleSubmit } = useForm();
  const [imageData, setImageData] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(DEFAULT_NFT_IMAGE);

  const onSubmit: any = (data: any) => {
    if (stage === FORM_STAGE.MESSAGE) {
      const userData = { ...data, image: imgUrl };
      advance(userData, imageData, imgUrl);
    } else {
      nextEntry();
    }
  };

  const changeImage = (f: File, s: string) => {
    setImgUrl(s);
    setImageData(f);
  };

  return (
    <div className="w-9/12 grid place-items-center">
      {stage === FORM_STAGE.IMAGE && (
        <ImageUpload setImageData={changeImage} img={imgUrl} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {stage === FORM_STAGE.NAME && (
          <div className={rowStyling}>
            <input
              type={"text"}
              id="name"
              placeholder="Preferred name?"
              {...register("name")}
              className={inputStyling}
            />
          </div>
        )}
        {stage === FORM_STAGE.YEAR && (
          <div className={rowStyling}>
            <input
              type={"text"}
              id="name"
              placeholder="Class year?"
              {...register("year")}
              className={inputStyling}
            />
          </div>
        )}
        {stage === FORM_STAGE.MAJOR && (
          <div className={rowStyling}>
            <input
              type={"text"}
              id="name"
              placeholder="Major?"
              {...register("major")}
              className={inputStyling}
            />
          </div>
        )}
        {stage === FORM_STAGE.MESSAGE && (
          <div className="flex flex-col justify-center items-center">
            <div className={rowStyling}>
              <textarea
                placeholder="A description for your NFT diploma"
                rows={4}
                cols={80}
                id="name"
                {...register("message")}
                className={inputStyling + " p-2 mt-2 mr-2 text-sm ml-0"}
              />
            </div>
            <div className="grid place-items-end">
              <input
                type="submit"
                value="Let's mint!"
                className="font-light border border-slate-400 mt-2 rounded-lg p-2 shadow-sm bg-slate-300 cursor-pointer"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormIterator;
