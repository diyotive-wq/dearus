import Image from "next/image";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export type ConfirmationDialogProps = {
  state: ConfirmationDialogState;
  message?: string | null;
  successMessage?: string | null;
  errorMessage?: string | null;
  onConfirm?: () => void;
  onCancel?: () => void;
  onTapOutSide?: () => void;
  onResult?: () => void;
  onResultTitle?: string;
};

export enum ConfirmationDialogState {
  isLoading,
  isSuccess,
  isError,
  isAsking,
}
export default function ConfirmationDialog({
  state,
  message,
  onConfirm,
  successMessage,
  errorMessage,
  onCancel,
  onResult,
  onTapOutSide,
  onResultTitle,
}: ConfirmationDialogProps) {
  return (
    <>
      <div
        className="fixed w-full h-screen bg-black/50 z-100 flex justify-center items-center"
        onClick={onTapOutSide}
      >
        <div
          className={`flex flex-col w-3/4 sm:w-1/2 bg-white rounded-xl p-6  ${
            state === ConfirmationDialogState.isAsking
              ? "justify-between"
              : "justify-center"
          } items-center`}
        >
          {state === ConfirmationDialogState.isLoading ? (
            <>
              <div className="w-3/4 aspect-[16/4.5] relative animate-[blink_1s_infinite]">
                <Image src="/assets/icons/logo.png" fill alt="Logo" />
              </div>
              <div className="text-sm sm:text-3xl font-semibold animate-[blink_1s_infinite] text-[var(--color-primary)]">
                Please Wait...
              </div>
            </>
          ) : state === ConfirmationDialogState.isAsking ? (
            <>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-[var(--color-primary)]">
                WARNING
              </h1>
              <p className="text-xs font-medium text-black mt-6 text-center sm:text-sm md:text-base">
                {message ?? "Are You Sure Want to Input This Data?"}
              </p>
              <div className="flex w-full flex-row gap-4 mt-9 justify-between">
                <button
                  className="rounded-lg bg-white border-[1.5px] font-semibold p-2 w-full cursor-pointer text-sm sm:text-base border-[var(--color-primary)] text-[var(--color-primary)]"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg text-white p-2 w-full cursor-pointer font-semibold text-sm sm:text-base bg-[var(--color-primary)]"
                  onClick={onConfirm}
                >
                  Yes
                </button>
              </div>
            </>
          ) : (
            <>
              {state === ConfirmationDialogState.isSuccess ? (
                <AiOutlineCheckCircle className="text-green-600 w-1/5 h-auto" />
              ) : (
                <AiOutlineCloseCircle className="text-red-600 w-1/5 h-auto" />
              )}
              <h1
                className={`text-sm md:text-xl sm:text-lg font-semibold mt-2 sm:mt-4 ${
                  state === ConfirmationDialogState.isSuccess
                    ? "text-green-600"
                    : "text-red-600"
                } text-center`}
              >
                {state === ConfirmationDialogState.isSuccess
                  ? successMessage ?? "Your Action Has Been Success"
                  : errorMessage ?? "Your Action Has Been Failed"}
              </h1>
              <p className="text-xs font-medium mt-4 sm:mt-6 text-center sm:text-sm md:text-base cursor-pointer text-gray-600">
                {message ?? "Are You Sure Want to Input This Data?"}
              </p>

              {onResult && (
                <button
                  className="mt-2 rounded-lg text-white p-2 w-full cursor-pointer font-semibold text-sm sm:text-base bg-[var(--color-primary)]"
                  onClick={onResult}
                >
                  {onResultTitle ?? "Click Here"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
