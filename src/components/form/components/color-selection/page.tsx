import { Color } from "@/app/[slug]/models/couples";

export default function ColorSelection({
  item,
  value,
  onChange,
}: {
  item?: Color[] | null;
  value?: any;
  onChange?: (val: any) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {item && item.length > 0 ? (
        item.map((i, index) => {
          const isSelected = value?.theme === i.theme;
          return (
            <div
              key={index}
              onClick={() => {
                onChange?.(i);
              }}
              className={`flex rounded-lg p-3 border gap-2 items-center cursor-pointer ${
                isSelected ? "text-white" : ""
              }`}
              style={{
                borderColor: i.primary,
                background: isSelected ? i.primary : undefined,
                color: !isSelected ? i.primary : undefined,
              }}
            >
              <div
                className="h-5 w-5 rounded-full"
                style={{
                  background: i.primary,
                  border: isSelected ? "1px solid white" : undefined,
                }}
              ></div>
              <div
                className="h-5 w-5 rounded-full"
                style={{ background: i.secondary }}
              ></div>
              <div
                className="h-5 w-5 rounded-full"
                style={{ background: i.tertiary }}
              ></div>
              <div className="ml-2 font-semibold">{i.theme}</div>
            </div>
          );
        })
      ) : (
        <div className="text-gray-500">No color items available.</div>
      )}
    </div>
  );
}
