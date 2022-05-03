import {
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { FORM_STAGE } from "../../util/constants";
import FormIterator from "./FormIterator";
import { NftType } from "./types";

const Arrows = ({
  advance,
  stage,
}: {
  advance: (arg0: boolean) => void;
  stage: number;
}) => (
  <div className="w-fill h-fill mt-4 flex justify-between items-center cursor-pointer space-x-5">
    <ArrowNarrowLeftIcon
      onClick={() => advance(false)}
      className={"h-10 w-10 " + (stage ? " " : " hidden")}
    />
    <ArrowNarrowRightIcon
      onClick={() => advance(true)}
      className={"h-10 w-10 " + (stage != FORM_STAGE.MESSAGE ? " " : " hidden")}
    />
  </div>
);

const FormManager = ({
  advance,
}: {
  advance: (user: NftType, image: File | null, img: string) => void;
}) => {
  const [stage, setStage] = useState(0);

  const incrementStage = (forward: boolean) => {
    if (!forward && stage === FORM_STAGE.IMAGE) {
      return;
    } else if (forward && stage === FORM_STAGE.MESSAGE) {
      return;
    } else {
      setStage(forward ? stage + 1 : stage - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <FormIterator
        stage={stage}
        advance={advance}
        nextEntry={() => incrementStage(true)}
      />
      <Arrows advance={incrementStage} stage={stage} />
    </div>
  );
};

export default FormManager;
