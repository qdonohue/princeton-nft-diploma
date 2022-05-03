/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from "@heroicons/react/solid";

import { SIGNUP_STEP, STAGE_STATUS, stepToStatus } from "../../util/constants";

const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

export const ProgressBar = ({ step, setStep }: { step: any; setStep: any }) => {
  const steps = [
    {
      id: SIGNUP_STEP.METAMASK,
      name: "Connect your wallet",
      description: "Use Metamask to register your Ethereum wallet",
      status: stepToStatus(step, SIGNUP_STEP.METAMASK),
    },
    {
      id: SIGNUP_STEP.NFT,
      name: "Diploma Customization",
      description: "Customize your NFT Diploma",
      status: stepToStatus(step, SIGNUP_STEP.NFT),
    },
    {
      id: SIGNUP_STEP.CONFIRM,
      name: "Preview",
      description: "Approve and mint your NFT",
      status: stepToStatus(step, SIGNUP_STEP.CONFIRM),
    },
  ];

  return (
    <div className="lg:border-t lg:border-b lg:border-gray-200 h-18">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Progress"
      >
        <ol
          role="list"
          className="rounded-md overflow-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200 lg:rounded-none"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.id} className="relative overflow-hidden lg:flex-1">
              <div
                className={classNames(
                  stepIdx === 0 ? "border-b-0 rounded-t-md" : "",
                  stepIdx === steps.length - 1 ? "border-t-0 rounded-b-md" : "",
                  "border border-gray-200 overflow-hidden lg:border-0"
                )}
              >
                {step.status === STAGE_STATUS.COMPLETE ? (
                  <div
                    className="group cursor-pointer"
                    onClick={() => {
                      setStep(step.id);
                    }}
                  >
                    <span
                      className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "px-6 py-5 flex items-start text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="w-10 h-10 flex items-center justify-center bg-princeton rounded-full">
                          <CheckIcon
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span className="text-xs font-semibold tracking-wide uppercase">
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </div>
                ) : step.status === STAGE_STATUS.CURRENT ? (
                  <div aria-current="step">
                    <span
                      className="absolute top-0 left-0 w-1 h-full bg-princeton lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "px-6 py-5 flex items-start text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="w-10 h-10 flex items-center justify-center border-2 text-princeton rounded-full">
                          <span className="text-princeton">{step.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span className="text-xs font-semibold text-princeton tracking-wide uppercase">
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="group">
                    <span
                      className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "px-6 py-5 flex items-start text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                          <span className="text-white">{step.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span className="text-xs font-semibold text-white tracking-wide uppercase">
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </div>
                )}

                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div
                      className="hidden absolute top-0 left-0 w-3 inset-0 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
