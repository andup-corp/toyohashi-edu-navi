"use client";

import { Option } from "@/types";

type Props = {
  options: Option[];
  onSelect: (option: Option) => void;
  disabled?: boolean;
};

export default function OptionButtons({ options, onSelect, disabled = false }: Props) {
  return (
    <div className="flex flex-col gap-2 pl-10 pr-2 mb-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !disabled && onSelect(option)}
          disabled={disabled}
          aria-label={option.label}
          className={`
            w-full text-left px-4 py-3 rounded-xl border text-sm font-medium
            min-h-[48px] flex items-center gap-2 transition-all duration-150
            animate-fade-in-up
            ${
              disabled
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-400 active:scale-[0.98] cursor-pointer shadow-sm"
            }
          `}
          style={{ animationDelay: `${index * 80 + 300}ms`, opacity: 0, animationFillMode: "forwards" }}
        >
          {option.icon && <span className="text-base flex-shrink-0">{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
