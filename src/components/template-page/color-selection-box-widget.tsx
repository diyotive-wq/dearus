"use client";

import { Color } from "@/app/[slug]/models/couples";
import { useEffect, useState } from "react";
import FormField from "../form/components/page";
import { FormType } from "../form/models/formtype";
import { usePathname, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import getClientSession from "@/hooks/getClientSession";
import ConfirmationDialog, {
  ConfirmationDialogProps,
  ConfirmationDialogState,
} from "../confirmation-dialog-widget/confirmation-dialog";

export default function ColorSelectionBoxWidget({
  data,
  onChange,
  onCheckAuthentication,
}: {
  data: Color[];
  onChange?: (value: Color) => void;
  onCheckAuthentication?: (value: ConfirmationDialogProps | null) => void;
}) {
  const [showBox, setShowBox] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // ✅ ambil control dari context react-hook-form
  const { setValue, control, watch } = useFormContext();

  // ✅ default color
  useEffect(() => {
    if (data?.length > 0) {
      setValue("color", data[0], { shouldValidate: true });
    }
  }, [data, setValue]);

  // ✅ observe perubahan value color
  const selectedColor = watch("color");

  useEffect(() => {
    if (selectedColor && onChange) {
      onChange(selectedColor);
    }
  }, [selectedColor, onChange]);

  return (
    <div className="fixed w-3/4 sm:w-1/2 md:w-1/4 z-80 bottom-5 right-5 flex justify-end">
      {showBox ? (
        <div className="flex flex-col w-full bg-white rounded-xl p-4 shadow-[0_0_8px_rgba(0,0,0,0.2)]">
          <FormField
            control={control}
            name="color"
            fullWidth={true}
            formType={FormType.ColorSelection}
            title="Theme That Available"
            itemsColor={data}
          />
          <div className="mt-4"></div>
          <div className="flex flex-row gap-2 sm:gap-4 justify-between text-xs sm:text-sm">
            <button
              type="button"
              className="rounded-xl bg-white border-[1.5px] border-[var(--color-primary)] py-2 px-1 sm:px-2 w-full cursor-pointer text-[var(--color-primary)] font-semibold"
              onClick={() => setShowBox(!showBox)}
            >
              Hide Box
            </button>

            <button
              type="button"
              className="rounded-xl text-white bg-[var(--color-primary)] py-2 px-1 sm:px-2 w-full cursor-pointer font-semibold"
              onClick={() => {
                getClientSession().then((isAuthenticated) => {
                  if (isAuthenticated) {
                    window.open(`${pathname}/form-template`, "_blank");
                  } else {
                    onCheckAuthentication?.({
                      state: ConfirmationDialogState.isAsking,
                      message: "In order to create this invitation template, you need to login first",
                      onConfirm: () => {
                        router.push("/login");
                      },
                      onCancel: () => {
                        onCheckAuthentication(null);
                      },
                    });
                  }
                });
              }}
            >
              Select Template
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="rounded-full text-xs sm:text-sm text-[var(--color-primary)] py-2 px-4 shadow-[0_0_8px_rgba(0,0,0,0.2)] cursor-pointer bg-white font-semibold"
          onClick={() => setShowBox(!showBox)}
        >
          Open Here
        </button>
      )}
    </div>
  );
}
