"use client";

import { Controller, Control } from "react-hook-form";
import { Color } from "@/app/[slug]/models/couples";

type Props = {
  name: string;
  control: Control<any>;
  item?: Color[] | null;
  isRequired?: boolean | null;
  fullWidth?: boolean;
};

export default function ColorSelection({
  name,
  control,
  isRequired,
  item,
  fullWidth = false,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={{ required: isRequired ?? false }}
      render={({ field }) => (
        <div className="flex flex-wrap gap-4">
          {item && item.length > 0 ? (
            item.map((i, index) => {
              const isSelected = field.value?.theme === i.theme;
              return (
                <div
                  key={index}
                  onClick={() => field.onChange(i)}
                  className={`flex rounded-lg p-3 border gap-2 items-center cursor-pointer ${
                    isSelected ? "text-white" : ""
                  } ${fullWidth ? "w-full" : ""}`}
                  style={{
                    borderColor: i.primary,
                    background: isSelected ? i.primary : undefined,
                    color: !isSelected ? i.primary : undefined,
                  }}
                >
                  <div
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded-full"
                    style={{
                      background: i.primary,
                      border: isSelected ? "1px solid white" : undefined,
                    }}
                  ></div>
                  <div
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded-full"
                    style={{ background: i.secondary }}
                  ></div>
                  <div
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded-full"
                    style={{ background: i.tertiary }}
                  ></div>
                  {fullWidth && <div className="flex-grow" />}
                  <div className="ml-2 text-sm sm:text-base font-semibold">{i.theme}</div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500">No color items available.</div>
          )}
        </div>
      )}
    />
  );
}
