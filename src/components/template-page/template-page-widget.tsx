"use client";

import { Color, Couples } from "@/app/[slug]/models/couples";
import { TemplateDetailModel } from "@/app/invitation-service/models/template-detail-model";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BloomTemplatePage from "./bloom/page";
import ColorSelectionBoxWidget from "./color-selection-box-widget";
import ConfirmationDialog, { ConfirmationDialogProps } from "../confirmation-dialog-widget/confirmation-dialog";

export default function TemplatePageWidget({
  data,
}: {
  data: TemplateDetailModel | null;
}) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    data?.colors ? data.colors[0] : null,
  );

  const methods = useForm();

  const [confitmationProps, setConfitmationProps] =
    useState<ConfirmationDialogProps | null>(null);

  if (data?.template_name === "Bloom") {
    const coupleTempData: Couples = {
      male_bride: null,
      female_bride: null,
      header_image: null,
      link_maps: null,
      date: null,
      address: null,
      url_name: null,
      color: selectedColor,
    };

    return (
      <div>
        {confitmationProps && <ConfirmationDialog {...confitmationProps} />}
        <BloomTemplatePage data={coupleTempData} />

        {/* ✅ Bungkus form pake FormProvider dari react-hook-form */}
        <FormProvider {...methods}>
          <form>
            <ColorSelectionBoxWidget
              data={data?.colors ?? []}
              onChange={(data) => setSelectedColor(data)}
              onCheckAuthentication={(data) => setConfitmationProps(data)}
            />
          </form>
        </FormProvider>
      </div>
    );
  }

  return null;
}
