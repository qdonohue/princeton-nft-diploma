import { useRouter } from "next/router";
import { useState } from "react";
import Metamask from "../../components/crypto/Metamask";
import FormManager from "../../components/registration/FormManager";
import NFTForm from "../../components/registration/NFTForm";
import NFTtransfer from "../../components/registration/NFTtransfer";
import { ProgressBar } from "../../components/registration/ProgressBar";
import { NftType } from "../../components/registration/types";

import { DEFAULT_NFT_IMAGE, SIGNUP_STEP } from "../../util/constants";

const CreatePage = () => {
  const [step, setStep] = useState(SIGNUP_STEP.METAMASK);
  const [wallet, setWallet] = useState("");
  const [userData, setUserData] = useState<NftType>({});
  const [imgFile, setImgFile] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");
  const router = useRouter();
  const { session } = router.query;

  const metamaskAdvance = (address: string) => {
    setWallet(address);
    setStep(SIGNUP_STEP.NFT);
  };

  const nftAdvance = (user: NftType, image: File | null, img: string) => {
    setUserData(user);
    setImgUrl(img);
    if (image) {
      setImgFile(image);
    }
    setStep(SIGNUP_STEP.CONFIRM);
  };

  const mintNft = async () => {
    let data = new FormData();
    if (imgFile) {
      data.append("file", imgFile);
    } else {
      const defaultImage = await fetch(DEFAULT_NFT_IMAGE);
      const defaultImageBlob = await defaultImage.blob();
      data.append("file", defaultImageBlob);
    }
    data.append("metadata", JSON.stringify(userData));
    data.append("session", JSON.stringify(session));
    data.append("address", wallet);

    const resp = await fetch("/api/mint", {
      body: data,
      method: "POST",
    });

    console.log(resp);
  };

  return (
    <div className="w-screen h-screen ">
      <div className="p-2 bg-linen mx-auto my-auto h-full pb-18 flex flex-col justify-start items-center">
        {step === SIGNUP_STEP.METAMASK && (
          <Metamask advance={metamaskAdvance} />
        )}
        {step === SIGNUP_STEP.NFT && <FormManager advance={nftAdvance} />}
        {step === SIGNUP_STEP.CONFIRM && (
          <NFTtransfer
            wallet={wallet}
            userData={userData}
            imageUrl={imgUrl}
            mint={mintNft}
          />
        )}
      </div>
      <div className="fixed bottom-0 inset-x-0 white-800">
        <ProgressBar step={step} setStep={setStep} />
      </div>
    </div>
  );
};

export default CreatePage;
